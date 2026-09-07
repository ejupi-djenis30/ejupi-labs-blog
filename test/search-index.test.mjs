import assert from "node:assert/strict";
import test from "node:test";
import { fetchSearchIndex } from "../src/search-index.js";

const valid = {
  schemaVersion: 1,
  locale: "it",
  cases: [{ slug: "example", text: "Testo completo" }],
};

test("loads the complete locale-matched index", async () => {
  const entries = await fetchSearchIndex("/search.json", {
    locale: "it", slugs: ["example"],
    fetchImpl: async () => Response.json(valid),
  });
  assert.deepEqual([...entries], [["example", "Testo completo"]]);
});

test("rejects incomplete, stale, duplicate and malformed indexes atomically", async () => {
  for (const payload of [
    { ...valid, locale: "en" },
    { ...valid, cases: [] },
    { ...valid, cases: [{ slug: "unknown", text: "Wrong case" }] },
    { ...valid, cases: [{ slug: "example", text: null }] },
    { ...valid, cases: [valid.cases[0], valid.cases[0]] },
  ]) {
    await assert.rejects(fetchSearchIndex("/search.json", {
      locale: "it", slugs: payload.cases.length === 2 ? ["example", "second"] : ["example"],
      fetchImpl: async () => Response.json(payload),
    }), /Search index/);
  }
});

test("times out a connection that never returns headers", async () => {
  await assert.rejects(fetchSearchIndex("/search.json", {
    locale: "it", slugs: ["example"], timeoutMs: 10,
    fetchImpl: async (_url, { signal }) => new Promise((_resolve, reject) => {
      signal.addEventListener("abort", () => reject(signal.reason), { once: true });
    }),
  }), { name: "AbortError" });
});

test("keeps the deadline active while the response body is stalled", async () => {
  await assert.rejects(fetchSearchIndex("/search.json", {
    locale: "it", slugs: ["example"], timeoutMs: 10,
    fetchImpl: async (_url, { signal }) => new Response(new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode('{"schemaVersion":'));
        signal.addEventListener("abort", () => controller.error(signal.reason), { once: true });
      },
    })),
  }), { name: "AbortError" });
});

test("rejects HTTP errors and releases its timeout after success", async () => {
  await assert.rejects(fetchSearchIndex("/search.json", {
    locale: "it", slugs: ["example"],
    fetchImpl: async () => new Response("Unavailable", { status: 503 }),
  }), /503/);
  let signal;
  await fetchSearchIndex("/search.json", {
    locale: "it", slugs: ["example"], timeoutMs: 10,
    fetchImpl: async (_url, options) => { signal = options.signal; return Response.json(valid); },
  });
  await new Promise((resolve) => setTimeout(resolve, 20));
  assert.equal(signal.aborted, false);
});
