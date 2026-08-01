import { decodeHTML, DecodingMode } from "entities";

export const EJUPI_LABS_PUBLIC_HOSTS = Object.freeze([
  "ejupilabs.com",
  "www.ejupilabs.com",
  "blog.ejupilabs.com",
  "djenis.ejupilabs.com",
]);

export const PRODUCT_GITHUB_PAGES_HOST = "ejupi-djenis30.github.io";

export const LABS_PROJECT_PAGES_URLS = Object.freeze({
  "careeros-local": "https://ejupi-djenis30.github.io/careeros-local/",
  "eliza-lab": "https://ejupi-djenis30.github.io/eliza-lab/",
  "dig-gopher-explorer": "https://ejupi-djenis30.github.io/Dig/",
  integradraw: "https://ejupi-djenis30.github.io/IntegraDraw/",
  "vector-placement-operations":
    "https://ejupi-djenis30.github.io/vector-placement-operations/",
  "jdoor-security-lab": "https://ejupi-djenis30.github.io/JDoor/",
});

const EJUPI_LABS_ZONE = "ejupilabs.com";
const publicHostSet = new Set(EJUPI_LABS_PUBLIC_HOSTS);
const publicWebUrlPattern =
  /(?:https?:[\\/]{1,2}|(?<!:)[\\/]{2})[^\s"'<>`]+/giu;
const plainHostnameSegmentPattern =
  /[\p{L}\p{N}\p{M}\p{Cf}\p{S}_.\-\u3002\uff0e\uff61]+/gu;
const controlJoinedHostTokenPattern =
  /[^\s"'<>`\\/@:?#]+(?:[\t\n\r]+[^\s"'<>`\\/@:?#]+)+/gu;

function decodeBrowserText(value) {
  let decoded = decodeHTML(String(value), DecodingMode.Strict)
    .replace(
      /&#(?:x([\da-f]+)|(\d+));?/giu,
      (reference, hexadecimal, decimal) => {
        const codePoint = Number.parseInt(
          hexadecimal || decimal,
          hexadecimal ? 16 : 10,
        );
        if (
          !Number.isInteger(codePoint) ||
          codePoint < 0 ||
          codePoint > 0x10ffff
        ) {
          return reference;
        }
        return String.fromCodePoint(codePoint);
      },
    )
    .replace(
      /\\(?:u\{([\da-fA-F]{1,6})\}|u([\da-fA-F]{4})|x([\da-fA-F]{2}))/gu,
      (escape, braced, fixed, hexadecimal) => {
        const codePoint = Number.parseInt(braced || fixed || hexadecimal, 16);
        if (
          !Number.isInteger(codePoint) ||
          codePoint < 0 ||
          codePoint > 0x10ffff
        ) {
          return escape;
        }
        return String.fromCodePoint(codePoint);
      },
    );

  // Keep policy results stable across supported Node/ICU versions. These code
  // points are ignored by browser IDNA processing and must not split a host.
  decoded = decoded.replace(/[\u00ad\u200b\u2060-\u2063]/gu, "");

  decoded = decoded.replace(/(?:%[\da-f]{2})+/giu, (encodedRun) => {
    try {
      const percentDecoded = decodeURIComponent(encodedRun);
      return /[\t\n\r]/u.test(percentDecoded) ? encodedRun : percentDecoded;
    } catch {
      return encodedRun;
    }
  });

  return decoded;
}

function normalizeHostname(hostname) {
  return hostname.toLowerCase().replace(/\.$/u, "");
}

function trimTrailingPresentationDelimiters(candidate) {
  return candidate.replace(/[\p{Pe}\p{Pf}.,;:!?…。*]+$/gu, "");
}

function normalizeHostnameCandidate(candidate) {
  try {
    return normalizeHostname(new URL(`https://${candidate}`).hostname);
  } catch {
    return null;
  }
}

function normalizeWebUrlHostname(candidate) {
  try {
    let browserUrl = trimTrailingPresentationDelimiters(candidate).replaceAll(
      "\\",
      "/",
    );
    if (browserUrl.startsWith("//")) browserUrl = `https:${browserUrl}`;
    return normalizeHostname(new URL(browserUrl).hostname);
  } catch {
    return null;
  }
}

function isEjupiLabsHostname(hostname) {
  return (
    hostname === EJUPI_LABS_ZONE ||
    hostname.endsWith(`.${EJUPI_LABS_ZONE}`)
  );
}

function parsedAbsoluteUrl(value, path) {
  try {
    return new URL(value);
  } catch {
    throw new Error(`${path} must be an absolute URL.`);
  }
}

export function findDisallowedEjupiLabsUrls(text) {
  const violations = [];
  const seen = new Set();
  const decodedText = decodeBrowserText(text);
  const plainText = decodedText.split("");

  const recordViolation = (hostname, url) => {
    if (!hostname || !isEjupiLabsHostname(hostname)) return;
    if (publicHostSet.has(hostname)) return;

    if (seen.has(hostname)) return;
    seen.add(hostname);
    violations.push({
      hostname,
      url,
    });
  };

  for (const match of decodedText.matchAll(publicWebUrlPattern)) {
    recordViolation(normalizeWebUrlHostname(match[0]), match[0]);
    plainText.fill(" ", match.index, match.index + match[0].length);
  }

  const scanPlainHostTokens = (candidateText) => {
    for (const match of candidateText.matchAll(plainHostnameSegmentPattern)) {
      recordViolation(normalizeHostnameCandidate(match[0]), match[0]);
    }
  };

  scanPlainHostTokens(plainText.join(""));

  for (const match of decodedText.matchAll(controlJoinedHostTokenPattern)) {
    scanPlainHostTokens(match[0].replace(/[\t\n\r]/gu, ""));
  }

  return violations;
}

export function findDisallowedEjupiLabsUrlsInValue(
  value,
  { path = "publicContent" } = {},
) {
  const violations = [];
  const visited = new WeakSet();

  function visit(candidate, candidatePath) {
    if (typeof candidate === "string") {
      for (const violation of findDisallowedEjupiLabsUrls(candidate)) {
        violations.push({
          ...violation,
          path: candidatePath,
        });
      }
      return;
    }

    if (!candidate || typeof candidate !== "object") return;
    if (visited.has(candidate)) return;
    visited.add(candidate);

    if (Array.isArray(candidate)) {
      candidate.forEach((item, index) => visit(item, `${candidatePath}[${index}]`));
      return;
    }

    for (const [key, item] of Object.entries(candidate)) {
      visit(item, `${candidatePath}.${key}`);
    }
  }

  visit(value, path);
  return violations;
}

export function assertLabsProjectUrls(caseDefinitions) {
  if (!Array.isArray(caseDefinitions)) {
    throw new Error("caseDefinitions must be an array.");
  }

  for (const [index, definition] of caseDefinitions.entries()) {
    if (definition.kind !== "labs") continue;

    const path = `caseDefinitions[${index}].projectUrl`;
    if (typeof definition.projectUrl !== "string" || !definition.projectUrl) {
      throw new Error(`${path} is required for Labs projects.`);
    }

    const url = parsedAbsoluteUrl(definition.projectUrl, path);
    const hostname = normalizeHostname(url.hostname);
    const expectedUrl = LABS_PROJECT_PAGES_URLS[definition.slug];

    if (!expectedUrl) {
      throw new Error(
        `${path} has no canonical GitHub Pages policy for Labs project ` +
          `"${definition.slug}".`,
      );
    }

    if (isEjupiLabsHostname(hostname) && !publicHostSet.has(hostname)) {
      throw new Error(
        `${path} uses disallowed Ejupi Labs hostname "${hostname}". ` +
          `Project links must use GitHub Pages.`,
      );
    }

    if (url.protocol !== "https:") {
      throw new Error(`${path} must use HTTPS.`);
    }

    if (url.username || url.password || url.port) {
      throw new Error(`${path} must use a standard public GitHub Pages URL.`);
    }

    if (hostname !== PRODUCT_GITHUB_PAGES_HOST) {
      throw new Error(
        `${path} must use the GitHub Pages host ` +
          `"${PRODUCT_GITHUB_PAGES_HOST}", not "${hostname}".`,
      );
    }

    if (definition.projectUrl !== expectedUrl) {
      throw new Error(
        `${path} must be the canonical GitHub Pages URL "${expectedUrl}".`,
      );
    }
  }
}

export function assertPublicDomainTopology({
  caseDefinitions,
  publicContent,
}) {
  const violations = findDisallowedEjupiLabsUrlsInValue(publicContent);

  if (violations.length > 0) {
    const details = violations
      .map(
        ({ hostname, path, url }) =>
          `${path} uses disallowed Ejupi Labs hostname "${hostname}" (${url}).`,
      )
      .join("\n");
    throw new Error(
      `Public content violates the Ejupi Labs domain topology:\n${details}`,
    );
  }

  assertLabsProjectUrls(caseDefinitions);
}
