import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { caseDefinitions } from "../src/content.mjs";

const SHA_PATTERN = /^[0-9a-f]{40}$/u;
const SOURCE_STATES = new Set(["release", "snapshot"]);
const GITHUB_API_VERSION = "2022-11-28";
const MAX_ANNOTATED_TAG_DEPTH = 8;
const DEFAULT_REQUEST_TIMEOUT_MS = 15_000;
const MAX_REQUEST_TIMEOUT_MS = 60_000;

function sourceError(definition, message) {
  const label = definition?.slug ? definition.slug : "unknown Labs case";
  return new Error(`[${label}] ${message}`);
}

function normalizeSha(value, definition, label) {
  if (typeof value !== "string" || !SHA_PATTERN.test(value.toLowerCase())) {
    throw sourceError(definition, `${label} did not return a full Git commit SHA.`);
  }
  return value.toLowerCase();
}

function repositorySegment(value, label) {
  let decoded;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    throw new Error(`The GitHub ${label} contains invalid URL encoding.`);
  }
  if (!/^[a-z0-9_.-]+$/iu.test(decoded)) {
    throw new Error(`The GitHub ${label} is not a valid repository path segment.`);
  }
  return encodeURIComponent(decoded);
}

export function parseGitHubCommitSource(sourceUrl) {
  let url;
  try {
    url = new URL(sourceUrl);
  } catch {
    throw new Error("The source URL must be an absolute URL.");
  }

  if (
    url.protocol !== "https:" ||
    url.port ||
    url.username ||
    url.password ||
    url.search ||
    url.hash
  ) {
    throw new Error("The source URL must be a clean HTTPS GitHub commit URL.");
  }

  const webMatch =
    url.hostname === "github.com"
      ? url.pathname.match(
          /^\/([^/]+)\/([^/]+)\/commit\/([0-9a-f]{40})$/iu,
        )
      : null;
  if (webMatch) {
    const owner = repositorySegment(webMatch[1], "owner");
    const repository = repositorySegment(webMatch[2], "repository");
    const sha = webMatch[3].toLowerCase();
    const apiBaseUrl = `https://api.github.com/repos/${owner}/${repository}`;
    return {
      apiBaseUrl,
      commitApiUrl: `${apiBaseUrl}/commits/${sha}`,
      sha,
    };
  }

  const apiMatch =
    url.hostname === "api.github.com"
      ? url.pathname.match(
          /^\/repositories\/([1-9]\d*)\/commits\/([0-9a-f]{40})$/iu,
        )
      : null;
  if (apiMatch) {
    const repositoryId = apiMatch[1];
    const sha = apiMatch[2].toLowerCase();
    return {
      apiBaseUrl: `https://api.github.com/repositories/${repositoryId}`,
      commitApiUrl: url.href,
      sha,
    };
  }

  throw new Error(
    "The source URL must use github.com/<owner>/<repo>/commit/<sha> or api.github.com/repositories/<id>/commits/<sha>.",
  );
}

function safeMessage(error, token) {
  const message = error instanceof Error ? error.message : String(error);
  return token ? message.replaceAll(token, "[redacted]") : message;
}

function normalizeToken(value) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function environmentToken() {
  return normalizeToken(process.env.GH_TOKEN) ?? normalizeToken(process.env.GITHUB_TOKEN);
}

function normalizeRequestTimeout(value) {
  if (
    !Number.isInteger(value) ||
    value < 1 ||
    value > MAX_REQUEST_TIMEOUT_MS
  ) {
    throw new TypeError(
      `GitHub request timeout must be an integer from 1 to ${MAX_REQUEST_TIMEOUT_MS} milliseconds.`,
    );
  }
  return value;
}

