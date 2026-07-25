import { createHash } from "node:crypto";
import { access, readFile, readdir } from "node:fs/promises";
import { basename, extname, join, resolve } from "node:path";
import {
  caseDefinitions,
  localeOrder,
  locales,
  protectedLegacySlugs,
  site,
} from "../src/content.mjs";
import { assertProtectedLegacySlugs } from "../src/content-contract.mjs";
import { editorialUi } from "../src/editorial.mjs";

const root = resolve(import.meta.dirname, "..");
const dist = join(root, "dist");
const errors = [];

const expectedSlugs = caseDefinitions.map(({ slug }) => slug);
const articleCount = caseDefinitions.reduce(
  (total, definition) => total + definition.availableLocales.length,
  0,
);

function routeFor(localeKey, slug) {
  const prefix = locales[localeKey].prefix;
  return slug ? `${prefix}/case-studies/${slug}/` : `${prefix}/` || "/";
}

function localizedExternalRoute(origin, localeKey, fragment = "") {
  const normalizedOrigin = origin.replace(/\/+$/u, "");
  return `${normalizedOrigin}${locales[localeKey].prefix}/${fragment}`;
}

function fileForRoute(route) {
  const clean = route.replace(/^\//, "").replace(/\/$/, "");
  return clean ? join(dist, clean, "index.html") : join(dist, "index.html");
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function allFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? allFiles(path) : [path];
  }));
  return nested.flat();
}

function count(source, expression) {
  return [...source.matchAll(expression)].length;
}

assertProtectedLegacySlugs(caseDefinitions, protectedLegacySlugs);

