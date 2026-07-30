import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  caseDefinitions,
  localeOrder,
  locales,
  relatedCaseDefinitions,
  site,
} from "../src/content.mjs";
import { editorialUi, methodology } from "../src/editorial.mjs";

function socialImageUrl(localeKey) {
  return `${site.url}/assets/social/case-studies-${localeKey}.png`;
}

function assertSocialPreview(html, localeKey) {
  const imageUrl = socialImageUrl(localeKey);
  assert.ok(
    html.includes(`<meta property="og:image" content="${imageUrl}" />`),
  );
  assert.match(html, /<meta property="og:image:type" content="image\/png" \/>/u);
  assert.match(html, /<meta property="og:image:width" content="1200" \/>/u);
  assert.match(html, /<meta property="og:image:height" content="630" \/>/u);
  assert.ok(
    html.includes(
      `<meta property="og:image:alt" content="${locales[localeKey].ui.socialImageAlt}" />`,
    ),
  );
  assert.match(
    html,
    /<meta name="twitter:card" content="summary_large_image" \/>/u,
  );
  assert.ok(
    html.includes(`<meta name="twitter:image" content="${imageUrl}" />`),
  );
  assert.ok(
    html.includes(
      `<meta name="twitter:image:alt" content="${locales[localeKey].ui.socialImageAlt}" />`,
    ),
  );
}

test("English case-study index links to every canonical article", async () => {
  const html = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
  assert.match(html, /href="\/assets\/styles\.[0-9a-f]{12}\.css"/);
  assert.match(html, /src="\/assets\/client\.[0-9a-f]{12}\.js"/);
  assert.doesNotMatch(html, /\/assets\/(?:styles\.css|client\.js)/);
  for (const definition of caseDefinitions) {
    assert.match(html, new RegExp(`href="/case-studies/${definition.slug}/"`));
  }
  assert.match(html, /data-case-search/);
  assert.match(html, /data-search-state/);
  assert.match(html, /data-case-count/);
  assert.match(html, /data-case-clear/);
  assert.equal((html.match(/aria-label="Primary navigation"/gu) ?? []).length, 1);
  assert.equal((html.match(/aria-label="Footer navigation"/gu) ?? []).length, 1);
  assert.match(html, />Show all case studies <span aria-hidden="true">↺<\/span>/u);
  assert.doesNotMatch(html, /data-case-type|data-case-topic/u);
  assert.match(html, /"@type":"Blog"/);
  assert.doesNotMatch(html, /card-schematic|case-card__rail/u);
  assert.doesNotMatch(html, /index-register|intro-section|principle-grid|site-cta/u);
  const heroPosition = html.indexOf('class="index-hero shell"');
  const discoveryPosition = html.indexOf("data-discovery");
  const caseListPosition = html.indexOf("data-case-list");
  assert.ok(heroPosition >= 0);
  assert.ok(discoveryPosition >= 0);
  assert.ok(caseListPosition >= 0);
  assert.ok(heroPosition < discoveryPosition);
  assert.ok(discoveryPosition < caseListPosition);
  const cards = [...html.matchAll(/<article class="case-card"[\s\S]*?<\/article>/gu)];
  assert.equal(cards.length, caseDefinitions.length);
  for (const card of cards) {
    const tags = card[0].match(/<div class="tag-list"[^>]*>(?<tags>[\s\S]*?)<\/div>/u)?.groups?.tags;
    assert.ok(tags);
    assert.ok((tags.match(/<span>/gu) ?? []).length <= 3);
  }
});

