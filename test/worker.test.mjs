import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { mock, test } from "node:test";
import worker, { handleRequest } from "../src/worker.mjs";

const EXPECTED_DOCUMENT_CSP = [
  "default-src 'self'",
  "base-uri 'none'",
  "connect-src 'self'",
  "font-src 'self'",
  "form-action 'none'",
  "frame-ancestors 'none'",
  "frame-src 'none'",
  "img-src 'self'",
  "manifest-src 'self'",
  "media-src 'none'",
  "object-src 'none'",
  "script-src 'self'",
  "script-src-attr 'none'",
  "style-src 'self'",
  "worker-src 'none'",
].join("; ");
const EXPECTED_PERMISSIONS_POLICY =
  "accelerometer=(), camera=(), display-capture=(), geolocation=(), gyroscope=(), microphone=(), payment=(), usb=()";

function assertDocumentSecurityHeaders(response) {
  const contentSecurityPolicy = response.headers.get("content-security-policy");
  assert.equal(
    contentSecurityPolicy,
    EXPECTED_DOCUMENT_CSP,
  );
  assert.doesNotMatch(
    contentSecurityPolicy,
    /(?:^|;\s*)upgrade-insecure-requests(?:;|$)/u,
    "WebKit localhost assets must remain on the development HTTP origin.",
  );
  assert.equal(
    response.headers.get("permissions-policy"),
    EXPECTED_PERMISSIONS_POLICY,
  );
  assert.equal(
    response.headers.get("referrer-policy"),
    "strict-origin-when-cross-origin",
  );
  assert.equal(response.headers.get("x-frame-options"), "DENY");
}

function createAssets(response) {
  const requests = [];
  return {
    requests,
    binding: {
      async fetch(request) {
        requests.push(request);
        return response;
      },
    },
  };
}

test("HTTP requests permanently redirect to the canonical HTTPS host", async () => {
  const assets = createAssets(new Response("must not be served"));
  const request = new Request(
    "http://blog.ejupilabs.com/it/case-studies/careeros-local/?ref=portfolio%20card&lang=it",
  );

  const response = await handleRequest(request, assets.binding);

  assert.equal(response.status, 308);
  assert.equal(
    response.headers.get("location"),
    "https://blog.ejupilabs.com/it/case-studies/careeros-local/?ref=portfolio%20card&lang=it",
  );
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(response.headers.get("cloudflare-cdn-cache-control"), "no-store");
  assert.equal(response.headers.get("cross-origin-resource-policy"), "same-origin");
  assert.equal(
    response.headers.get("strict-transport-security"),
    "max-age=31536000; includeSubDomains",
  );
  assert.equal(assets.requests.length, 0);
});

test("HTTP root requests canonicalize through the default Worker export", async () => {
  const assets = createAssets(new Response("must not be served"));

  const response = await worker.fetch(
    new Request("http://blog.ejupilabs.com/"),
    { ASSETS: assets.binding, LOCAL_DEVELOPMENT: "false" },
  );

  assert.equal(response.status, 308);
  assert.equal(response.headers.get("location"), "https://blog.ejupilabs.com/");
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(assets.requests.length, 0);
});

test("preview and alternate hosts converge on the canonical production host", async () => {
  const cases = [
    [
      "https://preview.example.workers.dev/fr/?source=preview",
      "https://blog.ejupilabs.com/fr/?source=preview",
    ],
    [
      "https://branch.example.pages.dev/de/index.html?source=branch",
      "https://blog.ejupilabs.com/de/?source=branch",
    ],
    [
      "https://www.blog.ejupilabs.com:8443/it/?source=alias",
      "https://blog.ejupilabs.com/it/?source=alias",
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
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.equal(assets.requests.length, 0);
  }
});

test("local HTTP bypass requires the explicit development flag", async () => {
  const assets = createAssets(
    new Response("local worker", {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    }),
  );
  const request = new Request("http://127.0.0.1:8787/");
  const response = await handleRequest(request, assets.binding, true);

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("location"), null);
  assert.equal(await response.text(), "local worker");
  assert.deepEqual(assets.requests, [request]);
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
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.equal(response.headers.get("cloudflare-cdn-cache-control"), "no-store");
    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
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
          headers: { "Content-Type": "text/html; charset=utf-8" },
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
      assert.equal(response.headers.get("cache-control"), "no-store");
      assert.equal(response.headers.get("cloudflare-cdn-cache-control"), "no-store");
      assert.deepEqual(assets.requests, [request]);
    }
  }
});

