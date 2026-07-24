import { createReadStream } from "node:fs";
import { access, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, resolve, sep } from "node:path";

const root = resolve(import.meta.dirname, "..", "dist");
const portArgument = process.argv.indexOf("--port");
const port = Number(portArgument === -1 ? 8792 : process.argv[portArgument + 1]);

if (!Number.isInteger(port) || port < 1 || port > 65_535) {
  throw new Error("Expected --port to be a valid TCP port.");
}

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".woff2", "font/woff2"],
  [".xml", "application/xml; charset=utf-8"],
]);

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function resolveRequest(pathname) {
  const decoded = decodeURIComponent(pathname);
  const relative = normalize(decoded.replace(/^\/+/u, ""));
  const target = resolve(root, relative);
  if (target !== root && !target.startsWith(`${root}${sep}`)) return null;

  if (await exists(target)) {
    const details = await stat(target);
    if (details.isFile()) return target;
    if (details.isDirectory() && await exists(join(target, "index.html"))) {
      return join(target, "index.html");
    }
  }
  if (!extname(target) && await exists(join(target, "index.html"))) {
    return join(target, "index.html");
  }
  return null;
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);
    const file = await resolveRequest(url.pathname);
    const target = file ?? join(root, "404.html");
    response.writeHead(file ? 200 : 404, {
      "Content-Type": contentTypes.get(extname(target)) ?? "application/octet-stream",
      "Cache-Control": "no-store",
    });
    createReadStream(target).pipe(response);
  } catch {
    response.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Bad request");
  }
});

server.listen(port, "127.0.0.1", () => {
  process.stdout.write(`Static test server listening on http://127.0.0.1:${port}\n`);
});
