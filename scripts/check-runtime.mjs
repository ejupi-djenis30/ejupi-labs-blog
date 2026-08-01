import { pathToFileURL } from "node:url";

export const SUPPORTED_NODE_RANGE = ">=22.23.1 <23 || >=24.18.0 <25";

function parseNodeVersion(version) {
  const match = /^(?:v)?(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)$/u.exec(
    String(version),
  );
  if (!match) return null;

  return Object.fromEntries(
    Object.entries(match.groups).map(([key, value]) => [key, Number(value)]),
  );
}

export function supportsNodeVersion(version) {
  const parsed = parseNodeVersion(version);
  if (!parsed) return false;

  const { major, minor, patch } = parsed;
  return (
    (major === 22 && (minor > 23 || (minor === 23 && patch >= 1))) ||
    (major === 24 && minor >= 18)
  );
}

export function assertSupportedNodeVersion(version = process.versions.node) {
  if (!supportsNodeVersion(version)) {
    throw new Error(
      `Unsupported Node.js v${version}. Required: ${SUPPORTED_NODE_RANGE}.`,
    );
  }
}

const isMainModule =
  process.argv[1] !== undefined &&
  pathToFileURL(process.argv[1]).href === import.meta.url;

if (isMainModule) {
  try {
    assertSupportedNodeVersion();
    process.stdout.write(
      `Node.js ${process.version} satisfies ${SUPPORTED_NODE_RANGE}.\n`,
    );
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
