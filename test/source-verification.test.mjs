import assert from "node:assert/strict";
import test from "node:test";
import {
  parseGitHubCommitSource,
  verifyLabsSources,
} from "../scripts/verify-labs-sources.mjs";

const SOURCE_SHA = "a".repeat(40);
const OTHER_SHA = "b".repeat(40);
const TAG_SHA = "c".repeat(40);
const API_BASE = "https://api.github.com/repos/example/product";
const COMMIT_URL = `${API_BASE}/commits/${SOURCE_SHA}`;
const REF_URL = `${API_BASE}/git/ref/tags/v1.2.3`;
const TAG_OBJECT_URL = `${API_BASE}/git/tags/${TAG_SHA}`;
const RELEASE_URL = `${API_BASE}/releases/tags/v1.2.3`;

function releaseDefinition(overrides = {}) {
  return {
    slug: "release-product",
    kind: "labs",
    sourceState: "release",
    sourceRef: "v1.2.3",
    sourceUrl: `https://github.com/example/product/commit/${SOURCE_SHA}`,
    ...overrides,
  };
}

function snapshotDefinition(overrides = {}) {
  return {
    slug: "source-snapshot",
    kind: "labs",
    sourceState: "snapshot",
    sourceRef: "v1.0.0",
    sourceUrl: `https://api.github.com/repositories/123456/commits/${SOURCE_SHA}`,
    ...overrides,
  };
}

function jsonResponse(body, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    async json() {
      return structuredClone(body);
    },
  };
}

function routeFetch(routes) {
  const calls = [];
  const fetchImpl = async (url, options = {}) => {
    const href = String(url);
    calls.push({ href, options });
    if (!routes.has(href)) {
      throw new Error(`Unexpected test request: ${href}`);
    }
    const route = routes.get(href);
    return typeof route === "function"
      ? route({ href, options })
      : jsonResponse(route);
  };
  fetchImpl.calls = calls;
  return fetchImpl;
}

function publishedRelease(overrides = {}) {
  return {
    tag_name: "v1.2.3",
    draft: false,
    prerelease: false,
    published_at: "2026-07-29T10:00:00Z",
    immutable: true,
    assets: [],
    ...overrides,
  };
}

function verifiedReleaseRoutes({
  release = publishedRelease(),
  targetSha = SOURCE_SHA,
  verification = { reason: "valid", verified: true },
} = {}) {
  return new Map([
    [COMMIT_URL, { sha: SOURCE_SHA }],
    [
      REF_URL,
      {
        ref: "refs/tags/v1.2.3",
        object: { type: "tag", sha: TAG_SHA },
      },
    ],
    [
      TAG_OBJECT_URL,
      {
        sha: TAG_SHA,
        verification,
        object: { type: "commit", sha: targetSha },
      },
    ],
    [RELEASE_URL, release],
  ]);
}

function releaseAsset(name, overrides = {}) {
  return {
    name,
    size: 128,
    state: "uploaded",
    ...overrides,
  };
}

test("GitHub commit parser supports public repository URLs and numeric API URLs", () => {
  assert.deepEqual(
    parseGitHubCommitSource(
      `https://github.com/example/product/commit/${SOURCE_SHA}`,
    ),
    {
      apiBaseUrl: API_BASE,
      commitApiUrl: COMMIT_URL,
      sha: SOURCE_SHA,
    },
  );
  assert.deepEqual(
    parseGitHubCommitSource(
      `https://api.github.com/repositories/123456/commits/${SOURCE_SHA}`,
    ),
    {
      apiBaseUrl: "https://api.github.com/repositories/123456",
      commitApiUrl: `https://api.github.com/repositories/123456/commits/${SOURCE_SHA}`,
      sha: SOURCE_SHA,
    },
  );
  assert.throws(
    () =>
      parseGitHubCommitSource(
        `https://github.com/example/product/tree/${SOURCE_SHA}`,
      ),
    /must use github\.com/u,
  );
});

test("a verified annotated tag and immutable release verify the exact source commit", async () => {
  const token = "test-token-that-must-not-be-logged";
  const fetchImpl = routeFetch(verifiedReleaseRoutes());

  const result = await verifyLabsSources([releaseDefinition()], {
    fetchImpl,
    token,
  });

  assert.equal(result.verified, 1);
  assert.equal(result.releaseCount, 1);
  assert.equal(result.snapshotCount, 0);
  assert.deepEqual(result.results, [
    {
      slug: "release-product",
      sourceState: "release",
      sha: SOURCE_SHA,
      sourceRef: "v1.2.3",
    },
  ]);
  assert.deepEqual(
    fetchImpl.calls.map(({ href }) => href),
    [COMMIT_URL, REF_URL, TAG_OBJECT_URL, RELEASE_URL],
  );
  for (const { options } of fetchImpl.calls) {
    const headers = new Headers(options.headers);
    assert.equal(headers.get("authorization"), `Bearer ${token}`);
    assert.equal(headers.get("accept"), "application/vnd.github+json");
    assert.equal(headers.get("x-github-api-version"), "2022-11-28");
  }
});

test("release verification rejects lightweight and unverified tags", async (context) => {
  await context.test("lightweight tag", async () => {
    const fetchImpl = routeFetch(
      new Map([
        [COMMIT_URL, { sha: SOURCE_SHA }],
        [
          REF_URL,
          {
            ref: "refs/tags/v1.2.3",
            object: { type: "commit", sha: SOURCE_SHA },
          },
        ],
      ]),
    );
    await assert.rejects(
      verifyLabsSources([releaseDefinition()], { fetchImpl }),
      /tag is lightweight; a verified annotated tag is required/u,
    );
  });

  await context.test("unverified annotated tag", async () => {
    const routes = verifiedReleaseRoutes({
      verification: { reason: "unsigned", verified: false },
    });
    routes.delete(RELEASE_URL);
    const fetchImpl = routeFetch(routes);
    await assert.rejects(
      verifyLabsSources([releaseDefinition()], { fetchImpl }),
      /does not have a verified signature/u,
    );
  });
});

