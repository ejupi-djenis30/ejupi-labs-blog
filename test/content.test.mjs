import assert from "node:assert/strict";
import test from "node:test";
import {
  caseDefinitions,
  localeOrder,
  locales,
  protectedLegacySlugs,
} from "../src/content.mjs";
import { editorialUi } from "../src/editorial.mjs";
import {
  assertDefinitionCatalog,
  assertLocalizedCopy,
  assertProtectedLegacySlugs,
} from "../src/content-contract.mjs";

test("every locale contains the same complete case-study structure", () => {
  const expectedSections = ["starting", "constraints", "diagnosis", "architecture", "decisions", "delivery", "result"];

  for (const localeKey of localeOrder) {
    const locale = locales[localeKey];
    const expectedDefinitions = caseDefinitions.filter((definition) =>
      definition.availableLocales.includes(localeKey),
    );
    assert.equal(Object.keys(locale.cases).length, expectedDefinitions.length);

    for (const definition of expectedDefinitions) {
      const study = locale.cases[definition.slug];
      assert.ok(study, `${localeKey} is missing ${definition.slug}`);
      for (const section of expectedSections) assert.ok(study[section], `${localeKey}/${definition.slug} is missing ${section}`);
      assert.equal(study.decisions.items.length, 3);
      assert.equal(study.constraints.items.length, 4);
      assert.equal(study.architecture.labels.length, 5);
      assert.ok(study.scope.length > 40);
      if (definition.kind === "labs") {
        assert.ok(study.evidence.items.length >= 4);
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

test("protected public routes cannot be removed but new cases are allowed", () => {
  assert.doesNotThrow(() =>
    assertProtectedLegacySlugs(caseDefinitions, protectedLegacySlugs),
  );

  const futureCase = {
    ...structuredClone(caseDefinitions[0]),
    slug: "future-case-study",
    number: "10",
    published: "2026-08-01",
    updated: "2026-08-01",
  };
  assert.doesNotThrow(() =>
    assertDefinitionCatalog([...caseDefinitions, futureCase], {
      localeOrder,
      protectedLegacySlugs,
    }),
  );

  const withoutLegacyRoute = caseDefinitions.filter(
    ({ slug }) => slug !== protectedLegacySlugs[0],
  );
  assert.throws(
    () => assertProtectedLegacySlugs(withoutLegacyRoute, protectedLegacySlugs),
    /protected public routes were removed/u,
  );
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

test("a missing localized leaf fails closed with its exact content path", () => {
  const slug = "careeros-local";
  const incomplete = structuredClone(locales.it.cases[slug]);
  delete incomplete.decisions.items[1].tradeoff;

  assert.throws(
    () =>
      assertLocalizedCopy(locales.en.cases[slug], incomplete, {
        path: `it/${slug}`,
      }),
    /it\/careeros-local\.decisions\.items\[1\]\.tradeoff: missing localized content/u,
  );
});

test("editorial chrome and visible byline labels are complete in every locale", () => {
  const requiredKeys = [
    "bylineBy",
    "authorRole",
    "lastVerified",
    "caseLabel",
    "casesLabel",
    "indexLabel",
    "noteLabel",
    "countryLabel",
    "systemViewLabel",
    "versionedDeliveryPathLabel",
    "processStateReturnLabel",
  ];

  for (const localeKey of localeOrder) {
    for (const key of requiredKeys) {
      assert.equal(typeof editorialUi[localeKey]?.[key], "string");
      assert.ok(editorialUi[localeKey][key].trim().length > 0, `${localeKey}.${key} is empty`);
    }
  }
});
