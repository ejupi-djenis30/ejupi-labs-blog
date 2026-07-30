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
  const expectedSections = ["starting", "constraints", "diagnosis", "architecture", "technology", "decisions", "delivery", "result"];

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
      assert.equal(study.technology.items.length, 4);
      for (const choice of study.technology.items) {
        for (const key of ["choice", "why", "alternative", "cost"]) {
          assert.ok(choice[key].length > 20, `${localeKey}/${definition.slug}.technology.${key} is too vague`);
        }
      }
      assert.equal(study.decisions.items.length, definition.kind === "professional" ? 4 : 3);
      if (definition.kind === "professional") {
        assert.ok(study.constraints.items.length >= 5);
      } else {
        assert.equal(study.constraints.items.length, 4);
      }
      assert.equal(study.architecture.labels.length, 5);
      assert.ok(study.scope.length > 40);
      if (definition.kind === "professional") {
        for (const section of ["starting", "diagnosis", "delivery", "result"]) {
          assert.ok(
            study[section].paragraphs.length >= 3,
            `${localeKey}/${definition.slug}.${section} needs the full reasoning`,
          );
        }
      }
      if (definition.kind === "labs") {
        assert.ok(study.evidence.items.length >= 4);
        assert.ok(["release", "snapshot"].includes(definition.sourceState));
        assert.ok(
          definition.projectUrl.startsWith("https://ejupi-djenis30.github.io/"),
        );
        assert.match(definition.sourceRef, /^v\d+\.\d+\.\d+$/u);
        assert.match(
          definition.sourceUrl,
          /^https:\/\/(?:github\.com\/[^/]+\/[^/]+\/commit|api\.github\.com\/repositories\/\d+\/commits)\/[0-9a-f]{40}$/u,
        );
        assert.ok(
          definition.verifiedAt <= definition.updated,
          `${definition.slug} cannot be verified after its editorial update`,
        );
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

test("professional cases preserve the documented constraints without exposing client identities", () => {
  const localizedExpectations = {
    en: {
      archivalShell: /header[\s\S]*footer/iu,
      clientContact: /direct contact with the client/iu,
      compatibility: /backward-compatible/iu,
    },
    it: {
      archivalShell: /header[\s\S]*footer/iu,
      clientContact: /contatto diretto con il cliente/iu,
      compatibility: /retrocompatibil/iu,
    },
    de: {
      archivalShell: /Header[\s\S]*Footer/u,
      clientContact: /direkt[\s\S]{0,80}Kund/iu,
      compatibility: /rückwärtskompatibel/iu,
    },
    fr: {
      archivalShell: /header[\s\S]*footer/iu,
      clientContact: /contact direct avec le client/iu,
      compatibility: /rétrocompatibl/iu,
    },
  };

  for (const localeKey of localeOrder) {
    const cloud = JSON.stringify(locales[localeKey].cases["ai-workflow-cloud-migration"]);
    const archival = JSON.stringify(locales[localeKey].cases["archival-workflow-management"]);
    const erp = JSON.stringify(locales[localeKey].cases["retail-erp-evolution"]);
    const expectation = localizedExpectations[localeKey];

    assert.match(archival, /single-spa/iu);
    assert.match(archival, expectation.archivalShell);
    assert.match(erp, /\.NET Framework 4\.8/u);
    assert.match(erp, /Knockout/iu);
    assert.match(erp, /jQuery/u);
    assert.match(erp, /VB6/u);
    assert.match(erp, expectation.clientContact);
    assert.match(erp, expectation.compatibility);
    assert.doesNotMatch(cloud, /\b\d+(?:[.,]\d+)?\s*%/u);
    assert.doesNotMatch(
      `${cloud}${archival}${erp}`,
      /Jmatica|Archivio Centrale|Var4Retail|Sky Store|DHL|GLS/iu,
    );
  }
});

test("protected public routes cannot be removed but new cases are allowed", () => {
  assert.doesNotThrow(() =>
    assertProtectedLegacySlugs(caseDefinitions, protectedLegacySlugs),
  );

  const futureCase = {
    ...structuredClone(caseDefinitions[0]),
    slug: "future-case-study",
    number: "11",
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
      assert.equal(definition.sourceState, undefined);
      assert.equal(definition.sourceRef, undefined);
      assert.equal(definition.sourceUrl, undefined);
      assert.equal(definition.verifiedAt, undefined);
    }
  }
});

