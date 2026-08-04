import { createHash } from "node:crypto";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { transform } from "esbuild";
import {
  caseDefinitions,
  currentCaseDefinitions,
  localeOrder,
  locales,
  relatedCaseDefinitions,
  site,
} from "../src/content.mjs";
import { editorialUi, methodology } from "../src/editorial.mjs";
import {
  escapeHtml,
  escapeHtmlAttribute,
  escapeXml,
  renderDecisionCard,
} from "../src/html-safety.mjs";
import { assertPublicDomainTopology } from "../src/public-url-policy.mjs";

assertPublicDomainTopology({
  caseDefinitions,
  publicContent: {
    caseDefinitions,
    editorialUi,
    locales,
    methodology,
    site,
  },
});

const root = resolve(import.meta.dirname, "..");
const outputRoot = join(root, "dist");
const sourceRoot = join(root, "site");
const [stylesInput, clientInput] = await Promise.all([
  readFile(join(root, "src", "styles.css"), "utf8"),
  readFile(join(root, "src", "client.js"), "utf8"),
]);
const [{ code: stylesSource }, { code: clientSource }] = await Promise.all([
  transform(stylesInput, {
    legalComments: "none",
    loader: "css",
    minify: true,
  }),
  transform(clientInput, {
    format: "esm",
    legalComments: "none",
    loader: "js",
    minify: true,
    target: "es2024",
  }),
]);
const fingerprint = (source) => createHash("sha256").update(source).digest("hex").slice(0, 12);
const assetFiles = Object.freeze({
  styles: `assets/styles.${fingerprint(stylesSource)}.css`,
  client: `assets/client.${fingerprint(clientSource)}.js`,
});
const assetUrls = Object.freeze({
  styles: `/${assetFiles.styles}`,
  client: `/${assetFiles.client}`,
});

const absolute = (pathname) => new URL(pathname, site.url).href;
const safeJson = (value) => JSON.stringify(value).replaceAll("<", "\\u003c");
const definitionForSlug = (slug) =>
  caseDefinitions.find((definition) => definition.slug === slug);
const definitionsForLocale = (localeKey) =>
  currentCaseDefinitions.filter((definition) =>
    definition.availableLocales.includes(localeKey),
  );
const localeKeysForSlug = (slug) =>
  slug ? definitionForSlug(slug)?.availableLocales ?? [] : localeOrder;

function collectSearchText(value, output = [], seen = new Set()) {
  if (typeof value === "string") {
    const normalized = value.replace(/\s+/gu, " ").trim();
    if (normalized && !seen.has(normalized)) {
      seen.add(normalized);
      output.push(normalized);
    }
  } else if (Array.isArray(value)) {
    for (const item of value) collectSearchText(item, output, seen);
  } else if (value && typeof value === "object") {
    for (const item of Object.values(value)) collectSearchText(item, output, seen);
  }
  return output;
}

function searchIndexSource(localeKey) {
  const locale = locales[localeKey];
  const entries = definitionsForLocale(localeKey).map((definition) => {
    const studyText = collectSearchText(locale.cases[definition.slug]).join(" ");
    const foldedStudyText = studyText.toLocaleLowerCase(localeKey);
    const missingStackTerms = definition.stack.filter(
      (term) => !foldedStudyText.includes(term.toLocaleLowerCase(localeKey)),
    );
    return {
      slug: definition.slug,
      kind: definition.kind,
      topic: definition.categoryKey,
      text: [studyText, ...missingStackTerms].join(" "),
    };
  });
  return `${JSON.stringify({ schemaVersion: 1, locale: localeKey, cases: entries })}\n`;
}

const searchIndexSources = Object.freeze(
  Object.fromEntries(localeOrder.map((localeKey) => [localeKey, searchIndexSource(localeKey)])),
);
const searchAssetFiles = Object.freeze(
  Object.fromEntries(
    localeOrder.map((localeKey) => [
      localeKey,
      `assets/search.${localeKey}.${fingerprint(searchIndexSources[localeKey])}.json`,
    ]),
  ),
);
const searchAssetUrls = Object.freeze(
  Object.fromEntries(
    localeOrder.map((localeKey) => [localeKey, `/${searchAssetFiles[localeKey]}`]),
  ),
);

function heading(text) {
  const value = String(text).trim();
  const punctuation = /[.!?]$/.test(value) ? value.at(-1) : ".";
  const words = /[.!?]$/.test(value) ? value.slice(0, -1) : value;
  return `${escapeHtml(words)}<span class="title-stop">${punctuation}</span>`;
}

function routeFor(localeKey, slug) {
  const prefix = locales[localeKey].prefix;
  return slug ? `${prefix}/case-studies/${slug}/` : `${prefix}/` || "/";
}

function methodologyRoute(localeKey) {
  return `${locales[localeKey].prefix}/methodology/`;
}

function pageRoute(localeKey, slug, pageKind = "case") {
  return pageKind === "methodology"
    ? methodologyRoute(localeKey)
    : routeFor(localeKey, slug);
}

function localeKeysForPage(slug, pageKind = "case") {
  return pageKind === "methodology" ? localeOrder : localeKeysForSlug(slug);
}

function localizedExternalRoute(origin, localeKey, fragment = "") {
  const normalizedOrigin = origin.replace(/\/+$/u, "");
  return `${normalizedOrigin}${locales[localeKey].prefix}/${fragment}`;
}

function studioRouteFor(localeKey, fragment = "") {
  return localizedExternalRoute(site.portfolioUrl, localeKey, fragment);
}

function authorRouteFor(localeKey) {
  return localizedExternalRoute(site.author.url, localeKey);
}

function feedRoute(localeKey) {
  return `${locales[localeKey].prefix}/feed.xml` || "/feed.xml";
}

function searchDescriptionRoute(localeKey) {
  return `${locales[localeKey].prefix}/opensearch.xml` || "/opensearch.xml";
}

function socialImagePath(localeKey) {
  return `/assets/social/case-studies-${localeKey}.png`;
}

function socialImageUrl(localeKey) {
  return absolute(socialImagePath(localeKey));
}

function publisherSchema() {
  return {
    "@type": "Organization",
    "@id": `${site.portfolioUrl}/#organization`,
    name: site.name,
    url: `${site.portfolioUrl}/`,
    logo: `${site.portfolioUrl}/icons/apple-touch-icon.png`,
  };
}

