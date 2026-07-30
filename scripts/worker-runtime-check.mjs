import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { get as httpGet } from "node:http";
import { createServer } from "node:net";
import { fileURLToPath } from "node:url";

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

function requestLocal(port, path) {
  return new Promise((resolve, reject) => {
    const request = httpGet(
      {
        hostname: "127.0.0.1",
        port,
        path,
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
  });
}

async function waitForResponse(port, path, child) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (child.exitCode !== null) {
      throw new Error(`Wrangler exited before serving requests (code ${child.exitCode}).`);
    }

    try {
      return await requestLocal(port, path);
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }
  throw new Error("Wrangler did not start within 20 seconds.");
}

const wrangler = fileURLToPath(
  new URL("../node_modules/wrangler/bin/wrangler.js", import.meta.url),
);

async function withWrangler(check) {
  const port = await availablePort();
  const output = [];
  const child = spawn(
    process.execPath,
    [
      wrangler,
      "dev",
      "--local",
      "--ip",
      "127.0.0.1",
      "--local-protocol",
      "http",
      "--port",
      String(port),
    ],
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
    const details = output.join("").trim();
    if (details) process.stderr.write(`${details}\n`);
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

await withWrangler(async ({ child, port }) => {
  const path = "/de/case-studies/dig-gopher-explorer/?ref=runtime%20test&lang=de";
  const response = await waitForResponse(port, path, child);
  const location = new URL(response.headers.location);

  assert.equal(response.status, 301);
  assert.equal(location.hostname, "127.0.0.1");
  assert.equal(location.pathname, "/de/case-studies/dig-gopher-explorer/");
  assert.equal(location.search, "?ref=runtime%20test&lang=de");
});

process.stdout.write(
  "Wrangler local runtime executed the redirect without losing its path or query.\n",
);
