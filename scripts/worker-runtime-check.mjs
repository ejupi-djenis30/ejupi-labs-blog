import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdtemp, readdir, rm, stat } from "node:fs/promises";
import { request as httpRequest } from "node:http";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

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
const WORKER_BUNDLE_BUDGET_BYTES = 24_000;

function assertDocumentSecurityHeaders(headers) {
  assert.equal(headers["content-security-policy"], EXPECTED_DOCUMENT_CSP);
  assert.equal(headers["permissions-policy"], EXPECTED_PERMISSIONS_POLICY);
  assert.equal(headers["referrer-policy"], "strict-origin-when-cross-origin");
  assert.equal(headers["x-frame-options"], "DENY");
}

async function availablePort() {
  const server = createServer();
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  await new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  });
  return address.port;
}

function requestLocal(
  port,
  path,
  { method = "GET", headers = {} } = {},
) {
  return new Promise((resolve, reject) => {
    const request = httpRequest(
      {
        hostname: "127.0.0.1",
        port,
        path,
        method,
        headers,
      },
      (response) => {
        const chunks = [];
        response.on("data", (chunk) => chunks.push(chunk));
        response.on("end", () => {
          resolve({
            body: Buffer.concat(chunks).toString("utf8"),
            headers: response.headers,
            status: response.statusCode,
          });
        });
      },
    );
    request.on("error", reject);
    request.end();
  });
}

async function waitForResponse(port, path, child, requestOptions) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (child.exitCode !== null) {
      throw new Error(`Wrangler exited before serving requests (code ${child.exitCode}).`);
    }

    try {
      return await requestLocal(port, path, requestOptions);
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }
  throw new Error("Wrangler did not start within 20 seconds.");
}

const wrangler = fileURLToPath(
  new URL("../node_modules/wrangler/bin/wrangler.js", import.meta.url),
);

async function runWranglerCommand(args) {
  const output = [];
  const child = spawn(process.execPath, [wrangler, ...args], {
    cwd: new URL("..", import.meta.url),
    env: {
      ...process.env,
      NO_COLOR: "1",
      WRANGLER_SEND_METRICS: "false",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });

  child.stdout.on("data", (chunk) => output.push(chunk.toString()));
  child.stderr.on("data", (chunk) => output.push(chunk.toString()));

  const exitCode = await new Promise((resolve, reject) => {
    child.once("error", reject);
    child.once("exit", resolve);
  });
  if (exitCode !== 0) {
    throw new Error(
      `Wrangler exited with code ${exitCode}.\n${output.join("").trim()}`,
    );
  }
}

async function findJavaScriptBundle(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      const nested = await findJavaScriptBundle(path);
      if (nested) return nested;
    } else if (/\.m?js$/u.test(entry.name)) {
      return path;
    }
  }
  return null;
}

async function verifyBundledCanonicalRedirect() {
  const bundleDirectory = await mkdtemp(
    join(tmpdir(), "ejupi-blog-worker-runtime-"),
  );

  try {
    await runWranglerCommand([
      "deploy",
      "--dry-run",
      "--env",
      "",
      "--outdir",
      bundleDirectory,
    ]);
    const bundlePath = await findJavaScriptBundle(bundleDirectory);
    assert.ok(bundlePath, "Wrangler dry-run did not emit a JavaScript bundle.");
    const bundleBytes = (await stat(bundlePath)).size;
    assert.ok(
      bundleBytes <= WORKER_BUNDLE_BUDGET_BYTES,
      `Worker bundle is ${bundleBytes} bytes; budget is ${WORKER_BUNDLE_BUDGET_BYTES}.`,
    );
    assert.ok(
      bundleBytes <= Math.floor(WORKER_BUNDLE_BUDGET_BYTES * 0.9),
      `Worker bundle must retain at least 10% headroom (${bundleBytes}/${WORKER_BUNDLE_BUDGET_BYTES} bytes).`,
    );

    const bundledModule = await import(pathToFileURL(bundlePath).href);
    assert.equal(typeof bundledModule.default?.fetch, "function");

    const path =
      "/de/case-studies/dig-gopher-explorer/?ref=runtime%20test&lang=de";
    const response = await bundledModule.default.fetch(
      new Request(`http://127.0.0.1:8787${path}`),
      {
        ASSETS: {
          async fetch() {
            throw new Error("Canonical redirects must not reach static assets.");
          },
        },
        LOCAL_DEVELOPMENT: "false",
      },
    );
    const location = new URL(response.headers.get("Location"));

    assert.equal(response.status, 308);
    assert.equal(response.headers.get("Cache-Control"), "no-store");
    assert.equal(location.protocol, "https:");
    assert.equal(location.hostname, "blog.ejupilabs.com");
    assert.equal(location.port, "");
    assert.equal(location.pathname, "/de/case-studies/dig-gopher-explorer/");
    assert.equal(location.search, "?ref=runtime%20test&lang=de");
    return bundleBytes;
  } finally {
    await rm(bundleDirectory, { force: true, recursive: true });
  }
}

