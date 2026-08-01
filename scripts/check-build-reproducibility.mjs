import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const PROJECT_DIRECTORY = path.resolve(import.meta.dirname, "..");
const DIST_DIRECTORY = path.join(PROJECT_DIRECTORY, "dist");

function assertSafeBuildDirectory() {
  const relative = path.relative(PROJECT_DIRECTORY, DIST_DIRECTORY);
  if (relative !== "dist" || path.isAbsolute(relative)) {
    throw new Error(`Unexpected build directory: ${DIST_DIRECTORY}`);
  }
}

function runBuild() {
  const npmCli = process.env.npm_execpath;
  const result = npmCli
    ? spawnSync(process.execPath, [npmCli, "run", "build"], {
        cwd: PROJECT_DIRECTORY,
        env: process.env,
        stdio: "inherit",
      })
    : spawnSync(process.platform === "win32" ? "npm.cmd" : "npm", ["run", "build"], {
        cwd: PROJECT_DIRECTORY,
        env: process.env,
        stdio: "inherit",
      });

  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`Build exited with status ${result.status}.`);
  }
}

async function filesBelow(directory, prefix = "") {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await filesBelow(absolutePath, relativePath)));
    } else if (entry.isFile()) {
      files.push({ absolutePath, relativePath });
    } else {
      throw new Error(`Unsupported build entry: ${relativePath}`);
    }
  }
  return files;
}

async function buildManifest() {
  const records = await Promise.all(
    (await filesBelow(DIST_DIRECTORY)).map(async ({ absolutePath, relativePath }) => {
      const contents = await readFile(absolutePath);
      return {
        path: relativePath,
        bytes: contents.byteLength,
        sha256: createHash("sha256").update(contents).digest("hex"),
      };
    }),
  );
  return records.toSorted(({ path: left }, { path: right }) =>
    left.localeCompare(right, "en"),
  );
}

function serializedManifest(manifest) {
  return manifest
    .map(({ path: filePath, bytes, sha256 }) => `${filePath}\t${bytes}\t${sha256}`)
    .join("\n");
}

assertSafeBuildDirectory();
runBuild();
const firstManifest = await buildManifest();
runBuild();
const secondManifest = await buildManifest();

const firstSerialized = serializedManifest(firstManifest);
const secondSerialized = serializedManifest(secondManifest);
if (firstSerialized !== secondSerialized) {
  const firstRecords = new Set(firstSerialized.split("\n"));
  const secondRecords = new Set(secondSerialized.split("\n"));
  const delta = [
    ...[...firstRecords].filter((record) => !secondRecords.has(record)).map((record) => `first:  ${record}`),
    ...[...secondRecords].filter((record) => !firstRecords.has(record)).map((record) => `second: ${record}`),
  ];
  throw new Error(`Build output is not reproducible:\n${delta.join("\n")}`);
}

const treeHash = createHash("sha256").update(firstSerialized).digest("hex");
process.stdout.write(
  `Verified reproducible build: ${firstManifest.length} files, tree SHA-256 ${treeHash}.\n`,
);
