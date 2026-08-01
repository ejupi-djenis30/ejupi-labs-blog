export const PUBLIC_LOCALE_PREFIXES = Object.freeze(["", "/it", "/de", "/fr"]);

export const PUBLIC_CASE_STUDY_SLUGS = Object.freeze([
  "ai-workflow-cloud-migration",
  "archival-workflow-management",
  "retail-erp-evolution",
  "careeros-local",
  "eliza-lab",
  "dig-gopher-explorer",
  "integradraw",
  "vector-placement-operations",
  "jdoor-security-lab",
]);

export const PUBLIC_DIRECTORY_ROUTES = new Set([
  ...PUBLIC_LOCALE_PREFIXES.flatMap((prefix) => [
    `${prefix}/`,
    `${prefix}/methodology/`,
  ]),
  ...PUBLIC_LOCALE_PREFIXES.flatMap((prefix) =>
    PUBLIC_CASE_STUDY_SLUGS.map(
      (slug) => `${prefix}/case-studies/${slug}/`,
    ),
  ),
]);

/**
 * @param {string} pathname
 * @returns {string}
 */
export function canonicalPublicPathname(pathname) {
  if (pathname === "/" || pathname.endsWith("/")) return pathname;

  const candidate = pathname.endsWith("/index.html")
    ? pathname.slice(0, -"index.html".length)
    : `${pathname}/`;

  return PUBLIC_DIRECTORY_ROUTES.has(candidate) ? candidate : pathname;
}