async function runWithWrangler(check, localDevelopment) {
  const port = await availablePort();
  const output = [];
  const args = [
    wrangler,
    "dev",
    "--local",
    "--ip",
    "127.0.0.1",
    "--local-protocol",
    "http",
    "--port",
    String(port),
  ];
  if (localDevelopment) {
    args.push("--env", "local");
  }
  const child = spawn(
    process.execPath,
    args,
    {
      cwd: new URL("..", import.meta.url),
      env: {
        ...process.env,
        NO_COLOR: "1",
        WRANGLER_SEND_METRICS: "false",
      },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );

  child.stdout.on("data", (chunk) => output.push(chunk.toString()));
  child.stderr.on("data", (chunk) => output.push(chunk.toString()));

  try {
    await check({ child, port });
  } catch (error) {
    if (error instanceof Error) {
      error.wranglerOutput = output.join("").trim();
    }
    throw error;
  } finally {
    if (child.exitCode === null && child.signalCode === null) {
      const exited = new Promise((resolve) => child.once("exit", resolve));
      child.kill();
      await Promise.race([
        exited,
        new Promise((resolve) => setTimeout(resolve, 5_000)),
      ]);
    }
  }
}

async function withWrangler(check, { localDevelopment = false } = {}) {
  const maximumAttempts = 3;

  for (let attempt = 1; attempt <= maximumAttempts; attempt += 1) {
    try {
      await runWithWrangler(check, localDevelopment);
      return;
    } catch (error) {
      const details =
        error instanceof Error && typeof error.wranglerOutput === "string"
          ? error.wranglerOutput
          : "";
      const portWasClaimed =
        /Address already in use|EADDRINUSE/iu.test(details);
      if (portWasClaimed && attempt < maximumAttempts) continue;
      if (details) process.stderr.write(`${details}\n`);
      throw error;
    }
  }
}

const workerBundleBytes = await verifyBundledCanonicalRedirect();

await withWrangler(async ({ child, port }) => {
  const path = "/de/case-studies/dig-gopher-explorer/?ref=runtime%20test&lang=de";
  const response = await waitForResponse(port, path, child);
  const location = new URL(response.headers.location);

  assert.equal(response.status, 308);
  assert.equal(location.protocol, "http:");
  assert.equal(location.hostname, "127.0.0.1");
  assert.equal(location.pathname, "/de/case-studies/dig-gopher-explorer/");
  assert.equal(location.search, "?ref=runtime%20test&lang=de");
});

await withWrangler(async ({ child, port }) => {
  const canonical = await waitForResponse(
    port,
    "/de/case-studies/dig-gopher-explorer/index.html?ref=runtime%20test",
    child,
  );
  const canonicalLocation = new URL(canonical.headers.location);

  assert.equal(canonical.status, 308);
  assert.equal(canonical.headers["cache-control"], "no-store");
  assert.equal(canonicalLocation.hostname, "127.0.0.1");
  assert.equal(
    canonicalLocation.pathname,
    "/de/case-studies/dig-gopher-explorer/",
  );
  assert.equal(canonicalLocation.search, "?ref=runtime%20test");

  const document = await requestLocal(
    port,
    "/de/case-studies/dig-gopher-explorer/",
    { method: "HEAD" },
  );
  assert.equal(document.status, 200);
  assert.equal(document.body, "");
  assert.match(document.headers["content-type"] ?? "", /^text\/html\b/u);
  assert.equal(document.headers["content-language"], "de");
  assert.equal(document.headers["cache-control"], "no-cache, must-revalidate");
  assert.equal(document.headers["cloudflare-cdn-cache-control"], "no-store");
  assert.match(document.headers.etag ?? "", /.+/u);
  assertDocumentSecurityHeaders(document.headers);

  const missing = await requestLocal(port, "/fr/runtime-check-missing/");
  assert.equal(missing.status, 404);
  assert.equal(missing.headers["content-language"], "fr");
  assert.equal(missing.headers["cache-control"], "no-store");
  assert.equal(missing.headers["cloudflare-cdn-cache-control"], "no-store");
  assert.match(missing.headers["content-type"] ?? "", /^text\/html\b/u);
  assertDocumentSecurityHeaders(missing.headers);

  const assetDirectory = fileURLToPath(
    new URL("../dist/assets/", import.meta.url),
  );
  const clientAsset = (await readdir(assetDirectory)).find((name) =>
    /^client\.[a-f0-9]{12}\.js$/u.test(name)
  );
  assert.ok(clientAsset, "The runtime build must contain a fingerprinted client.");

  const assetPath = `/assets/${clientAsset}`;
  const asset = await requestLocal(port, assetPath);
  assert.equal(asset.status, 200);
  assert.match(asset.headers.etag ?? "", /.+/u);
  assert.match(
    asset.headers["content-type"] ?? "",
    /^(?:application|text)\/javascript\b/u,
  );
  assert.equal(
    asset.headers["cache-control"],
    "public, max-age=31536000, immutable",
  );
  assert.equal(asset.headers["content-security-policy"], undefined);
  assert.equal(asset.headers["permissions-policy"], undefined);
  assert.equal(
    asset.headers["referrer-policy"],
    "strict-origin-when-cross-origin",
  );

  const notModified = await requestLocal(port, assetPath, {
    headers: { "If-None-Match": asset.headers.etag },
  });
  assert.equal(notModified.status, 304);
  assert.equal(notModified.body, "");
  assert.equal(notModified.headers.etag, asset.headers.etag);
  assert.equal(
    notModified.headers["cache-control"],
    "public, max-age=31536000, immutable",
  );
}, { localDevelopment: true });

process.stdout.write(
  `Bundled (${workerBundleBytes} bytes) and local Wrangler runtimes verified canonical redirects, exact document policies, HEAD, 404 and conditional asset delivery.\n`,
);