function latestCatalogUpdate() {
  return currentCaseDefinitions.reduce(
    (latest, definition) => definition.updated > latest ? definition.updated : latest,
    site.published,
  );
}

function professionalRoleContribution(study) {
  return [study.facts[0]?.[1], study.facts[2]?.[1]].filter(Boolean).join(" · ");
}

function caseCatalog() {
  return {
    schemaVersion: 1,
    origin: site.url,
    updated: latestCatalogUpdate(),
    locales: localeOrder,
    cases: currentCaseDefinitions.map((definition) => ({
      slug: definition.slug,
      number: definition.number,
      kind: definition.kind,
      categoryKey: definition.categoryKey,
      availableLocales: definition.availableLocales,
      published: definition.published,
      updated: definition.updated,
      stack: definition.stack,
      ...(definition.projectUrl
        ? {
            projectUrl: definition.projectUrl,
            sourceState: definition.sourceState,
            sourceRef: definition.sourceRef,
            sourceUrl: definition.sourceUrl,
            verifiedAt: definition.verifiedAt,
          }
        : {}),
      urls: Object.fromEntries(
        definition.availableLocales.map((localeKey) => [
          localeKey,
          absolute(routeFor(localeKey, definition.slug)),
        ]),
      ),
      translations: Object.fromEntries(
        definition.availableLocales.map((localeKey) => {
          const study = locales[localeKey].cases[definition.slug];
          return [
            localeKey,
            {
              title: study.title,
              summary: study.summary,
              category: study.category,
              ...(definition.kind === "professional"
                ? {
                    provenance: editorialUi[localeKey].professionalCase,
                    roleContribution: professionalRoleContribution(study),
                  }
                : {}),
            },
          ];
        }),
      ),
    })),
  };
}

function outputPath(route) {
  const clean = route.replace(/^\//, "").replace(/\/$/, "");
  return clean ? join(outputRoot, clean, "index.html") : join(outputRoot, "index.html");
}

async function write(relativePath, contents) {
  const target = join(outputRoot, relativePath);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, contents, "utf8");
}

function alternates(slug, pageKind = "case") {
  return localeKeysForPage(slug, pageKind)
    .map((localeKey) => {
      const href = absolute(pageRoute(localeKey, slug, pageKind));
      return `<link rel="alternate" hreflang="${escapeHtmlAttribute(localeKey)}" href="${escapeHtmlAttribute(href)}" />`;
    })
    .concat(
      `<link rel="alternate" hreflang="x-default" href="${escapeHtmlAttribute(absolute(pageRoute("en", slug, pageKind)))}" />`,
    )
    .join("\n    ");
}

function pageHead({
  localeKey,
  title,
  description,
  slug = null,
  pageKind = "case",
  type = "website",
  noIndex = false,
  published = site.published,
  updated = published,
}) {
  const locale = locales[localeKey];
  const canonical = absolute(pageRoute(localeKey, slug, pageKind));
  const pageTitle = title === site.name ? title : `${title} | ${site.name}`;
  const previewUrl = socialImageUrl(localeKey);
  const alternateSocialLocales = noIndex
    ? []
    : localeKeysForPage(slug, pageKind).filter((key) => key !== localeKey);

  return `<!doctype html>
<html class="no-js" lang="${escapeHtmlAttribute(locale.lang)}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(pageTitle)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="author" content="${escapeHtml(site.author.name)}" />
  <meta name="theme-color" content="#f4f1ea" />
  ${noIndex ? '<meta name="robots" content="noindex,follow" />' : ""}
  ${noIndex ? "" : `<link rel="canonical" href="${escapeHtmlAttribute(canonical)}" />`}
  <link rel="author" href="${escapeHtmlAttribute(authorRouteFor(localeKey))}" />
  ${noIndex ? "" : alternates(slug, pageKind)}
  <link rel="alternate" type="application/rss+xml" title="${escapeHtml(site.name)} | ${escapeHtml(locale.ui.home)}" href="${escapeHtmlAttribute(absolute(feedRoute(localeKey)))}" />
  <link rel="search" type="application/opensearchdescription+xml" title="${escapeHtml(site.name)}" href="${escapeHtmlAttribute(searchDescriptionRoute(localeKey))}" />
  <link rel="icon" href="/assets/brand/favicon.svg?v=4" type="image/svg+xml" />
  <link rel="manifest" href="/site.webmanifest" />
  <link rel="preload" href="/assets/fonts/instrument-sans-regular.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/assets/fonts/instrument-sans-semibold.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="stylesheet" href="${escapeHtmlAttribute(assetUrls.styles)}" />
  <script src="${escapeHtmlAttribute(assetUrls.client)}" type="module"></script>
  <meta property="og:site_name" content="${escapeHtml(site.name)}" />
  <meta property="og:type" content="${escapeHtmlAttribute(type)}" />
  <meta property="og:title" content="${escapeHtml(pageTitle)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  ${noIndex ? "" : `<meta property="og:url" content="${escapeHtmlAttribute(canonical)}" />`}
  <meta property="og:locale" content="${escapeHtmlAttribute(locale.locale)}" />
  ${alternateSocialLocales.map((key) => `<meta property="og:locale:alternate" content="${escapeHtmlAttribute(locales[key].locale)}" />`).join("\n  ")}
  ${noIndex ? "" : `<meta property="og:image" content="${escapeHtmlAttribute(previewUrl)}" />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${escapeHtml(locale.ui.socialImageAlt)}" />`}
  <meta name="twitter:card" content="${noIndex ? "summary" : "summary_large_image"}" />
  <meta name="twitter:title" content="${escapeHtml(pageTitle)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  ${noIndex ? "" : `<meta name="twitter:image" content="${escapeHtmlAttribute(previewUrl)}" />
  <meta name="twitter:image:alt" content="${escapeHtml(locale.ui.socialImageAlt)}" />`}
  ${type === "article" ? `<meta property="article:published_time" content="${escapeHtmlAttribute(published)}" />
  <meta property="article:modified_time" content="${escapeHtmlAttribute(updated)}" />` : ""}
</head>`;
}