test("Labs source metadata is required and must resolve to an immutable commit", () => {
  const missingSourceState = caseDefinitions.map((definition) =>
    definition.slug === "careeros-local" ? structuredClone(definition) : definition,
  );
  delete missingSourceState.find(({ slug }) => slug === "careeros-local").sourceState;
  assert.throws(
    () =>
      assertDefinitionCatalog(missingSourceState, {
        localeOrder,
        protectedLegacySlugs,
      }),
    /sourceState: expected a non-empty string/u,
  );

  const invalidSourceState = caseDefinitions.map((definition) =>
    definition.slug === "careeros-local"
      ? { ...structuredClone(definition), sourceState: "branch" }
      : definition,
  );
  assert.throws(
    () =>
      assertDefinitionCatalog(invalidSourceState, {
        localeOrder,
        protectedLegacySlugs,
      }),
    /sourceState: expected release or snapshot/u,
  );

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

  assert.deepEqual(
    caseDefinitions
      .filter(({ kind, sourceState }) => kind === "labs" && sourceState === "snapshot")
      .map(({ slug }) => slug),
    ["careeros-local", "jdoor-security-lab"],
  );
  assert.ok(
    caseDefinitions
      .filter(
        ({ kind, sourceState }) =>
          kind === "labs" && sourceState === "release",
      )
      .every(({ slug }) => slug !== "jdoor-security-lab"),
  );
});

test("CareerOS documents the v1.9.0 candidate without presenting it as a published release", () => {
  const definition = caseDefinitions.find(({ slug }) => slug === "careeros-local");
  assert.ok(definition);
  assert.equal(definition.updated, "2026-07-30");
  assert.equal(definition.verifiedAt, "2026-07-30");
  assert.equal(definition.sourceState, "snapshot");
  assert.equal(definition.sourceRef, "v1.9.0");
  assert.equal(
    definition.sourceUrl,
    "https://github.com/ejupi-djenis30/careeros-local/commit/253cde2b75b085808ff11902eb3be0be0ce19e36",
  );

  const localizedClaims = {
    en: {
      candidate: /candidate/iu,
      cvFirst: /CV-first|existing CV/iu,
      dossier: /revisioned dossier|dossier draft/iu,
      agentAccess: /Agent Access/iu,
      readOnly: /read-only/iu,
    },
    it: {
      candidate: /candidato/iu,
      cvFirst: /CV/iu,
      dossier: /dossier revisionati|bozz[ae] dossier/iu,
      agentAccess: /Accesso agenti|Agent Access/iu,
      readOnly: /sola lettura/iu,
    },
    de: {
      candidate: /Kandidat/iu,
      cvFirst: /Lebenslauf/iu,
      dossier: /Dossierentwurf|revisionsgeführte Dossiers/iu,
      agentAccess: /Agentenzugriff|Agent Access/iu,
      readOnly: /schreibgeschützt/iu,
    },
    fr: {
      candidate: /candidat/iu,
      cvFirst: /\bCV\b/u,
      dossier: /dossiers révisionnés|brouillons? de dossier/iu,
      agentAccess: /Accès des agents|Agent Access/iu,
      readOnly: /lecture seule/iu,
    },
  };

  for (const localeKey of localeOrder) {
    const study = locales[localeKey].cases[definition.slug];
    const copy = JSON.stringify(study);
    const claims = localizedClaims[localeKey];
    assert.match(copy, /v1\.9\.0/u);
    assert.doesNotMatch(copy, /v1\.8\.0/u);
    assert.match(copy, /1(?:,|\.| )532/u);
    assert.match(copy, /81(?:,|\.)42\s?(?:%| %)/u);
    assert.match(copy, /396/u);
    assert.match(copy, /\b17\b/u);
    assert.match(copy, /archive v6|archivio v6|Archiv v6|format v6/iu);
    assert.match(copy, /\bCLI\b/u);
    assert.match(copy, /\bMCP\b/u);
    assert.match(copy, claims.candidate);
    assert.match(copy, claims.cvFirst);
    assert.match(copy, claims.dossier);
    assert.match(copy, claims.agentAccess);
    assert.match(copy, claims.readOnly);
    assert.doesNotMatch(copy, /signed v1\.9\.0|v1\.9\.0 firmata|signiertes v1\.9\.0|v1\.9\.0 signée/iu);
    assert.doesNotMatch(copy, /published v1\.9\.0|v1\.9\.0 pubblicata|veröffentlichtes v1\.9\.0|v1\.9\.0 publiée/iu);
  }
});

