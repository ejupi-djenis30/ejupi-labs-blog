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
