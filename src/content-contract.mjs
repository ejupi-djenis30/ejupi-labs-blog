const CASE_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/u;
const NUMBER_PATTERN = /^\d{2}$/u;
const CASE_KINDS = new Set(["professional", "labs"]);

function fail(path, message) {
  throw new Error(`${path}: ${message}`);
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function assertNonEmptyString(value, path) {
  if (typeof value !== "string" || value.trim().length === 0) {
    fail(path, "expected a non-empty string.");
  }
}

function assertStringArray(value, path, { exactLength } = {}) {
  if (!Array.isArray(value) || value.length === 0) {
    fail(path, "expected a non-empty array.");
  }
  if (exactLength !== undefined && value.length !== exactLength) {
    fail(path, `expected exactly ${exactLength} entries.`);
  }
  value.forEach((item, index) => assertNonEmptyString(item, `${path}[${index}]`));
}

function assertParagraphSection(section, path) {
  if (!isPlainObject(section)) fail(path, "expected an object.");
  assertNonEmptyString(section.title, `${path}.title`);
  assertStringArray(section.paragraphs, `${path}.paragraphs`);
}

function assertPairs(value, path) {
  if (!Array.isArray(value) || value.length === 0) {
    fail(path, "expected a non-empty array of term/detail pairs.");
  }
  value.forEach((pair, index) => {
    if (!Array.isArray(pair) || pair.length !== 2) {
      fail(`${path}[${index}]`, "expected a two-item term/detail pair.");
    }
    assertNonEmptyString(pair[0], `${path}[${index}][0]`);
    assertNonEmptyString(pair[1], `${path}[${index}][1]`);
  });
}

export function assertCompleteCaseStudy(study, { kind, path }) {
  if (!isPlainObject(study)) fail(path, "expected a case-study object.");

  for (const key of ["category", "cardTitle", "title", "summary", "readMinutes", "scope"]) {
    assertNonEmptyString(study[key], `${path}.${key}`);
  }
  if (!/^\d+$/u.test(study.readMinutes)) {
    fail(`${path}.readMinutes`, "expected whole minutes expressed as digits.");
  }

  assertPairs(study.facts, `${path}.facts`);
  assertParagraphSection(study.starting, `${path}.starting`);

  if (!isPlainObject(study.constraints)) fail(`${path}.constraints`, "expected an object.");
  assertNonEmptyString(study.constraints.title, `${path}.constraints.title`);
  assertNonEmptyString(study.constraints.intro, `${path}.constraints.intro`);
  assertStringArray(study.constraints.items, `${path}.constraints.items`);

  assertParagraphSection(study.diagnosis, `${path}.diagnosis`);

  if (!isPlainObject(study.architecture)) fail(`${path}.architecture`, "expected an object.");
  assertNonEmptyString(study.architecture.title, `${path}.architecture.title`);
  assertNonEmptyString(study.architecture.intro, `${path}.architecture.intro`);
  assertStringArray(study.architecture.labels, `${path}.architecture.labels`, {
    exactLength: 5,
  });
  assertNonEmptyString(study.architecture.caption, `${path}.architecture.caption`);

  if (!isPlainObject(study.technology)) fail(`${path}.technology`, "expected an object.");
  assertNonEmptyString(study.technology.title, `${path}.technology.title`);
  assertNonEmptyString(study.technology.intro, `${path}.technology.intro`);
  if (!Array.isArray(study.technology.items) || study.technology.items.length !== 4) {
    fail(`${path}.technology.items`, "expected exactly four technology choices.");
  }
  study.technology.items.forEach((choice, index) => {
    const choicePath = `${path}.technology.items[${index}]`;
    if (!isPlainObject(choice)) fail(choicePath, "expected an object.");
    for (const key of ["choice", "why", "alternative", "cost"]) {
      assertNonEmptyString(choice[key], `${choicePath}.${key}`);
    }
  });

  if (!isPlainObject(study.decisions)) fail(`${path}.decisions`, "expected an object.");
  assertNonEmptyString(study.decisions.title, `${path}.decisions.title`);
  assertNonEmptyString(study.decisions.intro, `${path}.decisions.intro`);
  if (!Array.isArray(study.decisions.items) || study.decisions.items.length === 0) {
    fail(`${path}.decisions.items`, "expected at least one decision.");
  }
  study.decisions.items.forEach((decision, index) => {
    const decisionPath = `${path}.decisions.items[${index}]`;
    if (!isPlainObject(decision)) fail(decisionPath, "expected an object.");
    for (const key of ["title", "body", "tradeoff"]) {
      assertNonEmptyString(decision[key], `${decisionPath}.${key}`);
    }
  });

  assertParagraphSection(study.delivery, `${path}.delivery`);
  assertParagraphSection(study.result, `${path}.result`);

  if (kind === "labs") {
    if (!isPlainObject(study.evidence)) fail(`${path}.evidence`, "Labs cases require evidence.");
    assertNonEmptyString(study.evidence.title, `${path}.evidence.title`);
    assertNonEmptyString(study.evidence.intro, `${path}.evidence.intro`);
    assertPairs(study.evidence.items, `${path}.evidence.items`);
  } else if (study.evidence !== undefined) {
    fail(`${path}.evidence`, "professional cases must not add the Labs evidence section.");
  }
}

function compareLocalizedNode(base, localized, relativePath, displayPath, allowedMissing) {
  if (localized === undefined) {
    if (allowedMissing.has(relativePath)) return;
    fail(displayPath, "missing localized content.");
  }

  if (Array.isArray(base)) {
    if (!Array.isArray(localized)) fail(displayPath, "expected an array.");
    if (localized.length !== base.length) {
      fail(displayPath, `expected ${base.length} entries, received ${localized.length}.`);
    }
    base.forEach((item, index) =>
      compareLocalizedNode(
        item,
        localized[index],
        `${relativePath}[${index}]`,
        `${displayPath}[${index}]`,
        allowedMissing,
      ),
    );
    return;
  }

  if (isPlainObject(base)) {
    if (!isPlainObject(localized)) fail(displayPath, "expected an object.");
    const baseKeys = Object.keys(base);
    const extraKeys = Object.keys(localized).filter((key) => !baseKeys.includes(key));
    if (extraKeys.length > 0) {
      fail(displayPath, `unexpected localized keys: ${extraKeys.join(", ")}.`);
    }
    for (const key of baseKeys) {
      const childRelativePath = relativePath ? `${relativePath}.${key}` : key;
      compareLocalizedNode(
        base[key],
        localized[key],
        childRelativePath,
        `${displayPath}.${key}`,
        allowedMissing,
      );
    }
    return;
  }

  if (typeof localized !== typeof base) {
    fail(displayPath, `expected ${typeof base}, received ${typeof localized}.`);
  }
  if (typeof localized === "string" && localized.trim().length === 0) {
    fail(displayPath, "localized strings cannot be empty.");
  }
}

export function assertLocalizedCopy(
  base,
  localized,
  { path, allowedMissing = [] } = {},
) {
  if (!isPlainObject(base) || !isPlainObject(localized)) {
    fail(path ?? "localized case", "expected base and localized objects.");
  }
  compareLocalizedNode(
    base,
    localized,
    "",
    path ?? "localized case",
    new Set(allowedMissing),
  );
}

function setPath(target, source, path) {
  const segments = path.split(".");
  let targetNode = target;
  let sourceNode = source;
  for (const segment of segments.slice(0, -1)) {
    targetNode = targetNode[segment];
    sourceNode = sourceNode[segment];
  }
  const leaf = segments.at(-1);
  targetNode[leaf] = structuredClone(sourceNode[leaf]);
}

export function materializeLocalizedCopy(base, localized, allowedMissing = []) {
  const result = structuredClone(localized);
  for (const path of allowedMissing) setPath(result, base, path);
  return result;
}

export function assertProtectedLegacySlugs(definitions, protectedLegacySlugs) {
  const slugs = new Set(definitions.map(({ slug }) => slug));
  const missing = protectedLegacySlugs.filter((slug) => !slugs.has(slug));
  if (missing.length > 0) {
    fail("caseDefinitions", `protected public routes were removed: ${missing.join(", ")}.`);
  }
}

export function assertDefinitionCatalog(
  definitions,
  { localeOrder, protectedLegacySlugs },
) {
  if (!Array.isArray(definitions) || definitions.length === 0) {
    fail("caseDefinitions", "expected at least one definition.");
  }

  const labsOnlyKeys = ["projectUrl", "sourceRef", "sourceUrl", "verifiedAt"];
  const slugs = new Set();
  const numbers = new Set();
  definitions.forEach((definition, index) => {
    const path = `caseDefinitions[${index}]`;
    if (!isPlainObject(definition)) fail(path, "expected an object.");
    const allowedKeys = new Set([
      "slug",
      "number",
      "diagram",
      "kind",
      "categoryKey",
      "availableLocales",
      "published",
      "updated",
      "stack",
      ...(definition.kind === "labs" ? labsOnlyKeys : []),
    ]);
    const unexpectedKeys = Object.keys(definition).filter((key) => !allowedKeys.has(key));
    if (unexpectedKeys.length > 0) {
      fail(path, `unexpected definition keys: ${unexpectedKeys.join(", ")}.`);
    }
    assertNonEmptyString(definition.slug, `${path}.slug`);
    if (!CASE_SLUG_PATTERN.test(definition.slug)) {
      fail(`${path}.slug`, "expected a lowercase kebab-case slug.");
    }
    if (slugs.has(definition.slug)) fail(`${path}.slug`, "duplicate slug.");
    slugs.add(definition.slug);

    assertNonEmptyString(definition.number, `${path}.number`);
    if (!NUMBER_PATTERN.test(definition.number)) {
      fail(`${path}.number`, "expected a two-digit number.");
    }
    if (numbers.has(definition.number)) fail(`${path}.number`, "duplicate number.");
    numbers.add(definition.number);

    if (!CASE_KINDS.has(definition.kind)) {
      fail(`${path}.kind`, "expected professional or labs.");
    }
    assertNonEmptyString(definition.categoryKey, `${path}.categoryKey`);
    assertNonEmptyString(definition.diagram, `${path}.diagram`);
    if (!Array.isArray(definition.availableLocales) || definition.availableLocales.length === 0) {
      fail(`${path}.availableLocales`, "expected at least one locale.");
    }
    const duplicateLocales = definition.availableLocales.filter(
      (locale, localeIndex, values) => values.indexOf(locale) !== localeIndex,
    );
    if (duplicateLocales.length > 0) {
      fail(`${path}.availableLocales`, "contains duplicate locales.");
    }
    const unknownLocales = definition.availableLocales.filter(
      (locale) => !localeOrder.includes(locale),
    );
    if (unknownLocales.length > 0) {
      fail(`${path}.availableLocales`, `unknown locales: ${unknownLocales.join(", ")}.`);
    }
    if (!DATE_PATTERN.test(definition.published)) {
      fail(`${path}.published`, "expected YYYY-MM-DD.");
    }
    if (!DATE_PATTERN.test(definition.updated)) {
      fail(`${path}.updated`, "expected YYYY-MM-DD.");
    }
    if (definition.updated < definition.published) {
      fail(`${path}.updated`, "cannot be earlier than published.");
    }
    assertStringArray(definition.stack, `${path}.stack`);

    if (definition.kind === "labs") {
      assertNonEmptyString(definition.projectUrl, `${path}.projectUrl`);
      assertNonEmptyString(definition.sourceRef, `${path}.sourceRef`);
      assertNonEmptyString(definition.sourceUrl, `${path}.sourceUrl`);
      if (!/^v\d+\.\d+\.\d+$/u.test(definition.sourceRef)) {
        fail(`${path}.sourceRef`, "expected a semantic version reference.");
      }
      if (!DATE_PATTERN.test(definition.verifiedAt)) {
        fail(`${path}.verifiedAt`, "expected YYYY-MM-DD.");
      }
      if (definition.verifiedAt < definition.published) {
        fail(`${path}.verifiedAt`, "cannot be earlier than published.");
      }
      if (definition.verifiedAt > definition.updated) {
        fail(`${path}.verifiedAt`, "cannot be later than updated.");
      }

      let projectUrl;
      try {
        projectUrl = new URL(definition.projectUrl);
      } catch {
        fail(`${path}.projectUrl`, "expected an absolute URL.");
      }
      if (projectUrl.protocol !== "https:") {
        fail(`${path}.projectUrl`, "expected an HTTPS URL.");
      }

      let sourceUrl;
      try {
        sourceUrl = new URL(definition.sourceUrl);
      } catch {
        fail(`${path}.sourceUrl`, "expected an absolute URL.");
      }
      const isGitHubWebCommit =
        sourceUrl.hostname === "github.com" &&
        /^\/[^/]+\/[^/]+\/commit\/[0-9a-f]{40}$/u.test(sourceUrl.pathname);
      const isGitHubApiCommit =
        sourceUrl.hostname === "api.github.com" &&
        /^\/repositories\/\d+\/commits\/[0-9a-f]{40}$/u.test(sourceUrl.pathname);
      if (
        sourceUrl.protocol !== "https:" ||
        sourceUrl.search ||
        sourceUrl.hash ||
        (!isGitHubWebCommit && !isGitHubApiCommit)
      ) {
        fail(`${path}.sourceUrl`, "expected an immutable GitHub commit URL.");
      }
    } else {
      for (const key of labsOnlyKeys) {
        if (definition[key] !== undefined) {
          fail(`${path}.${key}`, "professional cases must not expose Labs source metadata.");
        }
      }
    }
  });

  assertProtectedLegacySlugs(definitions, protectedLegacySlugs);
}

export function assertRawLocaleCatalog({
  definitions,
  localeOrder,
  rawCasesByLocale,
  allowedInheritedPathsByKind = {},
}) {
  const definitionSlugs = new Set(definitions.map(({ slug }) => slug));
  for (const localeKey of localeOrder) {
    const cases = rawCasesByLocale[localeKey];
    if (!isPlainObject(cases)) fail(`rawCasesByLocale.${localeKey}`, "expected an object.");
    const extraSlugs = Object.keys(cases).filter((slug) => !definitionSlugs.has(slug));
    if (extraSlugs.length > 0) {
      fail(`rawCasesByLocale.${localeKey}`, `unknown case slugs: ${extraSlugs.join(", ")}.`);
    }
  }

  const materialized = Object.fromEntries(localeOrder.map((localeKey) => [localeKey, {}]));
  for (const definition of definitions) {
    const base = rawCasesByLocale.en[definition.slug];
    if (!base) fail(`en/${definition.slug}`, "missing authoritative English content.");
    assertCompleteCaseStudy(base, {
      kind: definition.kind,
      path: `en/${definition.slug}`,
    });
    materialized.en[definition.slug] = structuredClone(base);

    for (const localeKey of definition.availableLocales) {
      if (localeKey === "en") continue;
      const localized = rawCasesByLocale[localeKey][definition.slug];
      if (!localized) fail(`${localeKey}/${definition.slug}`, "missing localized case study.");
      const allowedMissing = allowedInheritedPathsByKind[definition.kind] ?? [];
      assertLocalizedCopy(base, localized, {
        path: `${localeKey}/${definition.slug}`,
        allowedMissing,
      });
      const complete = materializeLocalizedCopy(base, localized, allowedMissing);
      assertCompleteCaseStudy(complete, {
        kind: definition.kind,
        path: `${localeKey}/${definition.slug}`,
      });
      materialized[localeKey][definition.slug] = complete;
    }
  }

  return materialized;
}
