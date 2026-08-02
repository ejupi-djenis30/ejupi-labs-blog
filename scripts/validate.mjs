import { createHash } from "node:crypto";
import { access, readFile, readdir } from "node:fs/promises";
import { basename, extname, join, relative, resolve } from "node:path";
import {
  caseDefinitions,
  currentCaseDefinitions,
  localeOrder,
  locales,
  protectedLegacySlugs,
  relatedCaseDefinitions,
  site,
} from "../src/content.mjs";
import { assertProtectedLegacySlugs } from "../src/content-contract.mjs";
import { editorialUi, methodology } from "../src/editorial.mjs";
import {
  assertPublicDomainTopology,
  findDisallowedEjupiLabsUrls,
} from "../src/public-url-policy.mjs";

const root = resolve(import.meta.dirname, "..");
const dist = join(root, "dist");
const errors = [];
const CANONICAL_FAVICON_SHA256 = "a136f26f9854259e466cac621e5b6b9a5e193a0194cbc7822302b34b9621aa87";

try {
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
} catch (error) {
  errors.push(error instanceof Error ? error.message : String(error));
}

const canonicalArticleCount = currentCaseDefinitions.reduce(
  (total, definition) => total + definition.availableLocales.length,
  0,
);

function routeFor(localeKey, slug) {
  const prefix = locales[localeKey].prefix;
  return slug ? `${prefix}/case-studies/${slug}/` : `${prefix}/` || "/";
}

function methodologyRoute(localeKey) {
  return `${locales[localeKey].prefix}/methodology/`;
}

function socialImagePath(localeKey) {
  return `/assets/social/case-studies-${localeKey}.png`;
}

