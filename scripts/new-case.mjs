import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const LOCALES = Object.freeze(["en", "it", "de", "fr"]);
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;
const KINDS = new Set(["professional", "labs"]);
const SCRIPT_DIRECTORY = dirname(fileURLToPath(import.meta.url));
const PROJECT_DIRECTORY = resolve(SCRIPT_DIRECTORY, "..");
const DRAFT_DIRECTORY = join(PROJECT_DIRECTORY, "drafts");

function todo(locale, field) {
  return `[TODO ${locale}] ${field}`;
}

function paragraphSection(locale, title) {
  return {
    title: todo(locale, `${title} title`),
    paragraphs: [todo(locale, `${title} paragraph`)],
  };
}

function localizedDraft(locale, slug, kind) {
  const draft = {
    category: todo(locale, "category"),
    cardTitle: todo(locale, `${slug} card title`),
    title: todo(locale, "article title"),
    summary: todo(locale, "summary"),
    readMinutes: "0",
    facts: [
      [todo(locale, "fact label 1"), todo(locale, "fact detail 1")],
      [todo(locale, "fact label 2"), todo(locale, "fact detail 2")],
      [todo(locale, "fact label 3"), todo(locale, "fact detail 3")],
      [todo(locale, "fact label 4"), todo(locale, "fact detail 4")],
    ],
    starting: paragraphSection(locale, "starting point"),
    constraints: {
      title: todo(locale, "constraints title"),
      intro: todo(locale, "constraints introduction"),
      items: Array.from({ length: 4 }, (_item, index) =>
        todo(locale, `constraint ${index + 1}`),
      ),
    },
    diagnosis: paragraphSection(locale, "diagnosis"),
    architecture: {
      title: todo(locale, "architecture title"),
      intro: todo(locale, "architecture introduction"),
      labels: Array.from({ length: 5 }, (_item, index) =>
        todo(locale, `architecture label ${index + 1}`),
      ),
      caption: todo(locale, "architecture caption"),
    },
    technology: {
      title: todo(locale, "technology rationale title"),
      intro: todo(locale, "technology rationale introduction"),
      items: Array.from({ length: 4 }, (_item, index) => ({
        choice: todo(locale, `technology choice ${index + 1}`),
        why: todo(locale, `technology choice ${index + 1} contextual fit`),
        alternative: todo(locale, `technology choice ${index + 1} rejected alternative`),
        cost: todo(locale, `technology choice ${index + 1} accepted cost`),
      })),
    },
    decisions: {
      title: todo(locale, "decisions title"),
      intro: todo(locale, "decisions introduction"),
      items: Array.from({ length: 3 }, (_item, index) => ({
        title: todo(locale, `decision ${index + 1} title`),
        body: todo(locale, `decision ${index + 1} body`),
        tradeoff: todo(locale, `decision ${index + 1} trade-off`),
      })),
    },
    delivery: paragraphSection(locale, "delivery"),
    result: paragraphSection(locale, "result"),
    scope: todo(locale, "evidence boundary"),
  };

  if (kind === "labs") {
    draft.evidence = {
      title: todo(locale, "evidence title"),
      intro: todo(locale, "evidence introduction"),
      items: Array.from({ length: 4 }, (_item, index) => [
        todo(locale, `evidence label ${index + 1}`),
        todo(locale, `evidence detail ${index + 1}`),
      ]),
    };
  }
  return draft;
}

export function createCaseDraft(slug, { kind = "labs" } = {}) {
  if (!SLUG_PATTERN.test(slug)) {
    throw new Error("The slug must use lowercase kebab-case.");
  }
  if (!KINDS.has(kind)) {
    throw new Error("The case kind must be professional or labs.");
  }

  return {
    status: "draft",
    publicationGuard:
      "Files in drafts/ are never read by the production build. Move reviewed copy into src/ explicitly.",
    definition: {
      slug,
      number: "00",
      diagram: "todo",
      kind,
      categoryKey: "todo",
      availableLocales: LOCALES,
      published: null,
      updated: null,
      stack: [],
      ...(kind === "labs" ? { projectUrl: "" } : {}),
    },
    locales: Object.fromEntries(
      LOCALES.map((locale) => [locale, localizedDraft(locale, slug, kind)]),
    ),
  };
}

function optionValue(argumentsList, option, fallback = null) {
  const index = argumentsList.indexOf(option);
  if (index === -1) return fallback;
  const value = argumentsList[index + 1];
  if (!value || value.startsWith("--")) {
    throw new Error(`${option} requires a value.`);
  }
  return value;
}

export async function writeCaseDraft({
  slug,
  kind = "labs",
  outputDirectory = DRAFT_DIRECTORY,
}) {
  const draft = createCaseDraft(slug, { kind });
  const target = join(resolve(outputDirectory), slug, "case-study.draft.json");
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, `${JSON.stringify(draft, null, 2)}\n`, {
    encoding: "utf8",
    flag: "wx",
  });
  return target;
}

async function main() {
  const argumentsList = process.argv.slice(2);
  const slug = optionValue(argumentsList, "--slug");
  if (!slug) {
    throw new Error("Usage: npm run new:case -- --slug example-case [--kind labs]");
  }
  const kind = optionValue(argumentsList, "--kind", "labs");
  const target = await writeCaseDraft({ slug, kind });
  process.stdout.write(
    `Created an unpublished four-language draft at ${target}\n`,
  );
}

const invokedPath = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : "";
if (import.meta.url === invokedPath) {
  main().catch((error) => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  });
}