test("non-navigation methods are rejected without redirecting or reaching assets", async () => {
  const requestUrls = [
    "https://blog.ejupilabs.com/case-studies/careeros-local?from=api",
    "http://blog.ejupilabs.com/case-studies/careeros-local?from=api",
    "https://preview.example.workers.dev/case-studies/careeros-local?from=api",
  ];

  for (const requestUrl of requestUrls) {
    const assets = createAssets(
      new Response("method reached assets", { status: 405 }),
    );
    const request = new Request(requestUrl, {
      method: "POST",
      body: "payload",
    });

    const response = await handleRequest(request, assets.binding);

    assert.equal(response.status, 405);
    assert.equal(response.headers.get("allow"), "GET, HEAD");
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.equal(response.headers.get("cloudflare-cdn-cache-control"), "no-store");
    assert.equal(response.headers.get("content-type"), "text/plain; charset=utf-8");
    assert.equal(response.headers.get("location"), null);
    assert.equal(await response.text(), "Method Not Allowed");
    assert.deepEqual(assets.requests, []);
  }
});

test("canonical routes and files reach assets with useful headers preserved", async () => {
  const requestUrls = [
    "https://blog.ejupilabs.com/",
    "https://blog.ejupilabs.com/case-studies/careeros-local/",
    "https://blog.ejupilabs.com/robots.txt",
    "https://blog.ejupilabs.com/assets/client.123456789abc.js",
  ];

  for (const requestUrl of requestUrls) {
    const assetResponse = new Response("asset", {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        ETag: '"asset-version"',
      },
    });
    const assets = createAssets(assetResponse);
    const request = new Request(requestUrl);
    const response = await handleRequest(request, assets.binding);

    assert.equal(response.status, 200);
    assert.equal(response.headers.get("content-type"), "text/plain; charset=utf-8");
    assert.equal(response.headers.get("etag"), '"asset-version"');
    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
    assert.deepEqual(assets.requests, [request]);
  }
});

test("localized HTTPS 404 responses preserve language, status and content", async () => {
  const assetResponse = new Response("localized not found", {
    status: 404,
    headers: {
      "content-language": "fr",
      "content-type": "text/html; charset=utf-8",
      etag: '"localized-not-found"',
    },
  });
  const assets = createAssets(assetResponse);
  const request = new Request("https://blog.ejupilabs.com/fr/missing/?from=test", {
    headers: { "x-forwarded-proto": "http" },
  });

  const response = await worker.fetch(request, {
    ASSETS: assets.binding,
    LOCAL_DEVELOPMENT: "false",
  });

  assert.deepEqual(assets.requests, [request]);
  assert.equal(response.status, 404);
  assert.equal(response.headers.get("content-language"), "fr");
  assert.equal(response.headers.get("etag"), '"localized-not-found"');
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(response.headers.get("cloudflare-cdn-cache-control"), "no-store");
  assertDocumentSecurityHeaders(response);
  assert.equal(await response.text(), "localized not found");
});

test("explicit localized 404 documents retain a real 404 status", async () => {
  const assets = createAssets(
    new Response("pagina non trovata", {
      status: 200,
      headers: {
        "content-type": "text/html; charset=utf-8",
        etag: '"it-not-found"',
      },
    }),
  );
  const request = new Request("https://blog.ejupilabs.com/it/404.html", {
    headers: {
      "If-Match": '"stale"',
      "If-Modified-Since": "Wed, 21 Oct 2015 07:28:00 GMT",
      "If-None-Match": '"cached"',
      "If-Range": '"partial"',
      "If-Unmodified-Since": "Wed, 21 Oct 2015 07:28:00 GMT",
      Range: "bytes=0-15",
    },
  });

  const response = await handleRequest(request, assets.binding);

  assert.equal(assets.requests.length, 1);
  const assetRequest = assets.requests[0];
  assert.equal(assetRequest.url, request.url);
  assert.equal(assetRequest.method, request.method);
  for (const header of [
    "If-Match",
    "If-Modified-Since",
    "If-None-Match",
    "If-Range",
    "If-Unmodified-Since",
    "Range",
  ]) {
    assert.equal(assetRequest.headers.get(header), null);
  }
  assert.equal(response.status, 404);
  assert.equal(response.statusText, "Not Found");
  assert.equal(response.headers.get("content-language"), "it");
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(response.headers.get("cloudflare-cdn-cache-control"), "no-store");
  assert.equal(response.headers.get("etag"), '"it-not-found"');
  assertDocumentSecurityHeaders(response);
  assert.equal(await response.text(), "pagina non trovata");
});