function socialImageUrl(localeKey) {
  return new URL(socialImagePath(localeKey), site.url).href;
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

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function assertSocialMetadata(html, label, localeKey) {
  const imageUrl = socialImageUrl(localeKey);
  const alternateLocales = localeOrder.filter((key) => key !== localeKey);
  const expectedTags = [
    `<meta property="og:image" content="${imageUrl}" />`,
    '<meta property="og:image:type" content="image/png" />',
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    `<meta property="og:image:alt" content="${locales[localeKey].ui.socialImageAlt}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:image" content="${imageUrl}" />`,
    `<meta name="twitter:image:alt" content="${locales[localeKey].ui.socialImageAlt}" />`,
    ...alternateLocales.map(
      (key) =>
        `<meta property="og:locale:alternate" content="${locales[key].locale}" />`,
    ),
  ];

  for (const tag of expectedTags) {
    if (!html.includes(tag)) errors.push(`${label} is missing social metadata: ${tag}`);
  }
  if (count(html, /<meta property="og:image" content=/gu) !== 1) {
    errors.push(`${label} must contain exactly one Open Graph image.`);
  }
  if (count(html, /<meta name="twitter:image" content=/gu) !== 1) {
    errors.push(`${label} must contain exactly one Twitter image.`);
  }
  if (count(html, /<meta property="og:locale:alternate" content=/gu) !== alternateLocales.length) {
    errors.push(`${label} must expose every alternate Open Graph locale exactly once.`);
  }
}

function pngDimensions(png) {
  if (png.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a") {
    return null;
  }
  return {
    width: png.readUInt32BE(16),
    height: png.readUInt32BE(20),
  };
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
  const currentLocaleDefinitions = currentCaseDefinitions.filter((definition) =>
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
    const definition = slug
      ? caseDefinitions.find((item) => item.slug === slug)
      : null;
    if (!html.startsWith("<!doctype html>")) errors.push(`${label} has no HTML doctype.`);
    if (!html.includes(`<html class="no-js" lang="${locale.lang}">`)) errors.push(`${label} has the wrong lang attribute.`);
    if (count(html, /<h1\b/g) !== 1) errors.push(`${label} must contain exactly one h1.`);
    if (!html.includes(`<link rel="canonical" href="${new URL(route, site.url).href}" />`)) {
      errors.push(`${label} has the wrong canonical URL.`);
    }
    assertSocialMetadata(html, label, localeKey);
    if (!html.includes(`<link rel="author" href="${expectedAuthorRoute}" />`)) errors.push(`${label} has the wrong localized author URL.`);
    if (!html.includes(`class="personal-link" href="${expectedAuthorRoute}"`)) errors.push(`${label} is missing its visible localized personal link.`);
    if (!html.includes('<link rel="icon" href="/assets/brand/favicon.svg?v=4" type="image/svg+xml" />')) errors.push(`${label} is missing the shared versioned favicon.`);
    if (!html.includes('<link rel="manifest" href="/site.webmanifest" />')) errors.push(`${label} is missing the web manifest link.`);
    for (const font of ["regular", "semibold"]) {
      const preload = `<link rel="preload" href="/assets/fonts/instrument-sans-${font}.woff2" as="font" type="font/woff2" crossorigin />`;
      if (count(html, new RegExp(preload.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&"), "gu")) !== 1) {
        errors.push(`${label} must preload the ${font} interface font exactly once.`);
      }
    }
    if (!html.includes(`href="${expectedStudioRoute}"`)) errors.push(`${label} has the wrong localized studio URL.`);
    if (!html.includes(`href="${expectedContactRoute}"`)) errors.push(`${label} has the wrong localized contact URL.`);
    if (!html.includes(`href="${methodologyRoute(localeKey)}"`)) errors.push(`${label} is missing its localized methodology link.`);
    if (count(html, /<meta name="twitter:title" content="[^"]+" \/>/g) !== 1) errors.push(`${label} must contain one Twitter title.`);
    if (count(html, /<meta name="twitter:description" content="[^"]+" \/>/g) !== 1) errors.push(`${label} must contain one Twitter description.`);
    const alternateCount =
      (definition?.availableLocales.length ?? localeOrder.length) + 1;
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
    if (!html.includes('id="mobile-menu"') || !html.includes('aria-controls="mobile-menu"')) {
      errors.push(`${label} menu is not associated with its toggle.`);
    }
    if (!/href="\/assets\/styles\.[0-9a-f]{12}\.css"/u.test(html)) errors.push(`${label} has no fingerprinted stylesheet.`);
    if (!/src="\/assets\/client\.[0-9a-f]{12}\.js"/u.test(html)) errors.push(`${label} has no fingerprinted client script.`);
    if (/\/assets\/(?:styles\.css|client\.js)/u.test(html)) errors.push(`${label} references an unversioned mutable asset.`);
    if (/href=""|src=""/.test(html)) errors.push(`${label} contains an empty link or source.`);
    if (/\.\.|\?\.|!\./.test(html.replaceAll("https://", ""))) errors.push(`${label} contains duplicated terminal punctuation.`);
    if (/<img(?![^>]*\balt=)[^>]*>/i.test(html)) errors.push(`${label} contains an image without alt text.`);
    if (!slug && [...locales[localeKey].index.description].length > 180) {
      errors.push(`${label} meta description exceeds 180 characters.`);
    }
    const structuredDataText = html.match(
      /<script type="application\/ld\+json">(?<json>.*?)<\/script>/su,
    )?.groups?.json;
    if (!structuredDataText) {
      errors.push(`${label} has no JSON-LD document.`);
    } else if (structuredDataText) {
      try {
        const structuredData = JSON.parse(structuredDataText);
        const expectedPublisher = {
          "@type": "Organization",
          "@id": "https://ejupilabs.com/#organization",
          name: site.name,
          url: "https://ejupilabs.com/",
          logo: "https://ejupilabs.com/icons/apple-touch-icon.png",
        };
        if (
          JSON.stringify(structuredData.publisher) !==
          JSON.stringify(expectedPublisher)
        ) {
          errors.push(`${label} has an inconsistent canonical publisher.`);
        }
        if (!slug) {
          const expectedModified = currentCaseDefinitions.reduce(
            (latest, item) => item.updated > latest ? item.updated : latest,
            site.published,
          );
          if (
            structuredData.datePublished !== site.published ||
            structuredData.dateModified !== expectedModified
          ) {
            errors.push(`${label} has stale Blog publication metadata.`);
          }
          const blogPosts = JSON.stringify(structuredData.blogPost ?? []);
          if (!blogPosts.includes("vector-placement-operations")) {
            errors.push(`${label} JSON-LD must retain VECTOR as a current case study.`);
          }
        } else {
          const expectedUrl = new URL(route, site.url).href;
          const study = locale.cases[slug];
          if (
            structuredData.mainEntityOfPage?.["@id"] !== expectedUrl ||
            structuredData.articleSection !== study.category
          ) {
            errors.push(`${label} has incomplete BlogPosting page identity metadata.`);
          }
        }
      } catch {
        errors.push(`${label} has invalid JSON-LD.`);
      }
    }

    if (slug) {
      const study = locale.cases[slug];
      const expectedPageTitle = `${study.seoTitle} | ${site.name}`;
      const expectedDescription = study.seoDescription;
      const visibleTitle = /[.!?]$/u.test(study.title)
        ? study.title.slice(0, -1)
        : study.title;
      if (
        !html.includes(
          `<title>${escapeHtml(expectedPageTitle)}</title>`,
        )
      ) {
        errors.push(`${label} has the wrong concise page title.`);
      }
      if (
        !html.includes(
          `<meta name="description" content="${escapeHtml(expectedDescription)}" />`,
        )
      ) {
        errors.push(`${label} has the wrong concise meta description.`);
      }
      if ([...expectedPageTitle].length > 70) {
        errors.push(`${label} page title exceeds 70 characters.`);
      }
      if ([...expectedDescription].length > 180) {
        errors.push(`${label} meta description exceeds 180 characters.`);
      }
      if (
        !html.includes(
          `<h1 itemprop="headline">${escapeHtml(visibleTitle)}<span class="title-stop">`,
        )
      ) {
        errors.push(`${label} no longer preserves its full visible H1.`);
      }
      const expectedSections = definition?.kind === "labs" ? 9 : 8;
      if (count(html, /data-story-section/g) !== expectedSections) errors.push(`${label} must contain ${expectedSections} complete story sections.`);
      if (
        !html.includes(
          '<nav class="case-toc" aria-labelledby="case-contents-title">',
        ) ||
        !html.includes(
          '<span class="toc-title" id="case-contents-title">',
        )
      ) {
        errors.push(`${label} has no labelled article navigation.`);
      }
      if (
        !html.includes(
          '<div class="scope-note" role="note" aria-labelledby="scope-note-title">',
        ) ||
        !html.includes('<strong id="scope-note-title">')
      ) {
        errors.push(`${label} has no labelled scope note.`);
      }
      if (
        html.includes('<aside class="case-toc"') ||
        html.includes('<aside class="scope-note"')
      ) {
        errors.push(`${label} nests a complementary landmark inside the article.`);
      }
      if (!html.includes("architecture-frame")) errors.push(`${label} is missing its architecture figure.`);
      if (count(html, /class="technology-choice"/g) !== 4) errors.push(`${label} must contain four explicit technology rationales.`);
      const technologyList = html.match(
        /<ul class="tag-list" role="list" aria-label="[^"]+">(?<items>[\s\S]*?)<\/ul>/u,
      );
      if (!technologyList) {
        errors.push(`${label} is missing its labelled semantic technology list.`);
      } else if (
        count(technologyList.groups.items, /<li>/g) !==
        (definition?.stack.length ?? 0)
      ) {
        errors.push(`${label} has the wrong number of semantic technology items.`);
      }
      if (html.includes('<div class="tag-list"')) {
        errors.push(`${label} uses non-list markup for its technologies.`);
      }
      const articleNavigation =
        html.match(/<nav class="[^"]*\bsite-nav\b[^"]*"[\s\S]*?<\/nav>/u)?.[0] ?? "";
      if (
        !articleNavigation.includes(`href="${routeFor(localeKey, null)}"`) ||
        !articleNavigation.includes(locales[localeKey].ui.allWork)
      ) {
        errors.push(`${label} is missing the case-study index link in its primary navigation.`);
      }
      for (const rationaleLabel of [
        editorial.choiceLabel,
        editorial.whyLabel,
        editorial.alternativeLabel,
        editorial.costLabel,
        editorial.tradeoffLabel,
      ]) {
        if (!html.includes(rationaleLabel)) errors.push(`${label} is missing the localized rationale label ${rationaleLabel}.`);
      }
      if (!html.includes('class="site-cta"')) errors.push(`${label} is missing its article CTA.`);
      if (!html.includes(locales[localeKey].ui.sourceNote)) errors.push(`${label} is missing its evidence boundary.`);
      if (definition?.kind === "labs" && !html.includes("evidence-ledger")) errors.push(`${label} is missing its evidence ledger.`);
      if (definition?.kind === "labs" && !html.includes(definition.projectUrl)) errors.push(`${label} is missing its working product link.`);
      if (definition?.kind === "labs") {
        if (!html.includes('class="evidence-citation"')) errors.push(`${label} is missing its source citation.`);
        if (!html.includes(`data-source-state="${definition.sourceState}"`)) errors.push(`${label} has the wrong visible source state.`);
        const sourceStateLabel =
          definition.sourceState === "release"
            ? editorial.verifiedRelease
            : editorial.verifiedCommitSnapshot;
        if (!html.includes(sourceStateLabel)) errors.push(`${label} is missing its localized source-state label.`);
        if (!html.includes(`href="${definition.sourceUrl}"`)) errors.push(`${label} has the wrong immutable source URL.`);
        if (!html.includes(definition.sourceRef)) errors.push(`${label} is missing its source reference.`);
        if (!html.includes(`<time datetime="${definition.verifiedAt}">`)) errors.push(`${label} is missing its evidence verification date.`);
      } else if (html.includes("evidence-citation")) {
        errors.push(`${label} must not expose a Labs source citation.`);
      }
      const relatedSlugs = [...html.matchAll(/data-related-slug="(?<slug>[^"]+)"/gu)].map(
        (match) => match.groups.slug,
      );
      const expectedRelatedSlugs = relatedCaseDefinitions(definition, currentCaseDefinitions, {
        localeKey,
        limit: 2,
      }).map(({ slug: relatedSlug }) => relatedSlug);
      if (JSON.stringify(relatedSlugs) !== JSON.stringify(expectedRelatedSlugs)) {
        errors.push(`${label} has the wrong related-case order.`);
      }
      if (!html.includes('class="article-byline shell"')) errors.push(`${label} is missing its visible author byline.`);
      if (!html.includes(`rel="author" itemprop="url" href="${expectedAuthorRoute}"`)) errors.push(`${label} has the wrong byline author URL.`);
      if (!html.includes(editorial.authorRole)) errors.push(`${label} is missing its localized author role.`);
      if (!html.includes(`${editorial.updated} <time datetime="${definition?.updated}"`)) errors.push(`${label} is missing its localized editorial update date.`);
      if (!html.includes(uppercase(editorial.systemViewLabel))) errors.push(`${label} has an untranslated system-view label.`);
      if (definition?.diagram === "workflow" && !html.includes(uppercase(editorial.processStateReturnLabel))) {
        errors.push(`${label} has an untranslated workflow-return label.`);
      }
      if (definition?.diagram !== "workflow" && definition?.diagram !== "erp" && !html.includes(uppercase(editorial.versionedDeliveryPathLabel))) {
        errors.push(`${label} has an untranslated delivery-path label.`);
      }
    } else {
      if (!html.includes(uppercase(editorial.caseLabel))) errors.push(`${label} has an untranslated case-card label.`);
      if (count(html, /class="case-card__decision"/g) !== currentLocaleDefinitions.length) {
        errors.push(`${label} must expose one key decision per case card.`);
      }
      if (!html.includes(editorial.decisionPreview)) {
        errors.push(`${label} has an untranslated key-decision label.`);
      }
      for (const visibleDefinition of currentLocaleDefinitions) {
        const decisionTitle = locales[localeKey].cases[visibleDefinition.slug].decisions.items[0].title;
        if (!html.includes(escapeHtml(decisionTitle))) {
          errors.push(`${label} is missing the ${visibleDefinition.slug} key decision.`);
        }
      }
      const indexTechnologyLists = [
        ...html.matchAll(
          /<ul class="tag-list" role="list" aria-label="[^"]+">(?<items>[\s\S]*?)<\/ul>/gu,
        ),
      ];
      const visibleDefinitionCount = currentLocaleDefinitions.length;
      if (indexTechnologyLists.length !== visibleDefinitionCount) {
        errors.push(`${label} must expose one semantic technology list per case card.`);
      }
      if (
        indexTechnologyLists.some(
          (list) =>
            count(list.groups.items, /<li>/g) < 1 ||
            count(list.groups.items, /<li>/g) > 3,
        )
      ) {
        errors.push(`${label} has a case-card technology list outside the one-to-three item range.`);
      }
      if (html.includes('<div class="tag-list"')) {
        errors.push(`${label} uses non-list markup for its technologies.`);
      }
      const indexNavigation =
        html.match(/<nav class="[^"]*\bsite-nav\b[^"]*"[\s\S]*?<\/nav>/u)?.[0] ?? "";
      if (indexNavigation.includes(`>${locales[localeKey].ui.allWork}</a>`)) {
        errors.push(`${label} repeats a self-link to the case-study index in its primary navigation.`);
      }
      if (!/data-search-index-url="\/assets\/search\.[a-z]{2}\.[0-9a-f]{12}\.json"/u.test(html)) {
        errors.push(`${label} has no fingerprinted full-text search index.`);
      }
      for (const removedBlock of [
        "index-register",
        "intro-section",
        "principle-grid",
        "site-cta",
        "data-case-type",
        "data-case-topic",
      ]) {
        if (html.includes(removedBlock)) errors.push(`${label} still contains the removed ${removedBlock} block.`);
      }
      if (count(html, /data-case-search/g) !== 1) errors.push(`${label} must expose exactly one case-study search field.`);
      if (!html.includes("data-case-count")) errors.push(`${label} is missing its live result count.`);
      if (!html.includes("data-case-clear")) errors.push(`${label} is missing its search reset control.`);
      const heroPosition = html.indexOf('class="index-hero shell"');
      const discoveryPosition = html.indexOf("data-discovery");
      const caseListPosition = html.indexOf("data-case-list");
      if (
        heroPosition < 0 ||
        discoveryPosition < 0 ||
        caseListPosition < 0 ||
        !(heroPosition < discoveryPosition && discoveryPosition < caseListPosition)
      ) {
        errors.push(`${label} must lead directly from the editorial header to discovery and case studies.`);
      }
      if (!html.includes('data-case-slug="vector-placement-operations"')) {
        errors.push(`${label} must retain VECTOR on the current case-study surface.`);
      }
    }
  }

  const methodologyRoutePath = methodologyRoute(localeKey);
  const methodologyFile = fileForRoute(methodologyRoutePath);
  if (!(await exists(methodologyFile))) {
    errors.push(`Missing generated methodology page: ${methodologyRoutePath}`);
  } else {
    const html = await readFile(methodologyFile, "utf8");
    const label = `${localeKey}:methodology`;
    const copy = methodology.copy[localeKey];
    if (!html.startsWith("<!doctype html>")) errors.push(`${label} has no HTML doctype.`);
    if (!html.includes(`<html class="no-js" lang="${locale.lang}">`)) errors.push(`${label} has the wrong lang attribute.`);
    if (count(html, /<h1\b/g) !== 1) errors.push(`${label} must contain exactly one h1.`);
    if (!html.includes(`<link rel="canonical" href="${new URL(methodologyRoutePath, site.url).href}" />`)) errors.push(`${label} has the wrong canonical URL.`);
    if (!html.includes(`<link rel="author" href="${expectedAuthorRoute}" />`)) errors.push(`${label} has the wrong localized author URL.`);
    const currentMethodologyLanguageLink = new RegExp(
      `<a\\b(?=[^>]*\\bhref="${methodologyRoutePath}")(?=[^>]*\\baria-current="page")[^>]*>`,
      "u",
    );
    if (!currentMethodologyLanguageLink.test(html)) errors.push(`${label} language switch is not on the current route.`);
    if (count(html, /rel="alternate" hreflang=/g) !== localeOrder.length + 1) errors.push(`${label} must expose every language and x-default.`);
    if (!html.includes('hreflang="x-default" href="https://blog.ejupilabs.com/methodology/"')) errors.push(`${label} has the wrong x-default route.`);
    if (!html.includes('href="mailto:info@ejupilabs.com"')) errors.push(`${label} is missing the corrections contact.`);
    if (!html.includes(copy.title)) errors.push(`${label} is missing its localized title.`);
    for (const section of copy.sections) {
      if (!html.includes(`id="${section.id}"`)) errors.push(`${label} is missing ${section.id}.`);
    }
    if (!html.includes('id="main" tabindex="-1"')) errors.push(`${label} main landmark is not focusable.`);
    if (!html.includes(`href="${methodologyRoutePath}"`)) errors.push(`${label} is missing its localized footer link.`);
    assertSocialMetadata(html, label, localeKey);
  }

  const notFoundPath = join(
    dist,
    locale.prefix.replace(/^\//u, ""),
    "404.html",
  );
  if (!(await exists(notFoundPath))) {
    errors.push(`Missing generated 404 page for ${localeKey}.`);
  } else {
    const notFoundHtml = await readFile(notFoundPath, "utf8");
    if (
      /<meta (?:property="og:image"|name="twitter:image")/u.test(notFoundHtml)
    ) {
      errors.push(`${localeKey}:404 must not publish a social sharing image.`);
    }
    if (!notFoundHtml.includes('<meta name="twitter:card" content="summary" />')) {
      errors.push(`${localeKey}:404 must retain the compact Twitter card.`);
    }
  }

  const feedPath = join(dist, locale.prefix.replace(/^\//, ""), "feed.xml");
  if (!(await exists(feedPath))) errors.push(`Missing RSS feed for ${localeKey}.`);
  else {
    const feed = await readFile(feedPath, "utf8");
    if (count(feed, /<item>/g) !== currentLocaleDefinitions.length) {
      errors.push(`RSS feed ${localeKey} must contain ${currentLocaleDefinitions.length} current items.`);
    }
    if (!feed.includes("vector-placement-operations")) {
      errors.push(`RSS feed ${localeKey} must retain VECTOR.`);
    }
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
const binaryExtensions = new Set([
  ".avif",
  ".gif",
  ".ico",
  ".jpeg",
  ".jpg",
  ".mp4",
  ".png",
  ".webm",
  ".webp",
  ".woff",
  ".woff2",
]);
for (const file of files) {
  if (binaryExtensions.has(extname(file).toLowerCase())) continue;

  const contents = await readFile(file, "utf8");
  for (const { hostname, url } of findDisallowedEjupiLabsUrls(contents)) {
    errors.push(
      `${relative(dist, file)} publishes disallowed Ejupi Labs hostname ` +
        `"${hostname}" (${url}).`,
    );
  }
}

const rasterFiles = files.filter((file) => [".png", ".jpg", ".jpeg", ".gif", ".webp", ".avif"].includes(extname(file).toLowerCase()));
const expectedRasterFiles = new Set(
  localeOrder.map((localeKey) =>
    join(dist, "assets", "social", `case-studies-${localeKey}.png`),
  ),
);
const unexpectedRasterFiles = rasterFiles.filter(
  (file) => !expectedRasterFiles.has(file),
);
if (unexpectedRasterFiles.length > 0) {
  errors.push(
    `Only approved social-preview raster assets are allowed: ${unexpectedRasterFiles.join(", ")}`,
  );
}
for (const file of expectedRasterFiles) {
  if (!files.includes(file)) {
    errors.push(`Missing localized social-preview asset: ${file}`);
    continue;
  }
  const dimensions = pngDimensions(await readFile(file));
  if (!dimensions || dimensions.width !== 1200 || dimensions.height !== 630) {
    errors.push(`${file} must be a 1200×630 PNG.`);
  }
}

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

const assetSizes = new Map(
  await Promise.all(
    files.map(async (file) => [file, (await readFile(file)).byteLength]),
  ),
);
const totalBytesFor = (predicate) =>
  [...assetSizes].reduce(
    (total, [file, bytes]) => total + (predicate(file) ? bytes : 0),
    0,
  );
const maximumBytesFor = (predicate) =>
  Math.max(
    0,
    ...[...assetSizes]
      .filter(([file]) => predicate(file))
      .map(([, bytes]) => bytes),
  );
const browserJavaScriptBytes = totalBytesFor(
  (file) => extname(file).toLowerCase() === ".js",
);
const stylesheetBytes = totalBytesFor(
  (file) => extname(file).toLowerCase() === ".css",
);
const fontBytes = totalBytesFor((file) => /\.woff2?$/iu.test(file));
const fontFiles = [...assetSizes].filter(([file]) => /\.woff2?$/iu.test(file));
const maximumHtmlBytes = maximumBytesFor(
  (file) => extname(file).toLowerCase() === ".html",
);
const maximumSearchBytes = maximumBytesFor((file) =>
  /^search\.[a-z]{2}\.[0-9a-f]{12}\.json$/u.test(basename(file)),
);
const maximumSocialPreviewBytes = maximumBytesFor((file) =>
  /[\\/]assets[\\/]social[\\/]case-studies-[a-z]{2}\.png$/u.test(file),
);
const firstLoadBytes =
  browserJavaScriptBytes + stylesheetBytes + fontBytes + maximumHtmlBytes;
// Fonts are the deliberate headroom exception: two complete, locale-safe,
// self-hosted weights avoid third-party requests. The 75 kB cap stays fixed,
// while this exact count/type contract prevents the exception from expanding.
if (
  fontFiles.length !== 2 ||
  fontFiles.some(([file]) => extname(file).toLowerCase() !== ".woff2")
) {
  errors.push(
    "The 75 kB font envelope is reserved for exactly two self-hosted WOFF2 interface weights.",
  );
}
const assetBudgets = [
  ["browser JavaScript", browserJavaScriptBytes, 13_000],
  ["browser CSS", stylesheetBytes, 35_000],
  ["largest HTML document", maximumHtmlBytes, 34_000],
  ["web fonts", fontBytes, 75_000],
  ["largest localized search index", maximumSearchBytes, 105_000],
  ["largest social preview", maximumSocialPreviewBytes, 55_000],
  ["conservative first-load payload", firstLoadBytes, 160_000],
];
for (const [label, actual, budget] of assetBudgets) {
  if (actual > budget) {
    errors.push(`${label} is ${actual} bytes; budget is ${budget}.`);
  }
  if (label !== "web fonts" && actual > Math.floor(budget * 0.9)) {
    errors.push(
      `${label} must retain at least 10% headroom (${actual}/${budget} bytes).`,
    );
  }
}

const sitemap = await readFile(join(dist, "sitemap.xml"), "utf8");
const canonicalPageCount = localeOrder.length * 2 + canonicalArticleCount;
if (count(sitemap, /<url>/g) !== canonicalPageCount) {
  errors.push(`Sitemap must contain ${canonicalPageCount} canonical URLs.`);
}
if (count(sitemap, /hreflang="x-default"/g) !== canonicalPageCount) {
  errors.push("Every sitemap URL needs an x-default alternate.");
}
if (!sitemap.includes("/case-studies/vector-placement-operations/")) {
  errors.push("Sitemap must retain VECTOR.");
}

const headers = (await readFile(join(dist, "_headers"), "utf8")).replace(/\r\n?/gu, "\n");
const expectedDocumentCsp = [
  "default-src 'self'",
  "base-uri 'none'",
  "connect-src 'self'",
  "font-src 'self'",
  "form-action 'none'",
  "frame-ancestors 'none'",
  "frame-src 'none'",
  "img-src 'self'",
  "manifest-src 'self'",
  "media-src 'none'",
  "object-src 'none'",
  "script-src 'self'",
  "script-src-attr 'none'",
  "style-src 'self'",
  "worker-src 'none'",
].join("; ");
const expectedPermissionsPolicy =
  "accelerometer=(), camera=(), display-capture=(), geolocation=(), gyroscope=(), microphone=(), payment=(), usb=()";
if (!headers.includes(`Content-Security-Policy: ${expectedDocumentCsp}`)) {
  errors.push("Static header fallback must match the exact Worker document CSP.");
}
if (!headers.includes(`Permissions-Policy: ${expectedPermissionsPolicy}`)) {
  errors.push("Static header fallback must match the exact Worker Permissions Policy.");
}
for (const [route, language] of [
  ["/", "en"],
  ["/case-studies/*", "en"],
  ["/methodology/", "en"],
  ["/404.html", "en"],
  ["/it/*", "it"],
  ["/de/*", "de"],
  ["/fr/*", "fr"],
]) {
  if (!headers.includes(`${route}\n  Content-Language: ${language}`)) {
    errors.push(`${route} must declare Content-Language: ${language}.`);
  }
}
if (/^\/\*\n(?:  .+\n)*?  Content-Language:/mu.test(headers)) {
  errors.push("The global header rule must not duplicate localized Content-Language values.");
}
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
  ["/assets/fonts/*", "Cache-Control: public, max-age=604800, stale-while-revalidate=86400"],
  ["/assets/brand/*", "Cache-Control: public, max-age=604800, stale-while-revalidate=86400"],
  ["/assets/social/*", "Cache-Control: public, max-age=3600, must-revalidate"],
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
if (!Array.isArray(catalog.cases) || catalog.cases.length !== currentCaseDefinitions.length) {
  errors.push(`Machine-readable catalog must contain ${currentCaseDefinitions.length} current cases.`);
} else {
  for (const definition of currentCaseDefinitions) {
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
    if (definition.kind === "labs") {
      for (const key of ["projectUrl", "sourceState", "sourceRef", "sourceUrl", "verifiedAt"]) {
        if (entry[key] !== definition[key]) {
          errors.push(`Machine-readable catalog has the wrong ${key} for ${definition.slug}.`);
        }
      }
    } else if (
      ["projectUrl", "sourceState", "sourceRef", "sourceUrl", "verifiedAt"].some(
        (key) => entry[key] !== undefined,
      )
    ) {
      errors.push(`Professional catalog entry ${definition.slug} exposes Labs source metadata.`);
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
  if (!catalog.cases.some(({ slug }) => slug === "vector-placement-operations")) {
    errors.push("Machine-readable catalog must retain VECTOR.");
  }
}

const llms = await readFile(join(dist, "llms.txt"), "utf8");
if (!llms.includes(`> ${currentCaseDefinitions.length} documented engineering case studies.`)) {
  errors.push("llms.txt case-study count is not derived from the catalog.");
}
if (!llms.includes(new URL(methodologyRoute("en"), site.url).href)) {
  errors.push("llms.txt is missing the editorial methodology page.");
}
for (const definition of currentCaseDefinitions) {
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
if (!manifest.icons?.some((icon) => icon.src === "/assets/brand/favicon.svg?v=4" && icon.sizes === "any")) {
  errors.push("The web manifest must retain the scalable Ejupi Labs icon.");
}
const faviconSha256 = createHash("sha256")
  .update(await readFile(join(dist, "assets", "brand", "favicon.svg")))
  .digest("hex");
if (faviconSha256 !== CANONICAL_FAVICON_SHA256) {
  errors.push("The blog favicon must be byte-for-byte identical to the canonical Ejupi Labs favicon.");
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
    `Validated ${files.length} files, ${canonicalPageCount} canonical pages, ${localeOrder.length} locales and ${caseDefinitions.length} case-study routes. Asset budgets: first load ${firstLoadBytes}/160000 bytes; JS ${browserJavaScriptBytes}/13000; CSS ${stylesheetBytes}/35000.`,
  );
}
