import { access, readFile, readdir } from "node:fs/promises";
import { extname, join, resolve } from "node:path";
import { caseDefinitions, localeOrder, locales, site } from "../src/content.mjs";

const root = resolve(import.meta.dirname, "..");
const dist = join(root, "dist");
const errors = [];

const expectedSlugs = [
  "ai-workflow-cloud-migration",
  "archival-workflow-management",
  "retail-erp-evolution",
];

function routeFor(localeKey, slug) {
  const prefix = locales[localeKey].prefix;
  return slug ? `${prefix}/case-studies/${slug}/` : `${prefix}/` || "/";
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

if (caseDefinitions.map(({ slug }) => slug).join("|") !== expectedSlugs.join("|")) {
  errors.push("Case-study slugs changed from the approved stable routes.");
}

for (const localeKey of localeOrder) {
  const locale = locales[localeKey];
  if (!locale) {
    errors.push(`Missing locale: ${localeKey}`);
    continue;
  }

  for (const slug of expectedSlugs) {
    if (!locale.cases[slug]) errors.push(`Missing ${localeKey} content for ${slug}.`);
  }

  const pages = [null, ...expectedSlugs];
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
    if (count(html, /rel="alternate" hreflang=/g) !== 5) errors.push(`${label} must expose four languages and x-default.`);
    if (!html.includes('href="#main"')) errors.push(`${label} has no skip link.`);
    if (!html.includes('id="site-navigation"')) errors.push(`${label} menu is not associated with its toggle.`);
    if (/href=""|src=""/.test(html)) errors.push(`${label} contains an empty link or source.`);
    if (/\.\.|\?\.|!\./.test(html.replaceAll("https://", ""))) errors.push(`${label} contains duplicated terminal punctuation.`);
    if (/<img(?![^>]*\balt=)[^>]*>/i.test(html)) errors.push(`${label} contains an image without alt text.`);

    if (slug) {
      if (count(html, /data-story-section/g) !== 7) errors.push(`${label} must contain seven complete story sections.`);
      if (!html.includes("architecture-frame")) errors.push(`${label} is missing its architecture figure.`);
      if (!html.includes(locales[localeKey].ui.sourceNote)) errors.push(`${label} is missing its evidence boundary.`);
    }
  }

  const feedPath = join(dist, locale.prefix.replace(/^\//, ""), "feed.xml");
  if (!(await exists(feedPath))) errors.push(`Missing RSS feed for ${localeKey}.`);
  else if (count(await readFile(feedPath, "utf8"), /<item>/g) !== 3) errors.push(`RSS feed ${localeKey} must contain three items.`);
}

const files = await allFiles(dist);
const rasterFiles = files.filter((file) => [".png", ".jpg", ".jpeg", ".gif", ".webp", ".avif"].includes(extname(file).toLowerCase()));
if (rasterFiles.length > 0) errors.push(`Raster assets are not allowed: ${rasterFiles.join(", ")}`);

const sitemap = await readFile(join(dist, "sitemap.xml"), "utf8");
if (count(sitemap, /<url>/g) !== 16) errors.push("Sitemap must contain four indexes and twelve case-study URLs.");
if (count(sitemap, /hreflang="x-default"/g) !== 16) errors.push("Every sitemap URL needs an x-default alternate.");

const headers = await readFile(join(dist, "_headers"), "utf8");
for (const header of ["Content-Security-Policy", "Permissions-Policy", "Referrer-Policy", "X-Content-Type-Options"]) {
  if (!headers.includes(header)) errors.push(`Missing security header: ${header}.`);
}

const manifest = JSON.parse(await readFile(join(dist, "site.webmanifest"), "utf8"));
if (manifest.start_url !== "/") errors.push("Manifest start_url must be the canonical English root.");

if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Validated ${files.length} files, 16 canonical pages, 4 locales and 3 stable case-study routes.`);
}
