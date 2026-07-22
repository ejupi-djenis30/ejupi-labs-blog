import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("English case-study index links to all three canonical articles", async () => {
  const html = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
  for (const slug of ["ai-workflow-cloud-migration", "archival-workflow-management", "retail-erp-evolution"]) {
    assert.match(html, new RegExp(`href="/case-studies/${slug}/"`));
  }
});

test("localized article keeps its language switch on the equivalent article", async () => {
  const html = await readFile(new URL("../dist/de/case-studies/archival-workflow-management/index.html", import.meta.url), "utf8");
  assert.match(html, /href="\/it\/case-studies\/archival-workflow-management\/"/);
  assert.match(html, /href="\/fr\/case-studies\/archival-workflow-management\/"/);
  assert.match(html, /hreflang="x-default" href="https:\/\/blog\.ejupilabs\.com\/case-studies\/archival-workflow-management\/"/);
});