test("DjenisAiAgent documents the checked local-first model boundary in every locale", () => {
  const definition = caseDefinitions.find(({ slug }) => slug === "djenis-ai-agent");
  assert.ok(definition);
  assert.equal(definition.updated, "2026-07-29");
  assert.equal(definition.verifiedAt, "2026-07-29");
  assert.equal(definition.sourceState, "release");
  assert.equal(definition.sourceRef, "v0.3.0");
  assert.equal(
    definition.sourceUrl,
    "https://github.com/ejupi-djenis30/DjenisAiAgent/commit/946160fee919566b4167126185395e2d42dfb6a6",
  );
  assert.deepEqual(definition.stack, [
    "Python",
    "Ollama",
    "OpenAI-compatible API",
    "Windows UIA",
    "Selenium",
  ]);

  for (const localeKey of localeOrder) {
    const study = locales[localeKey].cases[definition.slug];
    const copy = JSON.stringify(study);
    assert.match(copy, /Ollama/u);
    assert.match(copy, /OpenAI/u);
    assert.match(copy, /600/u);
    assert.match(copy, /946160f/u);
    assert.doesNotMatch(copy, /Gemini/u);
    assert.equal(study.evidence.items.length, 5);
  }
});

test("DIG documents the checked Android and offline-safe v3.2 product in every locale", () => {
  const definition = caseDefinitions.find(({ slug }) => slug === "dig-gopher-explorer");
  assert.ok(definition);
  assert.equal(definition.updated, "2026-07-29");
  assert.equal(definition.verifiedAt, "2026-07-29");
  assert.equal(definition.sourceState, "release");
  assert.equal(definition.sourceRef, "v3.2.0");
  assert.equal(
    definition.sourceUrl,
    "https://github.com/ejupi-djenis30/Dig/commit/75eda488941afc588f3cb650a660f74639a9dfc2",
  );
  assert.deepEqual(definition.stack, ["Node.js", "Android", "TCP", "RFC 1436 / 4266", "Capacitor"]);

  for (const localeKey of localeOrder) {
    const study = locales[localeKey].cases[definition.slug];
    const copy = JSON.stringify(study);
    assert.match(study.summary, /3\.2\.0/u);
    assert.match(copy, /Android/u);
    assert.match(copy, /Capacitor/u);
    assert.match(copy, /PWA/u);
    assert.match(copy, /102/u);
    assert.match(copy, /15/u);
    assert.doesNotMatch(copy, /3\.0\.0/u);
  }
});

test("VECTOR is presented as the bounded self-hosted v3.3 product in every locale", () => {
  const definition = caseDefinitions.find(({ slug }) => slug === "vector-placement-operations");
  assert.ok(definition);
  assert.equal(definition.updated, "2026-07-29");
  assert.equal(definition.verifiedAt, "2026-07-29");
  assert.equal(definition.sourceState, "release");
  assert.equal(definition.sourceRef, "v3.3.0");
  assert.equal(
    definition.sourceUrl,
    "https://github.com/ejupi-djenis30/vector-placement-operations/commit/0a99a9f2c0051a61c1f21c03c0eff48e6d0d2ef1",
  );
  assert.deepEqual(definition.stack, ["Node.js", "Express", "SQLite", "Docker", "Playwright"]);

  const deploymentClaims = {
    en: /one school per installation/iu,
    it: /una scuola per installazione/iu,
    de: /eine schule pro installation/iu,
    fr: /une école par installation/iu,
  };
  const programmeClaims = {
    en: /programme policy/iu,
    it: /policy di programma/iu,
    de: /programmrichtlinie/iu,
    fr: /politique de programme/iu,
  };
  const coverageClaims = {
    en: /cohort coverage/iu,
    it: /copertura della coorte/iu,
    de: /kohortenabdeckung/iu,
    fr: /couverture de cohorte/iu,
  };
  const attentionClaims = {
    en: /attention queue/iu,
    it: /coda operativa/iu,
    de: /aufgabenliste/iu,
    fr: /file opérationnelle/iu,
  };

  for (const localeKey of localeOrder) {
    const study = locales[localeKey].cases[definition.slug];
    const copy = JSON.stringify(study);
    assert.match(study.summary, /3\.3\.0/u);
    assert.match(study.facts.flat().join(" "), deploymentClaims[localeKey]);
    assert.equal(study.evidence.items.length, 5);
    assert.match(study.architecture.intro, /AES-GCM/u);
    assert.match(copy, programmeClaims[localeKey]);
    assert.match(copy, coverageClaims[localeKey]);
    assert.match(copy, attentionClaims[localeKey]);
    assert.match(copy, /89/u);
    assert.match(copy, /22/u);
    assert.match(copy, /SQLite/u);
    assert.match(copy, /SaaS/u);
    assert.doesNotMatch(copy, /3\.0\.0/u);
  }

  const englishStudy = locales.en.cases[definition.slug];
  const english = JSON.stringify(englishStudy);
  assert.match(english, /immutable/iu);
  assert.match(english, /overlapping placement conflicts/iu);
  assert.match(english, /inactive sessions/iu);
  assert.match(english, /compliance certification/iu);
  const englishPositioning = JSON.stringify({
    summary: englishStudy.summary,
    facts: englishStudy.facts,
    architecture: englishStudy.architecture,
    result: englishStudy.result,
    scope: englishStudy.scope,
  });
  assert.doesNotMatch(
    englishPositioning,
    /browser-only|browser-local persistence|local storage|focused demonstrator/iu,
  );
});


