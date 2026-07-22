import { rm } from "node:fs/promises";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const outputDirectory = resolve(projectRoot, "dist");

if (!outputDirectory.startsWith(`${projectRoot}\\`) && !outputDirectory.startsWith(`${projectRoot}/`)) {
  throw new Error("Refusing to clean a directory outside the project.");
}

await rm(outputDirectory, { recursive: true, force: true });
