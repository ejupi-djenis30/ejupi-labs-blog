import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  SUPPORTED_NODE_RANGE,
  supportsNodeVersion,
} from "../scripts/check-runtime.mjs";

const packageJson = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf8"),
);
const npmConfig = await readFile(new URL("../.npmrc", import.meta.url), "utf8");
const ciWorkflow = await readFile(
  new URL("../.github/workflows/ci.yml", import.meta.url),
  "utf8",
);
const codeqlWorkflow = await readFile(
  new URL("../.github/workflows/codeql.yml", import.meta.url),
  "utf8",
);
const normalizedCiWorkflow = ciWorkflow.replaceAll("\r\n", "\n");

function workflowJob(name) {
  const marker = `  ${name}:\n`;
  const start = normalizedCiWorkflow.indexOf(marker);
  assert.notEqual(start, -1, `missing ${name} job`);
  const remainder = normalizedCiWorkflow.slice(start + marker.length);
  const nextJob = remainder.search(/^  [a-z0-9][a-z0-9-]*:\n/mu);
  return normalizedCiWorkflow.slice(
    start,
    nextJob === -1 ? undefined : start + marker.length + nextJob,
  );
}

test("the Node.js policy enforces the exact supported release lines", () => {
  assert.equal(SUPPORTED_NODE_RANGE, ">=22.23.1 <23 || >=24.18.0 <25");
  assert.equal(packageJson.engines.node, SUPPORTED_NODE_RANGE);
  assert.equal(npmConfig.trim(), "engine-strict=true");

  for (const version of ["22.23.1", "22.99.0", "24.18.0", "24.99.0"]) {
    assert.equal(supportsNodeVersion(version), true, version);
  }
  for (const version of [
    "22.23.0",
    "23.0.0",
    "24.16.0",
    "24.17.99",
    "25.0.0",
    "invalid",
  ]) {
    assert.equal(supportsNodeVersion(version), false, version);
  }
});

test("every build, test, check and deploy entry point runs the runtime preflight", () => {
  for (const command of [
    "build",
    "test",
    "test:e2e",
    "test:worker:integration",
    "check",
    "deploy",
  ]) {
    assert.match(packageJson.scripts[`pre${command}`], /npm run check:runtime/u, command);
  }
});

test("typechecking covers both the Worker and browser DOM entry points", () => {
  assert.match(packageJson.scripts.typecheck, /tsc -p tsconfig\.worker\.json/u);
  assert.match(packageJson.scripts.typecheck, /tsc -p tsconfig\.client\.json/u);
});

test("GitHub workflows pin third-party actions and keep repository access read-only", () => {
  for (const workflow of [ciWorkflow, codeqlWorkflow]) {
    assert.match(workflow, /^permissions:\r?\n  contents: read\r?$/mu);
    assert.doesNotMatch(workflow, /permissions:\s*write-all/u);

    const actions = [...workflow.matchAll(/^\s*uses:\s*([^\s#]+)/gmu)];
    assert.ok(actions.length > 0);
    for (const [, action] of actions) {
      assert.match(action, /^[^@\s]+@[0-9a-f]{40}$/u, action);
    }
  }

  assert.match(
    codeqlWorkflow,
    /^      security-events: write # Required for CodeQL to upload SARIF findings\.\r?$/mu,
  );
});

test("CI secret scanning is bounded, checksum-pinned and fail-closed", () => {
  const securityJob = workflowJob("security");
  const requiredTokens = [
    "    name: Secret scan",
    "    runs-on: ubuntu-24.04",
    "    timeout-minutes: 5",
    "    permissions:\n      contents: read",
    "uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1",
    "persist-credentials: false",
    'GITLEAKS_VERSION: "8.30.1"',
    'GITLEAKS_SHA256: "551f6fc83ea457d62a0d98237cbad105af8d557003051f41f3e7ca7b3f2470eb"',
    "set -euo pipefail",
    "curl --fail --silent --show-error --location --proto '=https' --tlsv1.2",
    "sha256sum --check --strict",
    'tar --extract --gzip --file "${RUNNER_TEMP}/${archive}" --directory "${RUNNER_TEMP}" gitleaks',
    '\"${RUNNER_TEMP}/gitleaks\" dir . --redact --no-banner --no-color --exit-code 1',
  ];
  for (const token of requiredTokens) {
    assert.ok(securityJob.includes(token), token);
  }

  const download = securityJob.indexOf("curl --fail");
  const checksum = securityJob.indexOf("sha256sum --check --strict");
  const extraction = securityJob.indexOf("tar --extract");
  const scan = securityJob.indexOf('"${RUNNER_TEMP}/gitleaks" dir .');
  assert.ok(download < checksum && checksum < extraction && extraction < scan);
  assert.doesNotMatch(securityJob, /continue-on-error|\|\|\s*true/u);
});
