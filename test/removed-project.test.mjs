import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { basename, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const DIST = join(ROOT, "dist");
const SELF = fileURLToPath(import.meta.url);
const FORBIDDEN = /djenis-ai-agent|DjenisAiAgent/iu;
const EXCLUDED_DIRECTORIES = new Set([
  ".git",
  ".wrangler",
  "dist",
  "node_modules",
  "playwright-report",
  "test-results",
]);
const BINARY_EXTENSIONS = new Set([
  ".gif",
  ".ico",
  ".jpeg",
  ".jpg",
  ".pdf",
  ".png",
  ".webp",
  ".woff2",
  ".zip",
]);

async function textFiles(directory, { excludeGenerated = false } = {}) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      if (excludeGenerated && EXCLUDED_DIRECTORIES.has(entry.name)) continue;
      files.push(...await textFiles(path, { excludeGenerated }));
      continue;
    }
    if (!entry.isFile() || BINARY_EXTENSIONS.has(extname(entry.name).toLowerCase())) {
      continue;
    }
    files.push(path);
  }
  return files;
}

test("removed project references cannot return to source or generated output", async () => {
  const sourceFiles = await textFiles(ROOT, { excludeGenerated: true });
  const generatedFiles = await textFiles(DIST);

  for (const path of [...sourceFiles, ...generatedFiles]) {
    if (path === SELF) continue;
    const contents = await readFile(path, "utf8");
    assert.doesNotMatch(
      contents,
      FORBIDDEN,
      `${relative(ROOT, path) || basename(path)} contains removed project residue`,
    );
  }
});