test("canonical pages expose locale-matched large social previews", async () => {
  for (const localeKey of localeOrder) {
    const prefix = locales[localeKey].prefix.replace(/^\//u, "");
    const outputDirectory = prefix ? `${prefix}/` : "";
    const definition = caseDefinitions.find(({ availableLocales }) =>
      availableLocales.includes(localeKey),
    );
    assert.ok(definition);
    const pages = [
      `../dist/${outputDirectory}index.html`,
      `../dist/${outputDirectory}methodology/index.html`,
      `../dist/${outputDirectory}case-studies/${definition.slug}/index.html`,
    ];

    for (const page of pages) {
      assertSocialPreview(await readFile(new URL(page, import.meta.url), "utf8"), localeKey);
    }
  }
});

test("localized article keeps its language switch on the equivalent article", async () => {
  const html = await readFile(new URL("../dist/de/case-studies/archival-workflow-management/index.html", import.meta.url), "utf8");
  assert.match(html, /href="\/it\/case-studies\/archival-workflow-management\/"/);
  assert.match(html, /href="\/fr\/case-studies\/archival-workflow-management\/"/);
  assert.match(html, /hreflang="x-default" href="https:\/\/blog\.ejupilabs\.com\/case-studies\/archival-workflow-management\/"/);
});

test("articles identify Djenis as the Person author and Ejupi Labs as publisher", async () => {
  const html = await readFile(new URL("../dist/case-studies/archival-workflow-management/index.html", import.meta.url), "utf8");
  const structuredDataText = html.match(/<script type="application\/ld\+json">(?<json>.*?)<\/script>/su)?.groups?.json;
  assert.ok(structuredDataText);

  const structuredData = JSON.parse(structuredDataText);
  assert.deepEqual(structuredData.author, {
    "@type": "Person",
    "@id": "https://djenis.ejupilabs.com/#person",
    name: "Djenis Ejupi",
    url: "https://djenis.ejupilabs.com/",
  });
  assert.deepEqual(structuredData.publisher, {
    "@type": "Organization",
    name: "Ejupi Labs",
    url: "https://ejupilabs.com/",
  });
  assert.equal(
    structuredData.image,
    "https://blog.ejupilabs.com/assets/social/case-studies-en.png",
  );
  assert.match(html, /<meta name="author" content="Djenis Ejupi" \/>/u);
  assert.match(html, /<link rel="author" href="https:\/\/djenis\.ejupilabs\.com\/" \/>/u);
  assert.match(html, /<meta name="twitter:title" content="[^"]+" \/>/u);
  assert.match(html, /<meta name="twitter:description" content="[^"]+" \/>/u);
  assert.match(html, /class="article-byline shell"/u);
  assert.match(html, /itemprop="author" itemscope itemtype="https:\/\/schema\.org\/Person" itemid="https:\/\/djenis\.ejupilabs\.com\/#person"/u);
  assert.match(html, /rel="author" itemprop="url" href="https:\/\/djenis\.ejupilabs\.com\/"/u);
  assert.match(html, /itemprop="jobTitle">Engineer and case-study author/u);
  assert.match(html, /Updated <time datetime="2026-07-28" itemprop="dateModified">/u);
  assert.match(html, /class="site-cta"/u);
});

test("localized chrome, bylines and cross-site routes stay in the selected language", async () => {
  for (const localeKey of localeOrder) {
    const locale = locales[localeKey];
    const ui = editorialUi[localeKey];
    const outputPrefix = locale.prefix.replace(/^\//u, "");
    const outputDirectory = outputPrefix ? `${outputPrefix}/` : "";
    const externalPrefix = locale.prefix;
    const studioRoute = `${site.portfolioUrl}${externalPrefix}/`;
    const contactRoute = `${site.portfolioUrl}${externalPrefix}/#contact`;
    const authorRoute = `${site.author.url.replace(/\/+$/u, "")}${externalPrefix}/`;
    const uppercase = (value) => value.toLocaleUpperCase(locale.lang);

    const index = await readFile(
      new URL(`../dist/${outputDirectory}index.html`, import.meta.url),
      "utf8",
    );
    assert.ok(index.includes(`href="${studioRoute}"`));
    assert.ok(index.includes(`href="${contactRoute}"`));
    assert.ok(index.includes(`rel="author" href="${authorRoute}"`));
    assert.ok(index.includes(`class="personal-link" href="${authorRoute}"`));
    assert.ok(index.includes(`>${ui.personal}</a>`));
    assert.ok(index.includes(`${uppercase(ui.caseLabel)} / 01`));
    assert.ok(ui.emptyTitle.endsWith("."));
    assert.ok(
      index.includes(
        `<h2>${ui.emptyTitle.slice(0, -1)}<span class="title-stop">.</span></h2>`,
      ),
    );

    const workflow = await readFile(
      new URL(
        `../dist/${outputDirectory}case-studies/archival-workflow-management/index.html`,
        import.meta.url,
      ),
      "utf8",
    );
    assert.ok(workflow.includes(`rel="author" itemprop="url" href="${authorRoute}"`));
    assert.ok(workflow.includes(ui.authorRole));
    assert.ok(workflow.includes(`${ui.updated} <time datetime="2026-07-28"`));
    assert.ok(workflow.includes(uppercase(ui.systemViewLabel)));
    assert.ok(workflow.includes(uppercase(ui.processStateReturnLabel)));

    const delivery = await readFile(
      new URL(
        `../dist/${outputDirectory}case-studies/ai-workflow-cloud-migration/index.html`,
        import.meta.url,
      ),
      "utf8",
    );
    assert.ok(delivery.includes(uppercase(ui.versionedDeliveryPathLabel)));
  }
});

test("every generated HTML page exposes a focusable main landmark", async () => {
  const pages = [
    "../dist/index.html",
    "../dist/404.html",
    "../dist/it/methodology/index.html",
    "../dist/fr/case-studies/retail-erp-evolution/index.html",
  ];

  for (const page of pages) {
    const html = await readFile(new URL(page, import.meta.url), "utf8");
    assert.match(html, /<main\b[^>]*\bid="main"[^>]*\btabindex="-1"|<main\b[^>]*\btabindex="-1"[^>]*\bid="main"/);
  }
});

test("localized 404 pages do not claim a canonical or share URL", async () => {
  for (const localeKey of localeOrder) {
    const prefix = locales[localeKey].prefix.replace(/^\//u, "");
    const html = await readFile(
      new URL(`../dist/${prefix ? `${prefix}/` : ""}404.html`, import.meta.url),
      "utf8",
    );
    assert.match(html, /<meta name="robots" content="noindex,follow" \/>/);
    assert.doesNotMatch(
      html,
      /rel="canonical"|<link rel="alternate" hreflang=|property="og:url"|property="og:image"|name="twitter:image"/,
    );
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

test("Labs evidence ledgers cite immutable source snapshots without replacing product links", async () => {
  for (const localeKey of localeOrder) {
    const prefix = locales[localeKey].prefix.replace(/^\//u, "");
    const outputDirectory = prefix ? `${prefix}/` : "";
    for (const definition of caseDefinitions.filter(({ kind }) => kind === "labs")) {
      const html = await readFile(
        new URL(
          `../dist/${outputDirectory}case-studies/${definition.slug}/index.html`,
          import.meta.url,
        ),
        "utf8",
      );
      assert.match(html, /class="evidence-citation"/u);
      assert.ok(html.includes(`data-source-state="${definition.sourceState}"`));
      const sourceStateLabel =
        definition.sourceState === "release"
          ? editorialUi[localeKey].verifiedRelease
          : editorialUi[localeKey].verifiedCommitSnapshot;
      assert.ok(html.includes(sourceStateLabel));
      assert.ok(html.includes(`href="${definition.sourceUrl}"`));
      assert.ok(html.includes(definition.sourceRef));
      assert.ok(html.includes(`<time datetime="${definition.verifiedAt}">`));
      assert.ok(html.includes(`href="${definition.projectUrl}"`));
    }
  }

  const professional = await readFile(
    new URL(
      "../dist/case-studies/archival-workflow-management/index.html",
      import.meta.url,
    ),
    "utf8",
  );
  assert.doesNotMatch(professional, /evidence-citation|github\.com\/[^\s"]+\/commit\//u);
});

test("every article makes technology rationale and rejected alternatives explicit", async () => {
  for (const localeKey of localeOrder) {
    const prefix = locales[localeKey].prefix.replace(/^\//u, "");
    const outputDirectory = prefix ? `${prefix}/` : "";
    const ui = editorialUi[localeKey];
    for (const definition of caseDefinitions) {
      const html = await readFile(
        new URL(
          `../dist/${outputDirectory}case-studies/${definition.slug}/index.html`,
          import.meta.url,
        ),
        "utf8",
      );
      assert.match(html, /id="technology-rationale"/u);
      assert.equal((html.match(/class="technology-choice"/gu) ?? []).length, 4);
      for (const label of [
        ui.choiceLabel,
        ui.whyLabel,
        ui.alternativeLabel,
        ui.costLabel,
        ui.tradeoffLabel,
      ]) {
        assert.ok(html.includes(label), `${localeKey}/${definition.slug} is missing ${label}`);
      }
    }
  }
});

test("every article renders the two locale-safe related cases in ranked order", async () => {
  for (const localeKey of localeOrder) {
    const prefix = locales[localeKey].prefix.replace(/^\//u, "");
    const outputDirectory = prefix ? `${prefix}/` : "";
    for (const definition of caseDefinitions) {
      const html = await readFile(
        new URL(
          `../dist/${outputDirectory}case-studies/${definition.slug}/index.html`,
          import.meta.url,
        ),
        "utf8",
      );
      const rendered = [...html.matchAll(/data-related-slug="(?<slug>[^"]+)"/gu)].map(
        (match) => match.groups.slug,
      );
      const expected = relatedCaseDefinitions(definition, caseDefinitions, {
        localeKey,
        limit: 2,
      }).map(({ slug }) => slug);
      assert.deepEqual(rendered, expected, `${localeKey}/${definition.slug}`);
      assert.ok(rendered.every((slug) => slug !== definition.slug));
    }
  }
});

test("methodology is a localized canonical page linked from every footer", async () => {
  for (const localeKey of localeOrder) {
    const locale = locales[localeKey];
    const prefix = locale.prefix.replace(/^\//u, "");
    const outputDirectory = prefix ? `${prefix}/` : "";
    const route = `${locale.prefix}/methodology/`;
    const html = await readFile(
      new URL(`../dist/${outputDirectory}methodology/index.html`, import.meta.url),
      "utf8",
    );

    assert.ok(html.includes(`<html class="no-js" lang="${locale.lang}">`));
    assert.ok(html.includes(`<link rel="canonical" href="${site.url}${route}" />`));
    assert.match(
      html,
      new RegExp(
        `<a\\b(?=[^>]*\\bhref="${route}")(?=[^>]*\\baria-current="page")[^>]*>`,
        "u",
      ),
    );
    assert.ok(html.includes(methodology.copy[localeKey].title));
    assert.ok(html.includes("mailto:info@ejupilabs.com"));
    assert.match(
      html,
      /hreflang="x-default" href="https:\/\/blog\.ejupilabs\.com\/methodology\/"/u,
    );

    const index = await readFile(
      new URL(`../dist/${outputDirectory}index.html`, import.meta.url),
      "utf8",
    );
    assert.ok(index.includes(`href="${route}">${editorialUi[localeKey].methodology}</a>`));
  }
});

test("sitemap and feed include the expanded editorial archive", async () => {
  const sitemap = await readFile(
    new URL("../dist/sitemap.xml", import.meta.url),
    "utf8",
  );
  const feed = await readFile(new URL("../dist/feed.xml", import.meta.url), "utf8");
  assert.match(sitemap, /\/fr\/case-studies\/vector-placement-operations\//);
  assert.match(sitemap, /\/de\/methodology\//);
  assert.match(sitemap, /<lastmod>2026-07-28<\/lastmod>/);
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
    if (definition.kind === "labs") {
      assert.equal(entry.projectUrl, definition.projectUrl);
      assert.equal(entry.sourceState, definition.sourceState);
      assert.equal(entry.sourceRef, definition.sourceRef);
      assert.equal(entry.sourceUrl, definition.sourceUrl);
      assert.equal(entry.verifiedAt, definition.verifiedAt);
    } else {
      assert.equal(entry.projectUrl, undefined);
      assert.equal(entry.sourceState, undefined);
      assert.equal(entry.sourceRef, undefined);
      assert.equal(entry.sourceUrl, undefined);
      assert.equal(entry.verifiedAt, undefined);
    }
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
    assert.ok(cloud.text.includes(study.technology.items[0].why));
    assert.ok(cloud.text.includes(study.technology.items[0].alternative));
    assert.ok(cloud.text.includes(study.result.paragraphs.at(-1)));
    assert.ok(cloud.text.includes(study.diagnosis.paragraphs[0]));
  }
});
