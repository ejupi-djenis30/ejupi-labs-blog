import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { createCaseDraft } from "../scripts/new-case.mjs";

test("new-case scaffold stays unpublished and contains all four complete locale stubs", () => {
  const draft = createCaseDraft("future-utility");

  assert.equal(draft.status, "draft");
  assert.equal(draft.definition.slug, "future-utility");
  assert.equal(draft.definition.kind, "labs");
  assert.equal(draft.definition.sourceState, "release");
  assert.deepEqual(draft.definition.availableLocales, ["en", "it", "de", "fr"]);
  assert.deepEqual(Object.keys(draft.locales), ["en", "it", "de", "fr"]);
  for (const locale of draft.definition.availableLocales) {
    assert.equal(draft.locales[locale].architecture.labels.length, 5);
    assert.equal(draft.locales[locale].technology.items.length, 4);
    assert.equal(draft.locales[locale].decisions.items.length, 3);
    assert.equal(draft.locales[locale].evidence.items.length, 4);
  }
});

test("new-case scaffold rejects unsafe slugs and production does not import drafts", async () => {
  assert.throws(() => createCaseDraft("../unsafe"), /lowercase kebab-case/u);
  assert.throws(
    () => createCaseDraft("future-utility", { kind: "unknown" }),
    /professional or labs/u,
  );

  const buildSource = await readFile(
    new URL("../scripts/build.mjs", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(buildSource, /(?:from|join)\([^)]*drafts/iu);
});