test("default-locale 404 responses declare English without losing useful headers", async () => {
  const assets = createAssets(
    new Response("Page not found", {
      status: 404,
      statusText: "Not Found",
      headers: {
        "cache-control": "public, max-age=60",
        "content-type": "text/html; charset=utf-8",
        etag: '"not-found"',
      },
    }),
  );
  const request = new Request(
    "https://blog.ejupilabs.com/missing-page/?from=external",
  );

  const response = await handleRequest(request, assets.binding);

  assert.equal(response.status, 404);
  assert.equal(response.statusText, "Not Found");
  assert.equal(response.headers.get("content-language"), "en");
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(response.headers.get("cloudflare-cdn-cache-control"), "no-store");
  assert.equal(response.headers.get("etag"), '"not-found"');
  assert.equal(response.headers.get("content-type"), "text/html; charset=utf-8");
  assert.equal(await response.text(), "Page not found");
  assert.deepEqual(assets.requests, [request]);
});

test("HEAD documents preserve validators and return no body with document policies", async () => {
  const assets = createAssets(
    new Response(null, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Security-Policy": "default-src *",
        ETag: '"home-version"',
        "Permissions-Policy": "geolocation=*",
      },
    }),
  );
  const request = new Request("https://blog.ejupilabs.com/de/", {
    method: "HEAD",
  });

  const response = await handleRequest(request, assets.binding);

  assert.equal(response.status, 200);
  assert.equal(response.body, null);
  assert.equal(response.headers.get("etag"), '"home-version"');
  assert.equal(response.headers.get("content-type"), "text/html; charset=utf-8");
  assert.equal(response.headers.get("content-language"), "de");
  assert.equal(response.headers.get("cache-control"), "no-cache, must-revalidate");
  assert.equal(response.headers.get("cloudflare-cdn-cache-control"), "no-store");
  assertDocumentSecurityHeaders(response);
  assert.deepEqual(assets.requests, [request]);
});

test("conditional fingerprinted assets keep ETags and immutable caching on 304", async () => {
  const assets = createAssets(
    new Response(null, {
      status: 304,
      headers: {
        "Content-Type": "application/javascript; charset=utf-8",
        "Content-Security-Policy": "default-src *",
        "Cross-Origin-Opener-Policy": "unsafe-none",
        ETag: '"client-afadadb47ad2"',
        "Permissions-Policy": "geolocation=*",
        "X-Frame-Options": "SAMEORIGIN",
      },
    }),
  );
  const request = new Request(
    "https://blog.ejupilabs.com/assets/client.afadadb47ad2.js",
    { headers: { "If-None-Match": '"client-afadadb47ad2"' } },
  );

  const response = await handleRequest(request, assets.binding);

  assert.equal(response.status, 304);
  assert.equal(response.body, null);
  assert.equal(response.headers.get("etag"), '"client-afadadb47ad2"');
  assert.equal(
    response.headers.get("cache-control"),
    "public, max-age=31536000, immutable",
  );
  assert.equal(response.headers.get("content-security-policy"), null);
  assert.equal(response.headers.get("cross-origin-opener-policy"), null);
  assert.equal(response.headers.get("permissions-policy"), null);
  assert.equal(response.headers.get("x-frame-options"), null);
  assert.equal(response.headers.get("cross-origin-resource-policy"), "same-origin");
  assert.deepEqual(assets.requests, [request]);
});

test("non-fingerprinted resources retain explicit cache policies and validators", async () => {
  const assets = createAssets(
    new Response("Contact: mailto:info@ejupilabs.com", {
      headers: {
        "Cache-Control": "public, max-age=300, must-revalidate",
        "Content-Type": "text/plain; charset=utf-8",
        ETag: '"security-contact"',
      },
    }),
  );
  const request = new Request(
    "https://blog.ejupilabs.com/.well-known/security.txt",
  );

  const response = await handleRequest(request, assets.binding);

  assert.equal(
    response.headers.get("cache-control"),
    "public, max-age=300, must-revalidate",
  );
  assert.equal(response.headers.get("etag"), '"security-contact"');
  assert.equal(response.headers.get("content-type"), "text/plain; charset=utf-8");
  assert.equal(response.headers.get("content-security-policy"), null);
});