function githubHeaders(token) {
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": GITHUB_API_VERSION,
    "User-Agent": "ejupi-labs-blog-source-verifier",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function requestJson(
  url,
  { definition, fetchImpl, purpose, requestTimeoutMs, token },
) {
  const controller = new AbortController();
  let timeoutHandle;
  const timeout = new Promise((resolvePromise, rejectPromise) => {
    timeoutHandle = setTimeout(() => {
      rejectPromise(
        sourceError(
          definition,
          `${purpose} timed out after ${requestTimeoutMs} milliseconds.`,
        ),
      );
      controller.abort();
    }, requestTimeoutMs);
  });
  const request = (async () => {
    let response;
    try {
      response = await fetchImpl(url, {
        headers: githubHeaders(token),
        signal: controller.signal,
      });
    } catch (error) {
      throw sourceError(
        definition,
        `${purpose} request failed: ${safeMessage(error, token)}`,
      );
    }

    if (!response || typeof response.ok !== "boolean") {
      throw sourceError(definition, `${purpose} returned an invalid HTTP response.`);
    }
    if (!response.ok) {
      const status =
        Number.isInteger(response.status) && response.status > 0
          ? `HTTP ${response.status}`
          : "an HTTP error";
      throw sourceError(definition, `${purpose} returned ${status}.`);
    }

    try {
      return await response.json();
    } catch {
      throw sourceError(definition, `${purpose} returned invalid JSON.`);
    }
  })();

  try {
    return await Promise.race([request, timeout]);
  } finally {
    clearTimeout(timeoutHandle);
  }
}

async function resolveTagTarget(
  initialObject,
  { apiBaseUrl, definition, fetchImpl, requestTimeoutMs, token },
) {
  let object = initialObject;
  const visitedTags = new Set();

  for (let depth = 0; depth <= MAX_ANNOTATED_TAG_DEPTH; depth += 1) {
    if (!object || typeof object !== "object") {
      throw sourceError(definition, "the Git tag reference has no target object.");
    }

    const targetSha = normalizeSha(
      object.sha,
      definition,
      "the Git tag reference",
    );
    if (object.type === "commit") {
      if (depth === 0) {
        throw sourceError(
          definition,
          "the Git tag is lightweight; a verified annotated tag is required.",
        );
      }
      return targetSha;
    }
    if (object.type !== "tag") {
      throw sourceError(
        definition,
        `the Git tag points to unsupported object type ${String(object.type)}.`,
      );
    }
    if (visitedTags.has(targetSha)) {
      throw sourceError(definition, "the annotated Git tag chain contains a cycle.");
    }
    if (depth === MAX_ANNOTATED_TAG_DEPTH) {
      throw sourceError(
        definition,
        `the annotated Git tag chain exceeds ${MAX_ANNOTATED_TAG_DEPTH} levels.`,
      );
    }
    visitedTags.add(targetSha);

    const tag = await requestJson(`${apiBaseUrl}/git/tags/${targetSha}`, {
      definition,
      fetchImpl,
      purpose: `annotated tag object ${targetSha}`,
      requestTimeoutMs,
      token,
    });
    const returnedTagSha = normalizeSha(
      tag?.sha,
      definition,
      "the annotated tag object",
    );
    if (returnedTagSha !== targetSha) {
      throw sourceError(
        definition,
        `annotated tag object ${targetSha} returned a different object SHA.`,
      );
    }
    if (depth === 0 && tag?.tag !== definition.sourceRef) {
      throw sourceError(
        definition,
        `annotated tag object ${targetSha} is signed for ${String(tag?.tag)}, not ${definition.sourceRef}.`,
      );
    }
    if (tag?.verification?.verified !== true) {
      throw sourceError(
        definition,
        `annotated tag object ${targetSha} does not have a verified signature.`,
      );
    }
    object = tag.object;
  }

  throw sourceError(definition, "the annotated Git tag could not be resolved.");
}

function expectedReleaseAssets(definition) {
  if (definition.releaseAssets === undefined) return undefined;
  if (!Array.isArray(definition.releaseAssets) || definition.releaseAssets.length === 0) {
    throw sourceError(
      definition,
      "releaseAssets must contain at least one expected asset name.",
    );
  }

  const names = definition.releaseAssets.map((asset, index) => {
    if (
      typeof asset !== "string" ||
      !/^[A-Za-z0-9][A-Za-z0-9._+-]*$/u.test(asset)
    ) {
      throw sourceError(
        definition,
        `releaseAssets[${index}] is not a safe asset name.`,
      );
    }
    return asset;
  });
  if (new Set(names).size !== names.length) {
    throw sourceError(definition, "releaseAssets contains duplicate names.");
  }
  return names;
}

function verifyReleaseAssets(definition, release, sourceRef) {
  const expected = expectedReleaseAssets(definition);
  if (expected === undefined) return;
  if (!Array.isArray(release.assets)) {
    throw sourceError(
      definition,
      `GitHub Release ${sourceRef} returned no asset inventory.`,
    );
  }

  const actual = release.assets.map((asset, index) => {
    const name = asset?.name;
    if (
      typeof name !== "string" ||
      !/^[A-Za-z0-9][A-Za-z0-9._+-]*$/u.test(name)
    ) {
      throw sourceError(
        definition,
        `GitHub Release ${sourceRef} asset ${index + 1} has an invalid name.`,
      );
    }
    if (asset.state !== "uploaded" || !Number.isInteger(asset.size) || asset.size < 1) {
      throw sourceError(
        definition,
        `GitHub Release ${sourceRef} asset ${name} is not a complete non-empty upload.`,
      );
    }
    return name;
  });
  if (new Set(actual).size !== actual.length) {
    throw sourceError(
      definition,
      `GitHub Release ${sourceRef} contains duplicate asset names.`,
    );
  }

  const actualSet = new Set(actual);
  const expectedSet = new Set(expected);
  const missing = expected.filter((name) => !actualSet.has(name));
  const unexpected = actual.filter((name) => !expectedSet.has(name));
  if (missing.length > 0 || unexpected.length > 0) {
    const details = [
      missing.length > 0 ? `missing ${missing.join(", ")}` : "",
      unexpected.length > 0 ? `unexpected ${unexpected.join(", ")}` : "",
    ]
      .filter(Boolean)
      .join("; ");
    throw sourceError(
      definition,
      `GitHub Release ${sourceRef} asset inventory differs: ${details}.`,
    );
  }
}

async function verifyPublishedRelease(
  definition,
  { apiBaseUrl, fetchImpl, requestTimeoutMs, token },
) {
  if (typeof definition.sourceRef !== "string" || !definition.sourceRef.trim()) {
    throw sourceError(definition, "a release source requires a sourceRef.");
  }
  const sourceRef = definition.sourceRef.trim();
  const encodedRef = encodeURIComponent(sourceRef);
  const gitRef = await requestJson(
    `${apiBaseUrl}/git/ref/tags/${encodedRef}`,
    {
      definition,
      fetchImpl,
      purpose: `Git tag ${sourceRef}`,
      requestTimeoutMs,
      token,
    },
  );
  if (gitRef?.ref !== `refs/tags/${sourceRef}`) {
    throw sourceError(
      definition,
      `Git tag ${sourceRef} returned a different ref.`,
    );
  }
  const tagTargetSha = await resolveTagTarget(gitRef.object, {
    apiBaseUrl,
    definition,
    fetchImpl,
    requestTimeoutMs,
    token,
  });
  const sourceSha = parseGitHubCommitSource(definition.sourceUrl).sha;
  if (tagTargetSha !== sourceSha) {
    throw sourceError(
      definition,
      `Git tag ${sourceRef} resolves to ${tagTargetSha}, not source commit ${sourceSha}.`,
    );
  }

  const release = await requestJson(
    `${apiBaseUrl}/releases/tags/${encodedRef}`,
    {
      definition,
      fetchImpl,
      purpose: `GitHub Release ${sourceRef}`,
      requestTimeoutMs,
      token,
    },
  );
  if (release?.tag_name !== sourceRef) {
    throw sourceError(
      definition,
      `GitHub Release ${sourceRef} returned a different tag name.`,
    );
  }
  if (release.draft !== false) {
    throw sourceError(definition, `GitHub Release ${sourceRef} is a draft.`);
  }
  if (release.prerelease !== false) {
    throw sourceError(definition, `GitHub Release ${sourceRef} is a prerelease.`);
  }
  if (
    typeof release.published_at !== "string" ||
    release.published_at.trim().length === 0
  ) {
    throw sourceError(
      definition,
      `GitHub Release ${sourceRef} has not been published.`,
    );
  }
  if (release.immutable !== true) {
    throw sourceError(
      definition,
      `GitHub Release ${sourceRef} is not immutable.`,
    );
  }
  verifyReleaseAssets(definition, release, sourceRef);
}

export async function verifyLabsSources(
  definitions,
  {
    fetchImpl = globalThis.fetch,
    requestTimeoutMs = DEFAULT_REQUEST_TIMEOUT_MS,
    token = environmentToken(),
  } = {},
) {
  if (!Array.isArray(definitions)) {
    throw new TypeError("Labs source definitions must be an array.");
  }
  if (typeof fetchImpl !== "function") {
    throw new TypeError("A fetch implementation is required.");
  }

  const normalizedToken = normalizeToken(token);
  const normalizedRequestTimeout = normalizeRequestTimeout(requestTimeoutMs);
  const results = [];

  for (const definition of definitions.filter(({ kind }) => kind === "labs")) {
    if (!SOURCE_STATES.has(definition.sourceState)) {
      throw sourceError(
        definition,
        "sourceState must be either release or snapshot.",
      );
    }

    let source;
    try {
      source = parseGitHubCommitSource(definition.sourceUrl);
    } catch (error) {
      throw sourceError(definition, safeMessage(error, normalizedToken));
    }

    const commit = await requestJson(source.commitApiUrl, {
      definition,
      fetchImpl,
      purpose: `source commit ${source.sha}`,
      requestTimeoutMs: normalizedRequestTimeout,
      token: normalizedToken,
    });
    const returnedCommitSha = normalizeSha(
      commit?.sha,
      definition,
      "the source commit endpoint",
    );
    if (returnedCommitSha !== source.sha) {
      throw sourceError(
        definition,
        `source commit endpoint returned ${returnedCommitSha}, not ${source.sha}.`,
      );
    }

    if (definition.sourceState === "release") {
      await verifyPublishedRelease(definition, {
        apiBaseUrl: source.apiBaseUrl,
        fetchImpl,
        requestTimeoutMs: normalizedRequestTimeout,
        token: normalizedToken,
      });
    }

    results.push({
      slug: definition.slug,
      sourceState: definition.sourceState,
      sha: source.sha,
      ...(definition.sourceState === "release"
        ? { sourceRef: definition.sourceRef }
        : {}),
    });
  }

  return {
    verified: results.length,
    releaseCount: results.filter(({ sourceState }) => sourceState === "release")
      .length,
    snapshotCount: results.filter(
      ({ sourceState }) => sourceState === "snapshot",
    ).length,
    results,
  };
}

async function main() {
  const token = environmentToken();
  try {
    const summary = await verifyLabsSources(caseDefinitions, { token });
    process.stdout.write(
      `Verified ${summary.verified} Labs sources: ${summary.releaseCount} published releases and ${summary.snapshotCount} commit snapshot.\n`,
    );
  } catch (error) {
    process.stderr.write(`${safeMessage(error, token)}\n`);
    process.exitCode = 1;
  }
}

const invokedPath = process.argv[1]
  ? pathToFileURL(resolve(process.argv[1])).href
  : "";
if (import.meta.url === invokedPath) {
  await main();
}