for (const localeKey of localeOrder) {
  const locale = locales[localeKey];
  if (!locale) {
    errors.push(`Missing locale: ${localeKey}`);
    continue;
  }

  const localeDefinitions = caseDefinitions.filter((definition) =>
    definition.availableLocales.includes(localeKey),
  );
  const localeSlugs = localeDefinitions.map(({ slug }) => slug);
  const editorial = editorialUi[localeKey];
  const expectedStudioRoute = localizedExternalRoute(site.portfolioUrl, localeKey);
  const expectedContactRoute = localizedExternalRoute(site.portfolioUrl, localeKey, "#contact");
  const expectedAuthorRoute = localizedExternalRoute(site.author.url, localeKey);
  const uppercase = (value) => String(value).toLocaleUpperCase(locale.lang);

  for (const slug of localeSlugs) {
    if (!locale.cases[slug]) errors.push(`Missing ${localeKey} content for ${slug}.`);
  }

  const pages = [null, ...localeSlugs];
  for (const slug of pages) {
    const route = routeFor(localeKey, slug);
    const file = fileForRoute(route);
    if (!(await exists(file))) {
      errors.push(`Missing generated page: ${route}`);
      continue;
    }

    const html = await readFile(file, "utf8");
    const label = `${localeKey}:${slug ?? "index"}`;
    if (!html.startsWith("<!doctype html>")) errors.push(`${label} has no HTML doctype.`);
    if (!html.includes(`<html class="no-js" lang="${locale.lang}">`)) errors.push(`${label} has the wrong lang attribute.`);
    if (count(html, /<h1\b/g) !== 1) errors.push(`${label} must contain exactly one h1.`);
    if (!html.includes(`<link rel="canonical" href="${new URL(route, site.url).href}" />`)) errors.push(`${label} has the wrong canonical URL.`);
    if (!html.includes(`<link rel="author" href="${expectedAuthorRoute}" />`)) errors.push(`${label} has the wrong localized author URL.`);
    if (!html.includes('<link rel="manifest" href="/site.webmanifest" />')) errors.push(`${label} is missing the web manifest link.`);
    if (!html.includes(`href="${expectedStudioRoute}"`)) errors.push(`${label} has the wrong localized studio URL.`);
    if (!html.includes(`href="${expectedContactRoute}"`)) errors.push(`${label} has the wrong localized contact URL.`);
    if (count(html, /<meta name="twitter:title" content="[^"]+" \/>/g) !== 1) errors.push(`${label} must contain one Twitter title.`);
    if (count(html, /<meta name="twitter:description" content="[^"]+" \/>/g) !== 1) errors.push(`${label} must contain one Twitter description.`);
    const definition = slug
      ? caseDefinitions.find((item) => item.slug === slug)
      : null;
    const alternateCount = (definition?.availableLocales.length ?? localeOrder.length) + 1;
    if (count(html, /rel="alternate" hreflang=/g) !== alternateCount) {
      errors.push(`${label} must expose ${alternateCount - 1} languages and x-default.`);
    }
    for (const availableLocaleKey of definition?.availableLocales ?? localeOrder) {
      const languageName = locales[availableLocaleKey].languageName;
      if (!html.includes(`aria-label="${languageName}"`)) {
        errors.push(`${label} lacks the accessible ${languageName} language label.`);
      }
    }
    if (!html.includes('href="#main"')) errors.push(`${label} has no skip link.`);
    if (!html.includes('id="site-navigation"')) errors.push(`${label} menu is not associated with its toggle.`);
    if (!/href="\/assets\/styles\.[0-9a-f]{12}\.css"/u.test(html)) errors.push(`${label} has no fingerprinted stylesheet.`);
    if (!/src="\/assets\/client\.[0-9a-f]{12}\.js"/u.test(html)) errors.push(`${label} has no fingerprinted client script.`);
    if (/\/assets\/(?:styles\.css|client\.js)/u.test(html)) errors.push(`${label} references an unversioned mutable asset.`);
    if (/href=""|src=""/.test(html)) errors.push(`${label} contains an empty link or source.`);
    if (/\.\.|\?\.|!\./.test(html.replaceAll("https://", ""))) errors.push(`${label} contains duplicated terminal punctuation.`);
    if (/<img(?![^>]*\balt=)[^>]*>/i.test(html)) errors.push(`${label} contains an image without alt text.`);

    if (slug) {
      const expectedSections = definition?.kind === "labs" ? 8 : 7;
      if (count(html, /data-story-section/g) !== expectedSections) errors.push(`${label} must contain ${expectedSections} complete story sections.`);
      if (!html.includes("architecture-frame")) errors.push(`${label} is missing its architecture figure.`);
      if (!html.includes(locales[localeKey].ui.sourceNote)) errors.push(`${label} is missing its evidence boundary.`);
      if (definition?.kind === "labs" && !html.includes("evidence-ledger")) errors.push(`${label} is missing its evidence ledger.`);
      if (definition?.kind === "labs" && !html.includes(definition.projectUrl)) errors.push(`${label} is missing its working product link.`);
      if (!html.includes('class="article-byline shell"')) errors.push(`${label} is missing its visible author byline.`);
      if (!html.includes(`rel="author" itemprop="url" href="${expectedAuthorRoute}"`)) errors.push(`${label} has the wrong byline author URL.`);
      if (!html.includes(editorial.authorRole)) errors.push(`${label} is missing its localized author role.`);
      if (!html.includes(`${editorial.lastVerified} <time datetime="${definition?.updated}"`)) errors.push(`${label} is missing its localized verification date.`);
      if (!html.includes(uppercase(editorial.systemViewLabel))) errors.push(`${label} has an untranslated system-view label.`);
      if (definition?.diagram === "workflow" && !html.includes(uppercase(editorial.processStateReturnLabel))) {
        errors.push(`${label} has an untranslated workflow-return label.`);
      }
      if (definition?.diagram !== "workflow" && definition?.diagram !== "erp" && !html.includes(uppercase(editorial.versionedDeliveryPathLabel))) {
        errors.push(`${label} has an untranslated delivery-path label.`);
      }
    } else {
      if (!html.includes(uppercase(editorial.indexLabel))) errors.push(`${label} has an untranslated index label.`);
      if (!html.includes(uppercase(editorial.noteLabel))) errors.push(`${label} has an untranslated note label.`);
      if (!html.includes(uppercase(editorial.casesLabel))) errors.push(`${label} has an untranslated case-count label.`);
      if (!html.includes(uppercase(editorial.caseLabel))) errors.push(`${label} has an untranslated case-card label.`);
      if (!/data-search-index-url="\/assets\/search\.[a-z]{2}\.[0-9a-f]{12}\.json"/u.test(html)) {
        errors.push(`${label} has no fingerprinted full-text search index.`);
      }
    }
  }

  const feedPath = join(dist, locale.prefix.replace(/^\//, ""), "feed.xml");
  if (!(await exists(feedPath))) errors.push(`Missing RSS feed for ${localeKey}.`);
  else if (count(await readFile(feedPath, "utf8"), /<item>/g) !== localeDefinitions.length) {
    errors.push(`RSS feed ${localeKey} must contain ${localeDefinitions.length} items.`);
  }

  const openSearchPath = join(
    dist,
    locale.prefix.replace(/^\//, ""),
    "opensearch.xml",
  );
  if (!(await exists(openSearchPath))) {
    errors.push(`Missing OpenSearch description for ${localeKey}.`);
  } else {
    const openSearch = await readFile(openSearchPath, "utf8");
    const expectedTemplate = `${new URL(routeFor(localeKey, null), site.url).href}?q={searchTerms}`;
    if (!openSearch.includes(`template="${expectedTemplate}"`)) {
      errors.push(`OpenSearch ${localeKey} must target its localized archive.`);
    }
    if (!openSearch.includes(`<Language>${locale.lang}</Language>`)) {
      errors.push(`OpenSearch ${localeKey} has the wrong language.`);
    }
  }
}

const files = await allFiles(dist);
const rasterFiles = files.filter((file) => [".png", ".jpg", ".jpeg", ".gif", ".webp", ".avif"].includes(extname(file).toLowerCase()));
if (rasterFiles.length > 0) errors.push(`Raster assets are not allowed: ${rasterFiles.join(", ")}`);

const fingerprintedAssets = files.filter((file) =>
  /^(?:styles\.[0-9a-f]{12}\.css|client\.[0-9a-f]{12}\.js|search\.[a-z]{2}\.[0-9a-f]{12}\.json)$/u.test(
    basename(file),
  ),
);
const expectedFingerprintedAssets = 2 + localeOrder.length;
if (fingerprintedAssets.length !== expectedFingerprintedAssets) {
  errors.push(
    `Expected ${expectedFingerprintedAssets} fingerprinted CSS, JavaScript and search assets, found ${fingerprintedAssets.length}.`,
  );
}
for (const file of fingerprintedAssets) {
  const match = basename(file).match(
    /\.(?<fingerprint>[0-9a-f]{12})\.(?:css|js|json)$/u,
  );
  const contents = await readFile(file);
  const actual = createHash("sha256").update(contents).digest("hex").slice(0, 12);
  if (match?.groups?.fingerprint !== actual) {
    errors.push(`${basename(file)} is not named after its content digest.`);
  }
}

const sitemap = await readFile(join(dist, "sitemap.xml"), "utf8");
const canonicalPageCount = localeOrder.length + articleCount;
if (count(sitemap, /<url>/g) !== canonicalPageCount) {
  errors.push(`Sitemap must contain ${canonicalPageCount} canonical URLs.`);
}
if (count(sitemap, /hreflang="x-default"/g) !== canonicalPageCount) {
  errors.push("Every sitemap URL needs an x-default alternate.");
}

const headers = (await readFile(join(dist, "_headers"), "utf8")).replace(/\r\n?/gu, "\n");
for (const header of [
  "Content-Security-Policy",
  "Cross-Origin-Resource-Policy",
  "Permissions-Policy",
  "Referrer-Policy",
  "X-Content-Type-Options",
]) {
  if (!headers.includes(header)) errors.push(`Missing security header: ${header}.`);
}
if (!headers.includes("connect-src 'self'")) {
  errors.push("Content Security Policy must permit the same-origin lazy search index.");
}
if (!headers.includes("manifest-src 'self'")) {
  errors.push("Content Security Policy must permit the same-origin web manifest.");
}
if (!headers.includes("Cross-Origin-Resource-Policy: same-origin")) {
  errors.push("Cross-Origin Resource Policy must remain same-origin.");
}
const immutablePolicy = "Cache-Control: public, max-age=31536000, immutable";
for (const assetPattern of [
  "/assets/styles.*.css",
  "/assets/client.*.js",
  "/assets/search.*.json",
]) {
  if (!headers.includes(`${assetPattern}\n  ${immutablePolicy}`)) {
    errors.push(`Fingerprint pattern ${assetPattern} must use a one-year immutable cache policy.`);
  }
}
if (headers.includes(`/assets/*\n  ${immutablePolicy}`)) {
  errors.push("Non-fingerprinted brand and font assets must remain revalidatable.");
}
for (const [route, policy] of [
  ["/site.webmanifest", "Cache-Control: public, max-age=3600, must-revalidate"],
  ["/.well-known/security.txt", "Cache-Control: public, max-age=300, must-revalidate"],
]) {
  if (!headers.includes(`${route}\n  ${policy}`)) {
    errors.push(`${route} must use its revalidation cache policy.`);
  }
}

const catalog = JSON.parse(await readFile(join(dist, "case-studies.json"), "utf8"));
if (catalog.schemaVersion !== 1 || catalog.origin !== site.url) {
  errors.push("Machine-readable case-study catalog has the wrong contract metadata.");
}
if (JSON.stringify(catalog.locales) !== JSON.stringify(localeOrder)) {
  errors.push("Machine-readable case-study catalog has the wrong locale list.");
}
if (!Array.isArray(catalog.cases) || catalog.cases.length !== caseDefinitions.length) {
  errors.push(`Machine-readable catalog must contain ${caseDefinitions.length} cases.`);
} else {
  for (const definition of caseDefinitions) {
    const entry = catalog.cases.find(({ slug }) => slug === definition.slug);
    if (!entry) {
      errors.push(`Machine-readable catalog is missing ${definition.slug}.`);
      continue;
    }
    if (
      entry.kind !== definition.kind ||
      JSON.stringify(entry.availableLocales) !== JSON.stringify(definition.availableLocales)
    ) {
      errors.push(`Machine-readable catalog metadata differs for ${definition.slug}.`);
    }
    for (const localeKey of definition.availableLocales) {
      const expectedUrl = new URL(routeFor(localeKey, definition.slug), site.url).href;
      if (entry.urls?.[localeKey] !== expectedUrl) {
        errors.push(`Machine-readable catalog has the wrong ${localeKey} URL for ${definition.slug}.`);
      }
      if (
        !entry.translations?.[localeKey]?.title ||
        !entry.translations?.[localeKey]?.summary ||
        !entry.translations?.[localeKey]?.category
      ) {
        errors.push(`Machine-readable catalog lacks ${localeKey} preview copy for ${definition.slug}.`);
      }
    }
  }
}

const llms = await readFile(join(dist, "llms.txt"), "utf8");
if (!llms.includes(`> ${caseDefinitions.length} documented engineering case studies.`)) {
  errors.push("llms.txt case-study count is not derived from the catalog.");
}
for (const definition of caseDefinitions) {
  if (!llms.includes(new URL(routeFor("en", definition.slug), site.url).href)) {
    errors.push(`llms.txt is missing ${definition.slug}.`);
  }
}

const manifest = JSON.parse(await readFile(join(dist, "site.webmanifest"), "utf8"));
if (
  manifest.id !== "/" ||
  manifest.start_url !== "/" ||
  manifest.scope !== "/" ||
  manifest.lang !== "en" ||
  manifest.display !== "standalone"
) {
  errors.push("The web manifest must remain scoped to the canonical English root.");
}
if (!manifest.icons?.some((icon) => icon.src === "/assets/brand/favicon.svg" && icon.sizes === "any")) {
  errors.push("The web manifest must retain the scalable Ejupi Labs icon.");
}

const securityContact = (await readFile(join(dist, ".well-known", "security.txt"), "utf8"))
  .replace(/\r\n?/gu, "\n");
for (const requiredLine of [
  "Contact: mailto:info@ejupilabs.com",
  "Preferred-Languages: en, it, de, fr",
  "Canonical: https://blog.ejupilabs.com/.well-known/security.txt",
]) {
  if (!securityContact.split("\n").includes(requiredLine)) {
    errors.push(`security.txt is missing: ${requiredLine}`);
  }
}
const expiresLine = securityContact.split("\n").find((line) => line.startsWith("Expires: "));
const securityExpiry = Date.parse(expiresLine?.slice("Expires: ".length) ?? "");
if (!Number.isFinite(securityExpiry) || securityExpiry <= Date.now()) {
  errors.push("security.txt must contain a future RFC 3339 expiration date.");
}

const wranglerConfig = await readFile(join(root, "wrangler.jsonc"), "utf8");
if (!/"compatibility_date"\s*:\s*"2026-07-21"/u.test(wranglerConfig)) {
  errors.push("Wrangler compatibility_date must remain 2026-07-21.");
}

if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `Validated ${files.length} files, ${canonicalPageCount} canonical pages, ${localeOrder.length} locales and ${caseDefinitions.length} case-study routes.`,
  );
}
