import assert from "node:assert/strict";
import test from "node:test";
import { caseDefinitions, localeOrder, locales } from "../src/content.mjs";

test("every locale contains the same complete case-study structure", () => {
  const expectedSections = ["starting", "constraints", "diagnosis", "architecture", "decisions", "delivery", "result"];

  for (const localeKey of localeOrder) {
    const locale = locales[localeKey];
    assert.equal(Object.keys(locale.cases).length, 9);

    for (const definition of caseDefinitions) {
      const study = locale.cases[definition.slug];
      assert.ok(study, `${localeKey} is missing ${definition.slug}`);
      for (const section of expectedSections) assert.ok(study[section], `${localeKey}/${definition.slug} is missing ${section}`);
      assert.equal(study.decisions.items.length, 3);
      assert.equal(study.constraints.items.length, 4);
      assert.equal(study.architecture.labels.length, 5);
      assert.ok(study.scope.length > 40);
      if (definition.kind === "labs") {
        assert.equal(study.evidence.items.length, 4);
        assert.ok(definition.projectUrl.startsWith("https://ejupi-djenis30.github.io/"));
        if (localeKey !== "en") {
          assert.notEqual(
            study.summary,
            locales.en.cases[definition.slug].summary,
            `${localeKey}/${definition.slug} must not fall back to English`,
          );
        }
      }
    }
  }
});

test("public slugs remain stable", () => {
  assert.deepEqual(caseDefinitions.map(({ slug }) => slug), [
    "ai-workflow-cloud-migration",
    "archival-workflow-management",
    "retail-erp-evolution",
    "careeros-local",
    "eliza-lab",
    "djenis-ai-agent",
    "dig-gopher-explorer",
    "integradraw",
    "vector-placement-operations",
  ]);
});

test("every case study declares stable editorial metadata", () => {
  for (const definition of caseDefinitions) {
    assert.match(definition.number, /^\d{2}$/);
    assert.ok(["professional", "labs"].includes(definition.kind));
    assert.deepEqual(definition.availableLocales, localeOrder);
    assert.match(definition.published, /^\d{4}-\d{2}-\d{2}$/);
    assert.match(definition.updated, /^\d{4}-\d{2}-\d{2}$/);
  }
});