function languageList(localeKey, slug, pageKind = "case") {
  const locale = locales[localeKey];
  return `<ul class="language-list" aria-label="${escapeHtml(locale.ui.languages)}">
    ${localeKeysForPage(slug, pageKind)
      .map((key) => {
        const item = locales[key];
        return `<li><a href="${escapeHtmlAttribute(pageRoute(key, slug, pageKind))}" lang="${escapeHtmlAttribute(item.lang)}" hreflang="${escapeHtmlAttribute(item.lang)}" aria-label="${escapeHtml(item.languageName)}"${key === localeKey ? ' aria-current="page"' : ""}>${escapeHtml(item.label)}</a></li>`;
      })
      .join("\n    ")}
  </ul>`;
}

function header(localeKey, slug, onIndex = false, pageKind = "case") {
  const locale = locales[localeKey];
  const homeRoute = routeFor(localeKey, null);
  return `<a class="skip-link" href="#main">${escapeHtml(locale.ui.skip)}</a>
<div class="reading-progress" data-reading-progress aria-hidden="true"></div>
<header class="site-header">
  <div class="header-inner shell">
    <a class="brand" href="${escapeHtmlAttribute(homeRoute)}" aria-label="${escapeHtml(site.name)}, ${escapeHtml(locale.ui.home)}">
      <img src="/assets/brand/ejupi-labs-primary-carbon.svg" width="958" height="295" alt="Ejupi Labs" />
      <span class="brand-label">${escapeHtml(locale.ui.home)}</span>
    </a>
    <nav class="site-nav" id="site-navigation" aria-label="${escapeHtml(locale.ui.navigation)}" data-menu data-open="false">
      ${onIndex ? "" : `<a href="${escapeHtmlAttribute(homeRoute)}">${escapeHtml(locale.ui.allWork)}</a>`}
      <a href="${escapeHtmlAttribute(studioRouteFor(localeKey))}">${escapeHtml(locale.ui.portfolio)}</a>
      <a class="personal-link" href="${escapeHtmlAttribute(authorRouteFor(localeKey))}" rel="author">${escapeHtml(editorialUi[localeKey].personal)}</a>
      ${languageList(localeKey, slug, pageKind)}
    </nav>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-navigation" aria-label="${escapeHtml(locale.ui.menuOpen)}" data-menu-toggle data-open-label="${escapeHtml(locale.ui.menuOpen)}" data-close-label="${escapeHtml(locale.ui.menuClose)}"><span aria-hidden="true"></span></button>
  </div>
</header>`;
}

function footer(localeKey) {
  const locale = locales[localeKey];
  const ui = editorialUi[localeKey];
  return `<footer class="site-footer">
  <a class="page-compass text-button" href="#main" aria-label="${escapeHtml(locale.ui.backToTop)}" data-page-compass hidden>${escapeHtml(locale.ui.backToTop)} <span aria-hidden="true">↑</span></a>
  <div class="site-footer__inner shell">
    <div class="site-footer__brand">
      <img src="/assets/brand/ejupi-labs-primary-on-carbon.svg" width="958" height="295" alt="Ejupi Labs" loading="lazy" />
      <p>${escapeHtml(locale.ui.footerLine)}</p>
    </div>
    <div class="site-footer__links">
      <nav aria-label="${escapeHtml(locale.ui.footerNavigation)}">
        <a href="${escapeHtmlAttribute(routeFor(localeKey, null))}">${escapeHtml(locale.ui.allWork)}</a>
        <a href="${escapeHtmlAttribute(methodologyRoute(localeKey))}">${escapeHtml(ui.methodology)}</a>
        <a href="${escapeHtmlAttribute(studioRouteFor(localeKey))}">${escapeHtml(locale.ui.portfolio)}</a>
        <a class="personal-link" href="${escapeHtmlAttribute(authorRouteFor(localeKey))}" rel="author">${escapeHtml(ui.personal)}</a>
        <a href="${escapeHtmlAttribute(studioRouteFor(localeKey, "#contact"))}">${escapeHtml(locale.ui.contact)}</a>
        <a href="${escapeHtmlAttribute(feedRoute(localeKey))}">RSS</a>
        <a href="#main">${escapeHtml(locale.ui.backToTop)} <span aria-hidden="true">↑</span></a>
      </nav>
      <p class="site-footer__meta">© ${new Date(site.published).getUTCFullYear()} ${escapeHtml(site.name)}. ${escapeHtml(locale.ui.rights)}</p>
    </div>
  </div>
</footer>`;
}

function caseCard(localeKey, definition) {
  const locale = locales[localeKey];
  const ui = editorialUi[localeKey];
  const study = locale.cases[definition.slug];
  const collectionLabel =
    definition.kind === "labs" ? ui.labsCase : ui.professionalCase;
  const roleContribution =
    definition.kind === "professional" ? professionalRoleContribution(study) : null;
  return `<article class="case-card" data-case-card data-case-slug="${escapeHtmlAttribute(definition.slug)}" data-kind="${escapeHtmlAttribute(definition.kind)}" data-topic="${escapeHtmlAttribute(definition.categoryKey)}" itemscope itemtype="https://schema.org/Article">
  <div class="case-card__meta meta-line">
    <span class="card-number">${escapeHtml(ui.caseLabel.toLocaleUpperCase(locale.lang))} / ${escapeHtml(definition.number)}</span>
    <span>${escapeHtml(collectionLabel)}</span>
  </div>
  <div class="case-card__copy">
    <div class="case-card__category meta-line"><span>${escapeHtml(study.category)}</span><span>${escapeHtml(study.readMinutes)} ${escapeHtml(locale.ui.readTime)}</span></div>
    <h2 itemprop="headline"><a class="case-card__title-link case-card__action" href="${escapeHtmlAttribute(routeFor(localeKey, definition.slug))}" itemprop="url">${heading(study.cardTitle)}</a></h2>
    <p class="case-card__summary" itemprop="description">${escapeHtml(study.summary)}</p>
    <a class="text-link case-card__action" href="${escapeHtmlAttribute(routeFor(localeKey, definition.slug))}">${escapeHtml(locale.ui.readCase)} <span aria-hidden="true">↗</span></a>
    ${roleContribution ? `<dl class="case-card__role">
      <dt>${escapeHtml(ui.roleContribution)}</dt>
      <dd>${escapeHtml(roleContribution)}</dd>
    </dl>` : ""}
    <dl class="case-card__decision">
      <dt>${escapeHtml(ui.decisionPreview)}</dt>
      <dd>${escapeHtml(study.decisions.items[0].title)}</dd>
    </dl>
  </div>
  <div class="case-card__signal" aria-hidden="true">
    <span><small>№</small>${escapeHtml(definition.number)}</span>
    <div class="case-card__trace"><i></i><i></i><i></i><i></i></div>
  </div>
  <div class="case-card__foot">
    <ul class="tag-list" role="list" aria-label="${escapeHtml(locale.ui.stack)}">${definition.stack.slice(0, 3).map((tag) => `<li>${escapeHtml(tag)}</li>`).join("")}</ul>
  </div>
</article>`;
}

