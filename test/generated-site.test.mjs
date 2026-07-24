import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { caseDefinitions, localeOrder, locales, site } from "../src/content.mjs";

test("English case-study index links to every canonical article", async () => {
  const html = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
  assert.match(html, /href="\/assets\/styles\.[0-9a-f]{12}\.css"/);
  assert.match(html, /src="\/assets\/client\.[0-9a-f]{12}\.js"/);
  assert.doesNotMatch(html, /\/assets\/(?:styles\.css|client\.js)/);
  for (const definition of caseDefinitions) {
    assert.match(html, new RegExp(`href="/case-studies/${definition.slug}/"`));
  }
  assert.match(html, /data-case-search/);
  assert.match(html, /data-case-type="labs"/);
  assert.match(html, /"@type":"Blog"/);
});

test("localized article keeps its language switch on the equivalent article", async () => {
  const html = await readFile(new URL("../dist/de/case-studies/archival-workflow-management/index.html", import.meta.url), "utf8");
  assert.match(html, /href="\/it\/case-studies\/archival-workflow-management\/"/);
  assert.match(html, /href="\/fr\/case-studies\/archival-workflow-management\/"/);
  assert.match(html, /hreflang="x-default" href="https:\/\/blog\.ejupilabs\.com\/case-studies\/archival-workflow-management\/"/);
});

test("every generated HTML page exposes a focusable main landmark", async () => {
  const pages = [
    "../dist/index.html",
    "../dist/404.html",
    "../dist/fr/case-studies/retail-erp-evolution/index.html",
  ];

  for (const page of pages) {
    const html = await readFile(new URL(page, import.meta.url), "utf8");
    assert.match(html, /<main\b[^>]*\bid="main"[^>]*\btabindex="-1"|<main\b[^>]*\btabindex="-1"[^>]*\bid="main"/);
  }
});

test("localized Labs articles keep canonical and hreflang routes aligned", async () => {
  const html = await readFile(
    new URL("../dist/it/case-studies/careeros-local/index.html", import.meta.url),
    "utf8",
  );
  assert.match(
    html,
    /rel="canonical" href="https:\/\/blog\.ejupilabs\.com\/it\/case-studies\/careeros-local\/"/,
  );
  assert.match(
    html,
    /hreflang="de" href="https:\/\/blog\.ejupilabs\.com\/de\/case-studies\/careeros-local\/"/,
  );
  assert.match(html, /"@type":"BlogPosting"/);
});

test("sitemap and feed include the expanded editorial archive", async () => {
  const sitemap = await readFile(
    new URL("../dist/sitemap.xml", import.meta.url),
    "utf8",
  );
  const feed = await readFile(new URL("../dist/feed.xml", import.meta.url), "utf8");
  assert.match(sitemap, /\/fr\/case-studies\/vector-placement-operations\//);
  assert.match(sitemap, /<lastmod>2026-07-24<\/lastmod>/);
  assert.match(feed, /<category>Machine learning<\/category>/);
  assert.match(feed, /\/case-studies\/careeros-local\//);
});

test("machine-readable catalog derives routes and locales from the authoritative definitions", async () => {
  const catalog = JSON.parse(
    await readFile(new URL("../dist/case-studies.json", import.meta.url), "utf8"),
  );

  assert.equal(catalog.schemaVersion, 1);
  assert.equal(catalog.origin, site.url);
  assert.deepEqual(catalog.locales, localeOrder);
  assert.equal(catalog.cases.length, caseDefinitions.length);

  for (const definition of caseDefinitions) {
    const entry = catalog.cases.find(({ slug }) => slug === definition.slug);
    assert.ok(entry);
    assert.equal(entry.kind, definition.kind);
    assert.deepEqual(entry.availableLocales, definition.availableLocales);
    for (const localeKey of definition.availableLocales) {
      const prefix = locales[localeKey].prefix;
      assert.equal(
        entry.urls[localeKey],
        `${site.url}${prefix}/case-studies/${definition.slug}/`,
      );
      assert.ok(entry.translations[localeKey].title);
      assert.ok(entry.translations[localeKey].summary);
    }
  }
});

test("every lazy locale index contains article decisions, trade-offs and results", async () => {
  for (const localeKey of localeOrder) {
    const prefix = locales[localeKey].prefix.replace(/^\//u, "");
    const indexPage = prefix ? `../dist/${prefix}/index.html` : "../dist/index.html";
    const html = await readFile(new URL(indexPage, import.meta.url), "utf8");
    const assetPath = html.match(
      new RegExp(
        `data-search-index-url="(?<path>/assets/search\\.${localeKey}\\.[0-9a-f]{12}\\.json)"`,
        "u",
      ),
    )?.groups?.path;
    assert.ok(assetPath);

    const index = JSON.parse(
      await readFile(new URL(`../dist${assetPath}`, import.meta.url), "utf8"),
    );
    assert.equal(index.schemaVersion, 1);
    assert.equal(index.locale, localeKey);
    assert.equal(index.cases.length, caseDefinitions.length);

    const slug = "ai-workflow-cloud-migration";
    const cloud = index.cases.find((entry) => entry.slug === slug);
    const study = locales[localeKey].cases[slug];
    assert.ok(cloud);
    assert.ok(cloud.text.includes(study.decisions.items[0].tradeoff));
    assert.ok(cloud.text.includes(study.result.paragraphs.at(-1)));
    assert.ok(cloud.text.includes(study.diagnosis.paragraphs[0]));
  }
});
