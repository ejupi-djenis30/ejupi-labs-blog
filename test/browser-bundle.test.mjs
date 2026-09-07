import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

test("the emitted browser entry point runs without unpublished relative modules", async () => {
  const assets = new URL("../dist/assets/", import.meta.url);
  const entry = (await readdir(assets)).find((name) => /^client\.[a-f0-9]+\.js$/.test(name));
  assert.ok(entry, "Build the site before running generated-asset checks.");
  const source = await readFile(new URL(entry, assets), "utf8");
  // A data URL has no directory from which unresolved relative imports can
  // load. Importing the actual output catches missing modules in production.
  const module = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);
  assert.equal(module.matchesCaseStudy({ text: "Local inference" }, { query: "inference" }), true);
});