function indexPage(localeKey) {
  const locale = locales[localeKey];
  const ui = editorialUi[localeKey];
  const visibleDefinitions = definitionsForLocale(localeKey);

  const dynamicEyebrow = locale.index.eyebrow.replace(
    /01\s*\/\s*\d+$/u,
    `01 / ${String(visibleDefinitions.length).padStart(2, "0")}`,
  );
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${site.name} | ${locale.ui.home}`,
    url: absolute(routeFor(localeKey, null)),
    inLanguage: locale.lang,
    description: locale.index.description,
    image: socialImageUrl(localeKey),
    datePublished: site.published,
    dateModified: latestCatalogUpdate(),
    publisher: publisherSchema(),
    blogPost: visibleDefinitions.map((definition) => ({
      "@type": "BlogPosting",
      headline: locale.cases[definition.slug].title,
      url: absolute(routeFor(localeKey, definition.slug)),
      image: socialImageUrl(localeKey),
      datePublished: definition.published,
      dateModified: definition.updated,
    })),
  };

  return `${pageHead({ localeKey, title: locale.ui.home, description: locale.index.description })}
<body>
<script type="application/ld+json">${safeJson(blogSchema)}</script>
${header(localeKey, null, true)}
<main id="main" tabindex="-1" itemscope itemtype="https://schema.org/Blog">
  <section class="index-hero shell">
    <span class="eyebrow">${escapeHtml(dynamicEyebrow)}</span>
    <div class="index-hero__copy">
      <h1 itemprop="name">${heading(locale.index.title)}</h1>
      <p class="index-hero__lead" itemprop="description">${escapeHtml(locale.index.description)}</p>
    </div>
    <dl class="index-hero__ledger">
      <div><dt>${escapeHtml(ui.publishedCases)}</dt><dd>${visibleDefinitions.length}</dd></div>
      <div><dt>${escapeHtml(locale.ui.languages)}</dt><dd>${localeOrder.length.toString().padStart(2, "0")}</dd></div>
      <div><dt>${escapeHtml(ui.methodology)}</dt><dd><a href="${escapeHtmlAttribute(methodologyRoute(localeKey))}">${escapeHtml(ui.indexPromise)} <span aria-hidden="true">↗</span></a></dd></div>
    </dl>
  </section>
  <section class="case-index shell" aria-label="${escapeHtml(ui.archive)}">
    <div class="discovery" data-discovery data-search-index-url="${escapeHtmlAttribute(searchAssetUrls[localeKey])}" hidden>
      <div class="discovery__search">
        <label for="case-search"><span>${escapeHtml(ui.searchLabel)}</span><kbd class="discovery__shortcut" aria-hidden="true">/</kbd></label>
        <input id="case-search" type="search" inputmode="search" autocomplete="off" placeholder="${escapeHtml(ui.searchPlaceholder)}" aria-controls="case-results" aria-keyshortcuts="/" data-case-search />
      </div>
      <div class="discovery__status">
        <p aria-live="polite" aria-atomic="true"><strong data-case-count>${visibleDefinitions.length}</strong> <span data-case-count-label data-singular="${escapeHtml(ui.result)}" data-plural="${escapeHtml(ui.results)}">${escapeHtml(ui.results)}</span></p>
        <p class="discovery__message" role="status" aria-live="polite" aria-atomic="true" data-search-state data-loading="${escapeHtml(ui.searchLoading)}" data-fallback="${escapeHtml(ui.searchFallback)}"></p>
        <button class="text-button" type="button" data-case-clear disabled>${escapeHtml(ui.clear)}</button>
      </div>
    </div>
    <div class="case-list" id="case-results" data-case-list>${visibleDefinitions.map((definition) => caseCard(localeKey, definition)).join("")}</div>
    <div class="case-empty" data-case-empty hidden>
      <span>00 / 00</span>
      <h2>${heading(ui.emptyTitle)}</h2>
      <p>${escapeHtml(ui.emptyBody)}</p>
      <button class="text-link" type="button" data-case-clear>${escapeHtml(ui.showAll)} <span aria-hidden="true">↺</span></button>
    </div>
  </section>
</main>
${footer(localeKey)}
</body>
</html>`;
}

function splitSvgLabel(label) {
  if (label.length <= 15) return [label];
  const words = label.split(" ");
  let best = 1;
  let smallestGap = Number.POSITIVE_INFINITY;
  for (let index = 1; index < words.length; index += 1) {
    const left = words.slice(0, index).join(" ").length;
    const right = words.slice(index).join(" ").length;
    const gap = Math.abs(left - right);
    if (gap < smallestGap) {
      smallestGap = gap;
      best = index;
    }
  }
  return [words.slice(0, best).join(" "), words.slice(best).join(" ")];
}

function svgLabel(label, x, y) {
  const lines = splitSvgLabel(label);
  return `<text x="${x}" y="${lines.length === 1 ? y + 6 : y - 5}" text-anchor="middle" fill="#f4f1ea" font-family="ui-monospace, monospace" font-size="16" letter-spacing="1">${lines.map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : 22}">${escapeHtml(line)}</tspan>`).join("")}</text>`;
}

