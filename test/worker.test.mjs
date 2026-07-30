import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import worker, { handleRequest } from "../src/worker.mjs";

function createAssets(response) {
  const requests = [];
  return {
    requests,
    binding: {
      fetch(request) {
        requests.push(request);
        return response;
      },
    },
  };
}

test("HTTP requests permanently redirect to the same URL over HTTPS", async () => {
  const assets = createAssets(new Response("must not be served"));
  const request = new Request(
    "http://blog.ejupilabs.com/it/case-studies/careeros-local/?ref=portfolio%20card&lang=it",
  );

  const response = await handleRequest(request, assets.binding);

  assert.equal(response.status, 301);
  assert.equal(
    response.headers.get("location"),
    "https://blog.ejupilabs.com/it/case-studies/careeros-local/?ref=portfolio%20card&lang=it",
  );
  assert.equal(assets.requests.length, 0);
});

test("HTTP root requests preserve the custom domain", async () => {
  const assets = createAssets(new Response("must not be served"));

  const response = await worker.fetch(
    new Request("http://blog.ejupilabs.com/"),
    { ASSETS: assets.binding },
  );

  assert.equal(response.status, 301);
  assert.equal(response.headers.get("location"), "https://blog.ejupilabs.com/");
  assert.equal(assets.requests.length, 0);
});

test("HTTPS extensionless and index routes redirect canonically with their query", async () => {
  const cases = [
    [
      "https://blog.ejupilabs.com/it?ref=language%20switcher",
      "https://blog.ejupilabs.com/it/?ref=language%20switcher",
    ],
    [
      "https://blog.ejupilabs.com/index.html?ref=legacy",
      "https://blog.ejupilabs.com/?ref=legacy",
    ],
    [
      "https://blog.ejupilabs.com/fr/case-studies/careeros-local/index.html?source=old%20link",
      "https://blog.ejupilabs.com/fr/case-studies/careeros-local/?source=old%20link",
    ],
    [
      "https://blog.ejupilabs.com/case-studies/careeros-local?from=portfolio",
      "https://blog.ejupilabs.com/case-studies/careeros-local/?from=portfolio",
    ],
  ];

  for (const [requestUrl, expectedLocation] of cases) {
    const assets = createAssets(new Response("must not be served"));
    const response = await handleRequest(
      new Request(requestUrl),
      assets.binding,
    );

    assert.equal(response.status, 308);
    assert.equal(response.headers.get("location"), expectedLocation);
    assert.equal(assets.requests.length, 0);
  }
});

test("unpublished index-shaped and extensionless paths remain real 404s", async () => {
  for (const method of ["GET", "HEAD"]) {
    for (const pathname of ["/missing", "/missing/index.html"]) {
      const assets = createAssets(
        new Response(null, {
          status: 404,
          statusText: "Not Found",
        }),
      );
      const request = new Request(
        `https://blog.ejupilabs.com${pathname}?ref=old`,
        { method },
      );
      const response = await handleRequest(request, assets.binding);

      assert.equal(response.status, 404);
      assert.equal(response.headers.get("location"), null);
      assert.equal(response.headers.get("content-language"), "en");
      assert.deepEqual(assets.requests, [request]);
    }
  }
});

test("non-navigation methods are never redirected to a different path", async () => {
  const assetResponse = new Response("method reached assets", { status: 405 });
  const assets = createAssets(assetResponse);
  const request = new Request(
    "https://blog.ejupilabs.com/case-studies/careeros-local?from=api",
    { method: "POST", body: "payload" },
  );

  const response = await handleRequest(request, assets.binding);

  assert.equal(response, assetResponse);
  assert.equal(response.headers.get("location"), null);
  assert.deepEqual(assets.requests, [request]);
});

test("canonical routes and files reach the static assets binding unchanged", async () => {
  const requestUrls = [
    "https://blog.ejupilabs.com/",
    "https://blog.ejupilabs.com/case-studies/careeros-local/",
    "https://blog.ejupilabs.com/robots.txt",
    "https://blog.ejupilabs.com/assets/client.123456789abc.js",
  ];

  for (const requestUrl of requestUrls) {
    const assetResponse = new Response("asset");
    const assets = createAssets(assetResponse);
    const request = new Request(requestUrl);
    const response = await handleRequest(request, assets.binding);

    assert.equal(response, assetResponse);
    assert.deepEqual(assets.requests, [request]);
  }
});

test("HTTPS requests are delegated unchanged to the static assets binding", async () => {
  const assetResponse = new Response("localized not found", {
    status: 404,
    headers: { "content-language": "fr" },
  });
  const assets = createAssets(assetResponse);
  const request = new Request("https://blog.ejupilabs.com/fr/missing/?from=test", {
    headers: { "x-forwarded-proto": "http" },
  });

  const response = await worker.fetch(request, { ASSETS: assets.binding });

  assert.equal(response, assetResponse);
  assert.deepEqual(assets.requests, [request]);
  assert.equal(response.status, 404);
  assert.equal(response.headers.get("content-language"), "fr");
});

test("default-locale 404 responses declare English without losing their body", async () => {
  const assets = createAssets(
    new Response("Page not found", {
      status: 404,
      statusText: "Not Found",
      headers: { "cache-control": "public, max-age=60" },
    }),
  );
  const request = new Request(
    "https://blog.ejupilabs.com/missing-page/?from=external",
  );

  const response = await handleRequest(request, assets.binding);

  assert.equal(response.status, 404);
  assert.equal(response.statusText, "Not Found");
  assert.equal(response.headers.get("content-language"), "en");
  assert.equal(response.headers.get("cache-control"), "public, max-age=60");
  assert.equal(await response.text(), "Page not found");
  assert.deepEqual(assets.requests, [request]);
});

test("Wrangler runs the redirect before assets without changing domain or 404 policy", async () => {
  const config = JSON.parse(
    await readFile(new URL("../wrangler.jsonc", import.meta.url), "utf8"),
  );

  assert.equal(config.main, "./src/worker.mjs");
  assert.deepEqual(config.routes, [
    {
      pattern: "blog.ejupilabs.com",
      custom_domain: true,
    },
  ]);
  assert.equal(config.assets.binding, "ASSETS");
  assert.equal(config.assets.run_worker_first, true);
  assert.equal(config.assets.not_found_handling, "404-page");
  assert.equal(config.assets.html_handling, "auto-trailing-slash");
});
