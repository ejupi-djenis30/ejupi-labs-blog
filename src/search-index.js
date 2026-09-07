/**
 * Fetch a complete search index with a deadline covering headers and body.
 * Callers can fall back to the text already present in the document.
 * @param {string} url
 * @param {{ locale: string, slugs: string[], timeoutMs?: number, fetchImpl?: typeof fetch }} options
 * @returns {Promise<Map<string, string>>}
 */
export async function fetchSearchIndex(url, {
  locale,
  slugs,
  timeoutMs = 8_000,
  fetchImpl = fetch,
}) {
  if (!url) throw new Error("Search index URL is missing.");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl(url, {
      credentials: "same-origin",
      cache: "force-cache",
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`Search index returned ${response.status}.`);
    const payload = await response.json();
    if (
      payload?.schemaVersion !== 1 ||
      payload.locale !== locale ||
      !Array.isArray(payload.cases) ||
      payload.cases.length !== slugs.length
    ) {
      throw new Error("Search index has an unexpected shape.");
    }
    const expected = new Set(slugs);
    const entries = new Map();
    for (const entry of payload.cases) {
      if (
        typeof entry?.slug !== "string" ||
        typeof entry?.text !== "string" ||
        entries.has(entry.slug) ||
        !expected.has(entry.slug)
      ) {
        throw new Error("Search index contains an invalid case.");
      }
      entries.set(entry.slug, entry.text);
    }
    return entries;
  } finally {
    clearTimeout(timeout);
  }
}