function architectureSvg(localeKey, type, labels, accessibleLabel) {
  const locale = locales[localeKey];
  const ui = editorialUi[localeKey];
  const uppercase = (value) => String(value).toLocaleUpperCase(locale.lang);
  const titleId = `architecture-${type}-title`;
  const marker = `<defs><marker id="arrow-${type}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#e97a4a" /></marker></defs>`;
  const frame = `<rect x="1" y="1" width="1198" height="448" fill="#0e1111" stroke="#59605d" /><path d="M40 62H1160M40 388H1160" stroke="#59605d" stroke-width="1" /><text x="40" y="40" fill="#9ca39f" font-family="ui-monospace, monospace" font-size="14" letter-spacing="2">${escapeHtml(uppercase(ui.systemViewLabel))} / ${escapeHtml(uppercase(type))}</text>`;

  let drawing = "";
  if (type === "erp") {
    const ys = [88, 162, 236, 310];
    drawing = labels.slice(0, 4).map((label, index) => `<rect x="90" y="${ys[index]}" width="430" height="54" fill="none" stroke="${index === 1 ? "#e97a4a" : "#f4f1ea"}" /><text x="305" y="${ys[index] + 33}" text-anchor="middle" fill="#f4f1ea" font-family="ui-monospace, monospace" font-size="16" letter-spacing="1">${escapeHtml(label)}</text>${index < 3 ? `<path d="M305 ${ys[index] + 54}V${ys[index + 1]}" stroke="#e97a4a" marker-end="url(#arrow-${type})" />` : ""}`).join("");
    drawing += `<rect x="760" y="150" width="350" height="160" fill="#b74d2c" stroke="#f4f1ea" />${svgLabel(labels[4], 935, 225)}<path d="M520 189H760M520 263H760" stroke="#e97a4a" marker-end="url(#arrow-${type})" /><path d="M760 282H560V337H520" fill="none" stroke="#59605d" stroke-dasharray="7 7" />`;
  } else {
    const xs = [38, 270, 502, 734, 966];
    drawing = xs.map((x, index) => `<rect x="${x}" y="166" width="196" height="96" fill="${index === 2 ? "#b74d2c" : "none"}" stroke="${index === 2 ? "#e97a4a" : "#f4f1ea"}" />${svgLabel(labels[index], x + 98, 211)}${index < 4 ? `<path d="M${x + 196} 214H${xs[index + 1] - 10}" stroke="#e97a4a" marker-end="url(#arrow-${type})" />` : ""}`).join("");
    if (type === "workflow") {
      drawing += `<path d="M1064 262V330H136V276" fill="none" stroke="#59605d" stroke-dasharray="8 8" marker-end="url(#arrow-${type})" /><text x="600" y="354" text-anchor="middle" fill="#9ca39f" font-family="ui-monospace, monospace" font-size="13" letter-spacing="2">${escapeHtml(uppercase(ui.processStateReturnLabel))}</text>`;
    } else {
      drawing += `<path d="M136 130V112H1064V130" fill="none" stroke="#59605d" stroke-dasharray="8 8" /><text x="600" y="100" text-anchor="middle" fill="#9ca39f" font-family="ui-monospace, monospace" font-size="13" letter-spacing="2">${escapeHtml(uppercase(ui.versionedDeliveryPathLabel))}</text>`;
    }
  }

  return `<svg viewBox="0 0 1200 450" role="img" aria-labelledby="${titleId}" xmlns="http://www.w3.org/2000/svg"><title id="${titleId}">${escapeHtml(accessibleLabel)}</title>${marker}${frame}${drawing}<rect x="1134" y="405" width="26" height="26" fill="#e97a4a" /></svg>`;
}

function paragraphs(values) {
  return values.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
}

