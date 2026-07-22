import assert from "node:assert/strict";
import test from "node:test";
import { caseDefinitions, localeOrder, locales } from "../src/content.mjs";

test("every locale contains the same complete case-study structure", () => {
  const expectedSections = ["starting", "constraints", "diagnosis", "architecture", "decisions", "delivery", "result"];

  for (const localeKey of localeOrder) {
    const locale = locales[localeKey];
    assert.equal(Object.keys(locale.cases).length, 3);

    for (const definition of caseDefinitions) {
      const study = locale.cases[definition.slug];
      assert.ok(study, `${localeKey} is missing ${definition.slug}`);
      for (const section of expectedSections) assert.ok(study[section], `${localeKey}/${definition.slug} is missing ${section}`);
      assert.equal(study.decisions.items.length, 3);
      assert.equal(study.constraints.items.length, 4);
      assert.equal(study.architecture.labels.length, 5);
      assert.ok(study.scope.length > 40);
    }
  }
});

test("public slugs remain stable", () => {
  assert.deepEqual(caseDefinitions.map(({ slug }) => slug), [
    "ai-workflow-cloud-migration",
    "archival-workflow-management",
    "retail-erp-evolution",
  ]);
});