test("asset binding failures return a bounded, non-cacheable 503", async () => {
  const consoleError = mock.method(console, "error", () => undefined);
  const request = new Request(
    "https://blog.ejupilabs.com/private/ada%40example.test/",
  );

  try {
    const response = await handleRequest(request, {
      async fetch() {
        throw new Error("asset backend failed for ada@example.test");
      },
    });

    assert.equal(response.status, 503);
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.equal(response.headers.get("cloudflare-cdn-cache-control"), "no-store");
    assert.equal(response.headers.get("retry-after"), "60");
    assert.equal(response.headers.get("content-type"), "text/plain; charset=utf-8");
    assert.equal(await response.text(), "Service temporarily unavailable");

    assert.equal(consoleError.mock.callCount(), 1);
    const logEntry = String(consoleError.mock.calls[0]?.arguments[0]);
    assert.deepEqual(JSON.parse(logEntry), {
      event: "worker_failure",
      operation: "static_asset_fetch",
      route_class: "document",
    });
    assert.doesNotMatch(logEntry, /ada|private|backend|example\.test/iu);
  } finally {
    consoleError.mock.restore();
  }
});

test("HEAD asset failures retain error metadata without emitting a body", async () => {
  const consoleError = mock.method(console, "error", () => undefined);

  try {
    const response = await handleRequest(
      new Request("https://blog.ejupilabs.com/de/unavailable/", {
        method: "HEAD",
      }),
      {
        async fetch() {
          throw new Error("asset backend failed");
        },
      },
    );

    assert.equal(response.status, 503);
    assert.equal(response.body, null);
    assert.equal(await response.text(), "");
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.equal(response.headers.get("retry-after"), "60");
    assert.equal(response.headers.get("content-type"), "text/plain; charset=utf-8");
    assert.equal(consoleError.mock.callCount(), 1);
  } finally {
    consoleError.mock.restore();
  }
});

test("asset server errors are bounded and do not leak upstream response bodies", async () => {
  const consoleError = mock.method(console, "error", () => undefined);
  const assets = createAssets(
    new Response("private upstream failure for ada@example.test", {
      status: 502,
      headers: {
        "cache-control": "public, max-age=31536000, immutable",
        "content-type": "text/html; charset=utf-8",
      },
    }),
  );
  const request = new Request("https://blog.ejupilabs.com/assets/client.deadbeef0000.js");

  try {
    const response = await handleRequest(request, assets.binding);

    assert.deepEqual(assets.requests, [request]);
    assert.equal(response.status, 503);
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.equal(response.headers.get("cloudflare-cdn-cache-control"), "no-store");
    assert.equal(response.headers.get("retry-after"), "60");
    assert.equal(response.headers.get("content-type"), "text/plain; charset=utf-8");
    assert.equal(response.headers.get("content-security-policy"), null);
    assert.equal(await response.text(), "Service temporarily unavailable");
    assert.equal(consoleError.mock.callCount(), 1);
    assert.deepEqual(JSON.parse(String(consoleError.mock.calls[0]?.arguments[0])), {
      event: "worker_failure",
      operation: "static_asset_fetch",
      route_class: "fingerprinted_asset",
    });
  } finally {
    consoleError.mock.restore();
  }
});

test("Wrangler runs the Worker before assets without changing domain or 404 policy", async () => {
  const [config, packageManifest] = await Promise.all([
    readFile(new URL("../wrangler.jsonc", import.meta.url), "utf8").then(JSON.parse),
    readFile(new URL("../package.json", import.meta.url), "utf8").then(JSON.parse),
  ]);

  assert.equal(config.main, "./src/worker.mjs");
  assert.equal(config.compatibility_date, "2026-07-21");
  assert.deepEqual(config.compatibility_flags, ["nodejs_compat"]);
  assert.equal(config.workers_dev, false);
  assert.equal(config.preview_urls, false);
  assert.equal(config.vars.LOCAL_DEVELOPMENT, "false");
  assert.deepEqual(config.env.local.routes, []);
  assert.equal(config.env.local.vars.LOCAL_DEVELOPMENT, "true");
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
  assert.equal(config.observability.enabled, true);
  assert.equal(config.observability.logs.enabled, true);
  assert.equal(config.observability.traces.enabled, true);
  assert.match(packageManifest.scripts.dev, /wrangler dev --env local$/u);
  assert.match(
    packageManifest.scripts.check,
    /wrangler deploy --dry-run --env=""$/u,
  );
  assert.match(packageManifest.scripts.deploy, /wrangler deploy --env=""$/u);
});