function articlePage(localeKey, definition) {
  const locale = locales[localeKey];
  const ui = editorialUi[localeKey];
  const study = locale.cases[definition.slug];
  const collectionLabel =
    definition.kind === "labs" ? ui.labsCase : ui.professionalCase;
  const sectionEntries = [
    ["starting-point", study.starting.title],
    ["constraints", study.constraints.title],
    ["diagnosis", study.diagnosis.title],
    ["architecture", study.architecture.title],
    ["technology-rationale", study.technology.title],
    ["decisions", study.decisions.title],
    ["delivery", study.delivery.title],
    ["result", study.result.title],
  ];
  if (study.evidence) sectionEntries.push(["evidence", study.evidence.title]);
  const toc = sectionEntries.map(([id, title], itemIndex) => `<li><a href="#${id}" data-toc-link><span>${String(itemIndex + 1).padStart(2, "0")}</span><span>${escapeHtml(title)}</span></a></li>`).join("");
  const facts = study.facts.map(([term, detail]) => `<div class="fact"><dt>${escapeHtml(term)}</dt><dd>${escapeHtml(detail)}</dd></div>`).join("");
  const constraints = study.constraints.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  const technologyChoices = study.technology.items
    .map(
      (choice, itemIndex) => `<article class="technology-choice">
        <header class="technology-choice__header">
          <span class="technology-choice__number">T${String(itemIndex + 1).padStart(2, "0")}</span>
          <span class="technology-choice__label">${escapeHtml(ui.choiceLabel)}</span>
          <h3>${escapeHtml(choice.choice)}</h3>
        </header>
        <dl class="technology-choice__reasoning">
          <div><dt>${escapeHtml(ui.whyLabel)}</dt><dd>${escapeHtml(choice.why)}</dd></div>
          <div><dt>${escapeHtml(ui.alternativeLabel)}</dt><dd>${escapeHtml(choice.alternative)}</dd></div>
          <div><dt>${escapeHtml(ui.costLabel)}</dt><dd>${escapeHtml(choice.cost)}</dd></div>
        </dl>
      </article>`,
    )
    .join("");
  const decisions = study.decisions.items
    .map((decision, itemIndex) =>
      renderDecisionCard(decision, itemIndex, ui.tradeoffLabel),
    )
    .join("");
  const relatedDefinitions = relatedCaseDefinitions(definition, currentCaseDefinitions, {
    localeKey,
    limit: 2,
  });
  const dateFormatter = new Intl.DateTimeFormat(`${locale.lang}-CH`, {
    dateStyle: "long",
    timeZone: "UTC",
  });
  const formattedDate = dateFormatter.format(
    new Date(`${definition.published}T12:00:00Z`),
  );
  const formattedUpdated = dateFormatter.format(
    new Date(`${definition.updated}T12:00:00Z`),
  );
  const formattedVerified = definition.verifiedAt
    ? dateFormatter.format(new Date(`${definition.verifiedAt}T12:00:00Z`))
    : "";
  const sourceCommit = definition.sourceUrl?.split("/").at(-1);
  const verifiedSourceLabel =
    definition.sourceState === "release"
      ? ui.verifiedRelease
      : ui.verifiedCommitSnapshot;
  const evidence = study.evidence
    ? `<section class="story-section evidence-section" id="evidence" data-story-section>
        <h2>${heading(study.evidence.title)}</h2>
        <p>${escapeHtml(study.evidence.intro)}</p>
        <dl class="evidence-ledger">${study.evidence.items
          .map(
            ([term, detail]) =>
              `<div><dt>${escapeHtml(term)}</dt><dd>${escapeHtml(detail)}</dd></div>`,
          )
          .join("")}</dl>
        <p class="evidence-citation" data-source-state="${escapeHtmlAttribute(definition.sourceState)}">
          <span class="evidence-citation__state">${escapeHtml(verifiedSourceLabel)}</span>
          <a href="${escapeHtmlAttribute(definition.sourceUrl)}" rel="external">${escapeHtml(definition.sourceRef)} <span aria-hidden="true">· ${escapeHtml(sourceCommit.slice(0, 7))}</span></a>
          <span>${escapeHtml(ui.verifiedOn)} <time datetime="${escapeHtmlAttribute(definition.verifiedAt)}">${escapeHtml(formattedVerified)}</time></span>
        </p>
      </section>`
    : "";
  const projectAction = definition.projectUrl
    ? `<a class="project-action" href="${escapeHtmlAttribute(definition.projectUrl)}">${escapeHtml(ui.openProject)} <span aria-hidden="true">↗</span></a>`
    : "";
  const relatedCases = relatedDefinitions
    .map((relatedDefinition) => {
      const relatedStudy = locale.cases[relatedDefinition.slug];
      return `<li><a href="${escapeHtmlAttribute(routeFor(localeKey, relatedDefinition.slug))}" data-related-slug="${escapeHtmlAttribute(relatedDefinition.slug)}"><span class="section-label">${escapeHtml(ui.caseLabel)} / ${escapeHtml(relatedDefinition.number)}</span><strong>${escapeHtml(relatedStudy.cardTitle)}</strong><span aria-hidden="true">↗</span></a></li>`;
    })
    .join("");
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: study.title,
    description: study.summary,
    url: absolute(routeFor(localeKey, definition.slug)),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absolute(routeFor(localeKey, definition.slug)),
    },
    datePublished: definition.published,
    dateModified: definition.updated,
    inLanguage: locale.lang,
    image: socialImageUrl(localeKey),
    articleSection: study.category,
    author: {
      "@type": "Person",
      "@id": site.author.id,
      name: site.author.name,
      url: authorRouteFor(localeKey),
    },
    publisher: publisherSchema(),
    about: definition.stack,
    isPartOf: {
      "@type": "Blog",
      name: `${site.name} | ${locale.ui.home}`,
      url: absolute(routeFor(localeKey, null)),
    },
  };

  return `${pageHead({ localeKey, title: study.seoTitle, description: study.seoDescription, slug: definition.slug, type: "article", published: definition.published, updated: definition.updated })}
<body>
<script type="application/ld+json">${safeJson(articleSchema)}</script>
${header(localeKey, definition.slug)}
<main id="main" tabindex="-1">
  <article itemscope itemtype="https://schema.org/Article">
    <meta itemprop="datePublished" content="${escapeHtmlAttribute(definition.published)}" />
    <meta itemprop="dateModified" content="${escapeHtmlAttribute(definition.updated)}" />
    <header class="article-hero" data-case-kind="${escapeHtmlAttribute(definition.kind)}">
      <div class="article-hero__inner shell">
        <div class="article-hero__copy">
          <span class="article-kicker eyebrow">${escapeHtml(collectionLabel)} / ${escapeHtml(definition.number)}</span>
          <h1 itemprop="headline">${heading(study.title)}</h1>
          <p class="article-hero__summary" itemprop="description">${escapeHtml(study.summary)}</p>
        </div>
        <dl class="article-hero__facts"><div class="article-hero__marker" aria-hidden="true"><dt>${escapeHtml(ui.caseLabel)}</dt><dd>${escapeHtml(definition.number)}</dd></div>${facts}</dl>
      </div>
    </header>
    <div class="article-byline shell">
      <span class="article-byline__author" itemprop="author" itemscope itemtype="https://schema.org/Person" itemid="${escapeHtmlAttribute(site.author.id)}">
        <span class="article-byline__identity">${escapeHtml(ui.bylineBy)} <a rel="author" itemprop="url" href="${escapeHtmlAttribute(authorRouteFor(localeKey))}"><span itemprop="name">${escapeHtml(site.author.name)}</span></a></span>
        <span class="article-byline__role" itemprop="jobTitle">${escapeHtml(ui.authorRole)}</span>
      </span>
      <span class="article-byline__updated">${escapeHtml(ui.updated)} <time datetime="${escapeHtmlAttribute(definition.updated)}" itemprop="dateModified">${escapeHtml(formattedUpdated)}</time></span>
    </div>
    <div class="article-meta-bar shell">
      <div class="article-meta-bar__group"><span>${escapeHtml(locale.ui.published)} <time datetime="${escapeHtmlAttribute(definition.published)}">${escapeHtml(formattedDate)}</time></span><span>${escapeHtml(study.readMinutes)} ${escapeHtml(locale.ui.readTime)}</span></div>
      <ul class="tag-list" role="list" aria-label="${escapeHtml(locale.ui.stack)}">${definition.stack.map((tag) => `<li>${escapeHtml(tag)}</li>`).join("")}</ul>
    </div>
    <div class="case-layout shell">
      <nav class="case-toc" aria-labelledby="case-contents-title"><span class="toc-title" id="case-contents-title">${escapeHtml(locale.ui.contents)}</span><ol>${toc}</ol></nav>
      <div class="article-body" itemprop="articleBody">
        <section class="story-section" id="starting-point" data-story-section><h2>${heading(study.starting.title)}</h2>${paragraphs(study.starting.paragraphs)}</section>
        <section class="story-section" id="constraints" data-story-section><h2>${heading(study.constraints.title)}</h2><p>${escapeHtml(study.constraints.intro)}</p><ol class="constraint-list">${constraints}</ol></section>
        <section class="story-section" id="diagnosis" data-story-section><h2>${heading(study.diagnosis.title)}</h2>${paragraphs(study.diagnosis.paragraphs)}</section>
        <section class="story-section architecture-section" id="architecture" data-story-section><h2>${heading(study.architecture.title)}</h2><p>${escapeHtml(study.architecture.intro)}</p><figure class="architecture-frame">${architectureSvg(localeKey, definition.diagram, study.architecture.labels, `${study.architecture.title}. ${study.architecture.caption}`)}<figcaption>${escapeHtml(study.architecture.caption)}</figcaption></figure></section>
        <section class="story-section technology-rationale-section" id="technology-rationale" data-story-section><h2>${heading(study.technology.title)}</h2><p>${escapeHtml(study.technology.intro)}</p><div class="technology-choice-grid">${technologyChoices}</div></section>
        <section class="story-section architecture-section" id="decisions" data-story-section><h2>${heading(study.decisions.title)}</h2><p>${escapeHtml(study.decisions.intro)}</p><div class="decision-grid">${decisions}</div></section>
        <section class="story-section" id="delivery" data-story-section><h2>${heading(study.delivery.title)}</h2>${paragraphs(study.delivery.paragraphs)}</section>
        <section class="story-section" id="result" data-story-section><h2>${heading(study.result.title)}</h2>${paragraphs(study.result.paragraphs)}</section>
        ${evidence}
        <div class="scope-note" role="note" aria-labelledby="scope-note-title"><strong id="scope-note-title">${escapeHtml(locale.ui.sourceNote)}</strong><p>${escapeHtml(study.scope)}</p></div>
        ${projectAction}
      </div>
    </div>
    <nav class="article-next article-related shell" aria-labelledby="related-cases-title" data-related-cases>
      <div class="article-related__heading"><span class="section-label">${escapeHtml(ui.related)}</span><h2 id="related-cases-title">${heading(ui.related)}</h2></div>
      <ol class="article-related__list">${relatedCases}</ol>
    </nav>
  </article>
  <section class="site-cta">
    <div class="site-cta__copy"><h2>${heading(locale.index.ctaTitle)}</h2><p>${escapeHtml(locale.index.ctaBody)}</p></div>
    <div class="site-cta__action"><a href="${escapeHtmlAttribute(studioRouteFor(localeKey, "#contact"))}">${escapeHtml(locale.ui.contact)} <span aria-hidden="true">↗</span></a></div>
  </section>
</main>
${footer(localeKey)}
</body>
</html>`;
}