test("JDoor preserves co-authorship, authorized use and the requested Labs topology", () => {
  const definition = caseDefinitions.find(({ slug }) => slug === "jdoor-security-lab");
  assert.ok(definition);
  assert.equal(definition.number, "10");
  assert.equal(definition.projectUrl, "https://ejupi-djenis30.github.io/JDoor/");
  assert.equal(definition.sourceState, "snapshot");
  assert.equal(definition.sourceRef, "v1.0.0");
  assert.equal(
    definition.sourceUrl,
    "https://api.github.com/repositories/567343188/commits/ac94dd82cdff17551826b7254165d123190aeec7",
  );

  const coCreationClaims = {
    en: /co-created[\s\S]{0,50}(?:by Djenis and|with) a collaborator/iu,
    it: /co-creat[oa][\s\S]{0,50}un collaboratore/iu,
    de: /gemeinsam[\s\S]{0,80}mitwirkenden Person/iu,
    fr: /co-créé[\s\S]{0,50}un collaborateur/iu,
  };
  const authorizedUseClaims = {
    en: /authorized/iu,
    it: /autorizzat/iu,
    de: /autorisiert/iu,
    fr: /autoris/iu,
  };

  for (const localeKey of localeOrder) {
    const study = locales[localeKey].cases[definition.slug];
    const copy = JSON.stringify(study);
    assert.equal(study.evidence.items.length, 4);
    assert.equal(study.constraints.items.length, 4);
    assert.equal(study.architecture.labels.length, 5);
    assert.equal(study.decisions.items.length, 3);
    assert.match(copy, coCreationClaims[localeKey]);
    assert.match(copy, authorizedUseClaims[localeKey]);
    assert.doesNotMatch(
      copy,
      /published as|pubblicat[oa] come|veröffentlicht als|publié sous/iu,
    );
  }
  assert.doesNotMatch(
    definition.sourceUrl,
    /^https:\/\/github\.com\/[^/]+\/JDoor\//iu,
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
    "careeros-local": ["vector-placement-operations", "eliza-lab"],
    "eliza-lab": ["careeros-local", "djenis-ai-agent"],
    "djenis-ai-agent": ["eliza-lab", "dig-gopher-explorer"],
    "dig-gopher-explorer": ["vector-placement-operations", "djenis-ai-agent"],
    integradraw: ["dig-gopher-explorer", "vector-placement-operations"],
    "vector-placement-operations": ["dig-gopher-explorer", "careeros-local"],
    "jdoor-security-lab": ["vector-placement-operations", "integradraw"],
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
  assert.equal(methodology.updated, "2026-07-30");
  const firstPersonPatterns = {
    en: /\bI\b/u,
    it: /\b(?:verifico|spiego|proteggo|correggo)\b/u,
    de: /\bich\b/iu,
    fr: /\bje\b/iu,
  };

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
    assert.match(`${copy.description} ${copy.intro}`, firstPersonPatterns[localeKey]);
    assert.doesNotMatch(`${copy.description} ${copy.intro}`, /\bEjupi Labs\b/u);
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
    "verifiedRelease",
    "verifiedCommitSnapshot",
    "verifiedOn",
    "related",
    "methodology",
    "personal",
    "searchLoading",
    "searchFallback",
    "showAll",
    "caseLabel",
    "systemViewLabel",
    "versionedDeliveryPathLabel",
    "processStateReturnLabel",
    "choiceLabel",
    "whyLabel",
    "alternativeLabel",
    "costLabel",
    "tradeoffLabel",
  ];

  for (const localeKey of localeOrder) {
    for (const key of requiredKeys) {
      assert.equal(typeof editorialUi[localeKey]?.[key], "string");
      assert.ok(editorialUi[localeKey][key].trim().length > 0, `${localeKey}.${key} is empty`);
    }
  }
});