test("a snapshot verifies only its exact numeric-repository commit endpoint", async () => {
  const sourceUrl = `https://api.github.com/repositories/123456/commits/${SOURCE_SHA}`;
  const fetchImpl = routeFetch(new Map([[sourceUrl, { sha: SOURCE_SHA }]]));

  const result = await verifyLabsSources([snapshotDefinition()], { fetchImpl });

  assert.equal(result.verified, 1);
  assert.equal(result.releaseCount, 0);
  assert.equal(result.snapshotCount, 1);
  assert.deepEqual(fetchImpl.calls.map(({ href }) => href), [sourceUrl]);
  assert.equal(result.results[0].sourceRef, undefined);
});

test("verification rejects a missing commit and a tag that targets another commit", async (context) => {
  await context.test("missing exact commit", async () => {
    const fetchImpl = async () => jsonResponse({ message: "Not Found" }, 404);
    await assert.rejects(
      verifyLabsSources([snapshotDefinition()], { fetchImpl }),
      /source commit [a-f0-9]{40} returned HTTP 404/u,
    );
  });

  await context.test("mismatched tag target", async () => {
    const routes = verifiedReleaseRoutes({ targetSha: OTHER_SHA });
    routes.delete(RELEASE_URL);
    const fetchImpl = routeFetch(routes);
    await assert.rejects(
      verifyLabsSources([releaseDefinition()], { fetchImpl }),
      new RegExp(`resolves to ${OTHER_SHA}, not source commit ${SOURCE_SHA}`, "u"),
    );
    assert.deepEqual(
      fetchImpl.calls.map(({ href }) => href),
      [COMMIT_URL, REF_URL, TAG_OBJECT_URL],
    );
  });
});

test("verification rejects unpublished, draft, prerelease and mutable releases", async (context) => {
  const invalidReleases = [
    ["draft", { draft: true }, /is a draft/u],
    ["prerelease", { prerelease: true }, /is a prerelease/u],
    ["unpublished", { published_at: null }, /has not been published/u],
    ["mutable", { immutable: false }, /is not immutable/u],
    ["missing immutable state", { immutable: undefined }, /is not immutable/u],
  ];

  for (const [label, overrides, expectation] of invalidReleases) {
    await context.test(label, async () => {
      const fetchImpl = routeFetch(
        verifiedReleaseRoutes({ release: publishedRelease(overrides) }),
      );
      await assert.rejects(
        verifyLabsSources([releaseDefinition()], { fetchImpl }),
        expectation,
      );
    });
  }
});

test("a declared release asset contract requires the exact complete inventory", async (context) => {
  const definition = releaseDefinition({
    releaseAssets: ["product.bin", "SHA256SUMS"],
  });
  const validRelease = publishedRelease({
    assets: [releaseAsset("product.bin"), releaseAsset("SHA256SUMS")],
  });

  await assert.doesNotReject(() =>
    verifyLabsSources([definition], {
      fetchImpl: routeFetch(verifiedReleaseRoutes({ release: validRelease })),
    }),
  );

  const invalidInventories = [
    [
      "missing asset",
      [releaseAsset("product.bin")],
      /asset inventory differs: missing SHA256SUMS/u,
    ],
    [
      "unexpected asset",
      [
        releaseAsset("product.bin"),
        releaseAsset("SHA256SUMS"),
        releaseAsset("extra.bin"),
      ],
      /asset inventory differs: unexpected extra\.bin/u,
    ],
    [
      "empty asset",
      [releaseAsset("product.bin", { size: 0 }), releaseAsset("SHA256SUMS")],
      /product\.bin is not a complete non-empty upload/u,
    ],
  ];

  for (const [label, assets, expectation] of invalidInventories) {
    await context.test(label, async () => {
      const fetchImpl = routeFetch(
        verifiedReleaseRoutes({
          release: publishedRelease({ assets }),
        }),
      );
      await assert.rejects(
        verifyLabsSources([definition], { fetchImpl }),
        expectation,
      );
    });
  }

  await context.test("missing inventory field", async () => {
    const release = publishedRelease();
    delete release.assets;
    await assert.rejects(
      verifyLabsSources([definition], {
        fetchImpl: routeFetch(verifiedReleaseRoutes({ release })),
      }),
      /returned no asset inventory/u,
    );
  });
});

test("tokens are trimmed once and transport failures redact the normalized credential", async () => {
  const token = "dedicated-secret-token";
  let authorization;
  const fetchImpl = async (url, options) => {
    authorization = new Headers(options.headers).get("authorization");
    throw new Error(`transport failed while using ${token}`);
  };

  await assert.rejects(
    verifyLabsSources([snapshotDefinition()], {
      fetchImpl,
      token: `  ${token}  `,
    }),
    (error) => {
      assert.match(error.message, /transport failed while using \[redacted\]/u);
      assert.doesNotMatch(error.message, new RegExp(token, "u"));
      return true;
    },
  );
  assert.equal(authorization, `Bearer ${token}`);
});

test("each GitHub request has a fail-closed deadline", async () => {
  let requestSignal;
  const fetchImpl = async (url, options) => {
    requestSignal = options.signal;
    return await new Promise(() => {});
  };

  await assert.rejects(
    verifyLabsSources([snapshotDefinition()], {
      fetchImpl,
      requestTimeoutMs: 10,
    }),
    /source commit [a-f0-9]{40} timed out after 10 milliseconds/u,
  );
  assert.equal(requestSignal.aborted, true);
});
