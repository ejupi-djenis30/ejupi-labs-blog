import assert from "node:assert/strict";
import test from "node:test";
import {
  caseDefinitions,
  localeOrder,
  locales,
  protectedLegacySlugs,
  relatedCaseDefinitions,
} from "../src/content.mjs";
import { editorialUi, methodology } from "../src/editorial.mjs";
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
        assert.match(definition.sourceRef, /^v\d+\.\d+\.\d+$/u);
        assert.match(
          definition.sourceUrl,
          /^https:\/\/github\.com\/[^/]+\/[^/]+\/commit\/[0-9a-f]{40}$/u,
        );
        assert.equal(definition.verifiedAt, "2026-07-25");
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
    if (definition.kind === "professional") {
      assert.equal(definition.projectUrl, undefined);
      assert.equal(definition.sourceRef, undefined);
      assert.equal(definition.sourceUrl, undefined);
      assert.equal(definition.verifiedAt, undefined);
    }
  }
});

test("Labs source metadata is required and must resolve to an immutable commit", () => {
  const missingSourceRef = caseDefinitions.map((definition) =>
    definition.slug === "careeros-local" ? structuredClone(definition) : definition,
  );
  delete missingSourceRef.find(({ slug }) => slug === "careeros-local").sourceRef;
  assert.throws(
    () =>
      assertDefinitionCatalog(missingSourceRef, {
        localeOrder,
        protectedLegacySlugs,
      }),
    /sourceRef: expected a non-empty string/u,
  );

  const mutableSource = caseDefinitions.map((definition) =>
    definition.slug === "careeros-local"
      ? {
          ...structuredClone(definition),
          sourceUrl: "https://github.com/ejupi-djenis30/careeros-local/tree/main",
        }
      : definition,
  );
  assert.throws(
    () =>
      assertDefinitionCatalog(mutableSource, {
        localeOrder,
        protectedLegacySlugs,
      }),
    /expected an immutable GitHub commit URL/u,
  );
});

test("related case studies have a deterministic editorial order", () => {
  const expected = {
    "ai-workflow-cloud-migration": [
      "archival-workflow-management",
      "retail-erp-evolution",
    ],
    "archival-workflow-management": [
      "ai-workflow-cloud-migration",
      "retail-erp-evolution",
    ],
    "retail-erp-evolution": [
      "archival-workflow-management",
      "ai-workflow-cloud-migration",
    ],
    "careeros-local": ["djenis-ai-agent", "eliza-lab"],
    "eliza-lab": ["careeros-local", "djenis-ai-agent"],
    "djenis-ai-agent": ["careeros-local", "eliza-lab"],
    "dig-gopher-explorer": ["djenis-ai-agent", "integradraw"],
    integradraw: ["dig-gopher-explorer", "vector-placement-operations"],
    "vector-placement-operations": ["integradraw", "dig-gopher-explorer"],
  };

  for (const localeKey of localeOrder) {
    for (const definition of caseDefinitions) {
      assert.deepEqual(
        relatedCaseDefinitions(definition, caseDefinitions, {
          localeKey,
          limit: 2,
        }).map(({ slug }) => slug),
        expected[definition.slug],
      );
    }
  }
});

test("methodology copy is complete and localized in every supported language", () => {
  assert.match(methodology.published, /^\d{4}-\d{2}-\d{2}$/u);
  assert.match(methodology.updated, /^\d{4}-\d{2}-\d{2}$/u);

  for (const localeKey of localeOrder) {
    const copy = methodology.copy[localeKey];
    assert.ok(copy);
    for (const key of ["eyebrow", "title", "description", "intro", "contactLabel"]) {
      assert.equal(typeof copy[key], "string");
      assert.ok(copy[key].trim());
    }
    assert.deepEqual(
      copy.sections.map(({ id }) => id),
      ["labs-evidence", "professional-anonymisation", "corrections"],
    );
    assert.ok(copy.sections.every(({ paragraphs }) => paragraphs.length > 0));
    assert.ok(copy.sections.at(-1).paragraphs.join(" ").includes("info@ejupilabs.com"));
    if (localeKey !== "en") assert.notEqual(copy.intro, methodology.copy.en.intro);
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
    "verifiedSource",
    "verifiedOn",
    "related",
    "methodology",
    "personal",
    "professionalShort",
    "labsShort",
    "searchLoading",
    "searchFallback",
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