function methodologyPage(localeKey) {
  const locale = locales[localeKey];
  const copy = methodology.copy[localeKey];
  const sections = copy.sections
    .map(
      (section) =>
        `<section class="story-section" id="${escapeHtmlAttribute(section.id)}"><h2>${heading(section.title)}</h2>${paragraphs(section.paragraphs)}</section>`,
    )
    .join("");
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: copy.title,
    description: copy.description,
    url: absolute(methodologyRoute(localeKey)),
    image: socialImageUrl(localeKey),
    datePublished: methodology.published,
    dateModified: methodology.updated,
    inLanguage: locale.lang,
    author: {
      "@type": "Person",
      "@id": site.author.id,
      name: site.author.name,
      url: authorRouteFor(localeKey),
    },
    isPartOf: {
      "@type": "Blog",
      name: `${site.name} | ${locale.ui.home}`,
      url: absolute(routeFor(localeKey, null)),
    },
  };

  return `${pageHead({
    localeKey,
    title: copy.title,
    description: copy.description,
    pageKind: "methodology",
    published: methodology.published,
    updated: methodology.updated,
  })}
<body>
<script type="application/ld+json">${safeJson(pageSchema)}</script>
${header(localeKey, null, false, "methodology")}
<main id="main" tabindex="-1">
  <article class="methodology-page">
    <header class="methodology-hero shell">
      <span class="eyebrow">${escapeHtml(copy.eyebrow)}</span>
      <h1>${heading(copy.title)}</h1>
      <p>${escapeHtml(copy.intro)}</p>
    </header>
    <div class="methodology-body shell">
      ${sections}
      <a class="project-action methodology-contact" href="mailto:info@ejupilabs.com">${escapeHtml(copy.contactLabel)} <span aria-hidden="true">↗</span></a>
    </div>
  </article>
</main>
${footer(localeKey)}
</body>
</html>`;
}

function notFoundPage(localeKey) {
  const locale = locales[localeKey];
  return `${pageHead({ localeKey, title: "404", description: locale.ui.notFoundBody, noIndex: true })}
<body>
${header(localeKey, null)}
<main class="not-found shell" id="main" tabindex="-1"><span class="not-found__code">ERROR / 404</span><h1>${escapeHtml(locale.ui.notFoundTitle)}</h1><p>${escapeHtml(locale.ui.notFoundBody)}</p><a class="text-link" href="${escapeHtmlAttribute(routeFor(localeKey, null))}">${escapeHtml(locale.ui.notFoundAction)} <span aria-hidden="true">→</span></a></main>
${footer(localeKey)}
</body>
</html>`;
}

function rss(localeKey) {
  const locale = locales[localeKey];
  const definitions = definitionsForLocale(localeKey).toSorted(
    (first, second) =>
      second.published.localeCompare(first.published) ||
      second.updated.localeCompare(first.updated) ||
      first.number.localeCompare(second.number),
  );
  const items = definitions.map((definition) => {
    const study = locale.cases[definition.slug];
    const url = absolute(routeFor(localeKey, definition.slug));
    return `<item><title>${escapeXml(study.title)}</title><link>${escapeXml(url)}</link><guid isPermaLink="true">${escapeXml(url)}</guid><description>${escapeXml(study.summary)}</description><category>${escapeXml(study.category)}</category><pubDate>${escapeXml(new Date(`${definition.published}T12:00:00Z`).toUTCString())}</pubDate></item>`;
  }).join("");
  const latest = definitions.reduce(
    (current, definition) =>
      definition.updated > current ? definition.updated : current,
    site.published,
  );
  return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${escapeXml(site.name)} | ${escapeXml(locale.ui.home)}</title><link>${escapeXml(absolute(routeFor(localeKey, null)))}</link><description>${escapeXml(locale.index.description)}</description><language>${escapeXml(locale.lang)}</language><lastBuildDate>${escapeXml(new Date(`${latest}T12:00:00Z`).toUTCString())}</lastBuildDate><atom:link href="${escapeXml(absolute(feedRoute(localeKey)))}" rel="self" type="application/rss+xml" />${items}</channel></rss>`;
}

function sitemap() {
  const pages = [
    { slug: null, pageKind: "case", updated: latestCatalogUpdate() },
    { slug: null, pageKind: "methodology", updated: methodology.updated },
    ...currentCaseDefinitions.map((definition) => ({
      slug: definition.slug,
      pageKind: "case",
      updated: definition.updated,
    })),
  ];
  const urls = pages.flatMap(({ slug, pageKind, updated }) =>
    localeKeysForPage(slug, pageKind).map((localeKey) => {
      const route = pageRoute(localeKey, slug, pageKind);
      const links = localeKeysForPage(slug, pageKind)
        .map(
          (alternateLocale) =>
            `<xhtml:link rel="alternate" hreflang="${escapeXml(alternateLocale)}" href="${escapeXml(absolute(pageRoute(alternateLocale, slug, pageKind)))}" />`,
        )
        .join("");
      return `<url><loc>${escapeXml(absolute(route))}</loc><lastmod>${escapeXml(updated)}</lastmod>${links}<xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(absolute(pageRoute("en", slug, pageKind)))}" /></url>`;
    }),
  );
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>`;
}

function llmsText() {
  const studies = currentCaseDefinitions.map((definition) => {
    const study = locales.en.cases[definition.slug];
    return `- [${study.title}](${absolute(routeFor("en", definition.slug))}): ${study.summary}`;
  }).join("\n");
  return `# ${site.name} Case Studies\n\n> ${currentCaseDefinitions.length} documented engineering case studies. Each distinguishes the chosen technical boundary, why it fit, the strongest credible alternative and the cost accepted. Organisations, commercial details and unsupported metrics are omitted.\n\n## Case studies\n\n${studies}\n\n## Languages\n\n- [English](${absolute("/")})\n- [Italiano](${absolute("/it/")})\n- [Deutsch](${absolute("/de/")})\n- [Français](${absolute("/fr/")})\n\n## Methodology\n\n- [Editorial methodology](${absolute(methodologyRoute("en"))})\n\n## Machine-readable catalog\n\n- [Case-study catalog](${absolute("/case-studies.json")})\n\n## Main studio\n\n- [Ejupi Labs](${site.portfolioUrl})\n`;
}

function openSearch(localeKey) {
  const locale = locales[localeKey];
  const ui = editorialUi[localeKey];
  const searchTemplate = `${absolute(routeFor(localeKey, null))}?q={searchTerms}`;
  return `<?xml version="1.0" encoding="UTF-8"?><OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/"><ShortName>${escapeXml(site.name)}</ShortName><Description>${escapeXml(ui.searchLabel)}</Description><InputEncoding>UTF-8</InputEncoding><Language>${escapeXml(locale.lang)}</Language><Url type="text/html" template="${escapeXml(searchTemplate)}" /></OpenSearchDescription>`;
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(join(outputRoot, "assets"), { recursive: true });
await cp(join(sourceRoot, "assets"), join(outputRoot, "assets"), { recursive: true });
await cp(join(sourceRoot, "_headers"), join(outputRoot, "_headers"));
await cp(join(sourceRoot, ".well-known"), join(outputRoot, ".well-known"), { recursive: true });
await write(assetFiles.styles, stylesSource);
await write(assetFiles.client, clientSource);
for (const localeKey of localeOrder) {
  await write(searchAssetFiles[localeKey], searchIndexSources[localeKey]);
}

for (const localeKey of localeOrder) {
  const locale = locales[localeKey];
  await mkdir(dirname(outputPath(routeFor(localeKey, null))), { recursive: true });
  await writeFile(outputPath(routeFor(localeKey, null)), indexPage(localeKey), "utf8");
  await mkdir(dirname(outputPath(methodologyRoute(localeKey))), { recursive: true });
  await writeFile(
    outputPath(methodologyRoute(localeKey)),
    methodologyPage(localeKey),
    "utf8",
  );
  await write(`${locale.prefix.replace(/^\//, "")}${locale.prefix ? "/" : ""}404.html`, notFoundPage(localeKey));
  await write(feedRoute(localeKey).replace(/^\//, ""), rss(localeKey));
  await write(searchDescriptionRoute(localeKey).replace(/^\//, ""), openSearch(localeKey));
  for (const definition of caseDefinitions) {
    if (!definition.availableLocales.includes(localeKey)) continue;
    const target = outputPath(routeFor(localeKey, definition.slug));
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, articlePage(localeKey, definition), "utf8");
  }
}

await write("sitemap.xml", sitemap());
await write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${absolute("/sitemap.xml")}\n`);
await write("llms.txt", llmsText());
await write("case-studies.json", `${JSON.stringify(caseCatalog(), null, 2)}\n`);
await write("site.webmanifest", `${JSON.stringify({ id: "/", name: `${site.name} | Case Studies`, short_name: "Ejupi Labs", description: locales.en.index.description, lang: "en", start_url: "/", scope: "/", display: "standalone", background_color: "#f4f1ea", theme_color: "#f4f1ea", icons: [{ src: "/assets/brand/favicon.svg?v=4", sizes: "any", type: "image/svg+xml", purpose: "any" }] }, null, 2)}\n`);

const sourceHeaders = await readFile(join(sourceRoot, "_headers"), "utf8");
if (!sourceHeaders.includes("Content-Security-Policy")) throw new Error("Security headers are missing.");

const canonicalArticleCount = currentCaseDefinitions.reduce(
  (total, definition) => total + definition.availableLocales.length,
  0,
);
console.log(
  `Built ${localeOrder.length * 2 + canonicalArticleCount} canonical pages for ${currentCaseDefinitions.length} current case studies in ${outputRoot}`,
);
