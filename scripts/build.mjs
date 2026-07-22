import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { caseDefinitions, localeOrder, locales, site } from "../src/content.mjs";

const root = resolve(import.meta.dirname, "..");
const outputRoot = join(root, "dist");
const sourceRoot = join(root, "site");

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const escapeXml = escapeHtml;
const absolute = (pathname) => new URL(pathname, site.url).href;

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

function feedRoute(localeKey) {
  return `${locales[localeKey].prefix}/feed.xml` || "/feed.xml";
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

function alternates(slug) {
  return localeOrder
    .map((localeKey) => {
      const href = absolute(routeFor(localeKey, slug));
      return `<link rel="alternate" hreflang="${localeKey}" href="${href}" />`;
    })
    .concat(`<link rel="alternate" hreflang="x-default" href="${absolute(routeFor("en", slug))}" />`)
    .join("\n    ");
}

function pageHead({ localeKey, title, description, slug = null, type = "website", noIndex = false }) {
  const locale = locales[localeKey];
  const canonical = absolute(routeFor(localeKey, slug));
  const pageTitle = title === site.name ? title : `${title} — ${site.name}`;

  return `<!doctype html>
<html class="no-js" lang="${locale.lang}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(pageTitle)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="author" content="${escapeHtml(site.author)}" />
  <meta name="theme-color" content="#f4f1ea" />
  ${noIndex ? '<meta name="robots" content="noindex,follow" />' : ""}
  <link rel="canonical" href="${canonical}" />
  ${alternates(slug)}
  <link rel="alternate" type="application/rss+xml" title="${escapeHtml(site.name)} — ${escapeHtml(locale.ui.home)}" href="${absolute(feedRoute(localeKey))}" />
  <link rel="icon" href="/assets/brand/favicon.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="/assets/styles.css" />
  <script src="/assets/client.js" type="module"></script>
  <meta property="og:site_name" content="${escapeHtml(site.name)}" />
  <meta property="og:type" content="${type}" />
  <meta property="og:title" content="${escapeHtml(pageTitle)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:locale" content="${locale.locale}" />
  <meta name="twitter:card" content="summary" />
  ${type === "article" ? `<meta property="article:published_time" content="${site.published}" />` : ""}
</head>`;
}

function languageList(localeKey, slug) {
  const locale = locales[localeKey];
  return `<ul class="language-list" aria-label="${escapeHtml(locale.ui.languages)}">
    ${localeOrder
      .map((key) => {
        const item = locales[key];
        return `<li><a href="${routeFor(key, slug)}" lang="${item.lang}" hreflang="${item.lang}"${key === localeKey ? ' aria-current="page"' : ""}>${item.label}</a></li>`;
      })
      .join("\n    ")}
  </ul>`;
}

function header(localeKey, slug, onIndex = false) {
  const locale = locales[localeKey];
  const homeRoute = routeFor(localeKey, null);
  return `<a class="skip-link" href="#main">${escapeHtml(locale.ui.skip)}</a>
<div class="reading-progress" data-reading-progress aria-hidden="true"></div>
<header class="site-header">
  <div class="header-inner shell">
    <a class="brand" href="${homeRoute}" aria-label="${escapeHtml(site.name)} — ${escapeHtml(locale.ui.home)}">
      <img src="/assets/brand/ejupi-labs-primary-carbon.svg" width="958" height="295" alt="Ejupi Labs" />
      <span class="brand-label">Case<br />Studies</span>
    </a>
    <nav class="site-nav" id="site-navigation" aria-label="${escapeHtml(locale.ui.navigation)}" data-menu data-open="false">
      <a href="${homeRoute}"${onIndex ? ' aria-current="page"' : ""}>${escapeHtml(locale.ui.allWork)}</a>
      <a href="${site.portfolioUrl}">${escapeHtml(locale.ui.portfolio)}</a>
      <a href="${site.portfolioUrl}/#contact">${escapeHtml(locale.ui.contact)}</a>
      ${languageList(localeKey, slug)}
    </nav>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-navigation" aria-label="${escapeHtml(locale.ui.menuOpen)}" data-menu-toggle data-open-label="${escapeHtml(locale.ui.menuOpen)}" data-close-label="${escapeHtml(locale.ui.menuClose)}"><span aria-hidden="true"></span></button>
  </div>
</header>`;
}

function footer(localeKey) {
  const locale = locales[localeKey];
  return `<footer class="site-footer">
  <div class="site-footer__inner shell">
    <div class="site-footer__brand">
      <img src="/assets/brand/ejupi-labs-primary-on-carbon.svg" width="958" height="295" alt="Ejupi Labs" loading="lazy" />
      <p>${escapeHtml(locale.ui.footerLine)}</p>
    </div>
    <div class="site-footer__links">
      <nav aria-label="${escapeHtml(locale.ui.navigation)}">
        <a href="${routeFor(localeKey, null)}">${escapeHtml(locale.ui.allWork)}</a>
        <a href="${site.portfolioUrl}">${escapeHtml(locale.ui.portfolio)}</a>
        <a href="${site.portfolioUrl}/#contact">${escapeHtml(locale.ui.contact)}</a>
        <a href="${feedRoute(localeKey)}">RSS</a>
      </nav>
      <p class="site-footer__meta">© ${new Date(site.published).getUTCFullYear()} ${site.name}. ${escapeHtml(locale.ui.rights)}</p>
    </div>
  </div>
</footer>`;
}

function caseCard(localeKey, definition) {
  const locale = locales[localeKey];
  const study = locale.cases[definition.slug];
  return `<article class="case-card" itemscope itemtype="https://schema.org/Article">
  <div class="case-card__rail">
    <span class="card-number">CASE / ${definition.number}</span>
    <div class="card-schematic" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
    <span class="meta-line">${escapeHtml(study.category)}</span>
  </div>
  <div class="case-card__body">
    <div>
      <div class="case-card__meta meta-line"><span>${escapeHtml(locale.ui.articleLabel)}</span><span>${study.readMinutes} ${escapeHtml(locale.ui.readTime)}</span></div>
      <h2 itemprop="headline">${heading(study.cardTitle)}</h2>
      <p class="case-card__summary" itemprop="description">${escapeHtml(study.summary)}</p>
    </div>
    <div class="case-card__foot">
      <div class="tag-list" aria-label="${escapeHtml(locale.ui.stack)}">${definition.stack.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
      <a class="text-link" href="${routeFor(localeKey, definition.slug)}" itemprop="url">${escapeHtml(locale.ui.readCase)} <span aria-hidden="true">↗</span></a>
    </div>
  </div>
</article>`;
}

function indexPage(localeKey) {
  const locale = locales[localeKey];
  const register = caseDefinitions
    .map((definition) => `<div class="register-node"><span>${definition.number}</span><strong>${escapeHtml(locale.cases[definition.slug].cardTitle)}</strong></div>`)
    .join("");
  const principles = locale.index.principles
    .map((principle) => `<article class="principle"><span>${principle.number}</span><h3>${escapeHtml(principle.title)}</h3><p>${escapeHtml(principle.body)}</p></article>`)
    .join("");

  return `${pageHead({ localeKey, title: locale.ui.home, description: locale.index.description })}
<body>
${header(localeKey, null, true)}
<main id="main" itemscope itemtype="https://schema.org/Blog">
  <section class="index-hero">
    <div class="index-hero__copy">
      <span class="eyebrow">${escapeHtml(locale.index.eyebrow)}</span>
      <div>
        <h1 itemprop="name">${heading(locale.index.title)}</h1>
        <p class="index-hero__lead" itemprop="description">${escapeHtml(locale.index.description)}</p>
      </div>
    </div>
    <aside class="index-register" aria-label="${escapeHtml(locale.ui.allWork)}">
      <div class="index-register__head"><span>INDEX</span><span>01—03</span></div>
      <div class="index-register__map">${register}</div>
      <div class="index-register__foot"><span>SWITZERLAND</span><span>2026</span></div>
    </aside>
  </section>
  <section class="intro-section shell" aria-labelledby="intro-title">
    <div class="intro-grid">
      <span class="section-label">00 / NOTE</span>
      <div class="intro-grid__body">
        <h2 id="intro-title">${heading(locale.index.introTitle)}</h2>
        <p>${escapeHtml(locale.index.introBody)}</p>
        <div class="principle-grid">${principles}</div>
      </div>
    </div>
  </section>
  <section class="case-index shell" aria-labelledby="case-index-title">
    <div class="case-index__head"><span class="section-label" id="case-index-title">${escapeHtml(locale.ui.allWork)}</span><span class="section-label">01—03</span></div>
    <div class="case-list">${caseDefinitions.map((definition) => caseCard(localeKey, definition)).join("")}</div>
  </section>
  <section class="site-cta">
    <div class="site-cta__copy">
      <h2>${heading(locale.index.ctaTitle)}</h2>
      <p>${escapeHtml(locale.index.ctaBody)}</p>
    </div>
    <div class="site-cta__action"><a href="${site.portfolioUrl}/#contact">${escapeHtml(locale.ui.contact)} <span aria-hidden="true">↗</span></a></div>
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

function architectureSvg(type, labels, accessibleLabel) {
  const titleId = `architecture-${type}-title`;
  const marker = `<defs><marker id="arrow-${type}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#e97a4a" /></marker></defs>`;
  const frame = `<rect x="1" y="1" width="1198" height="448" fill="#0e1111" stroke="#59605d" /><path d="M40 62H1160M40 388H1160" stroke="#59605d" stroke-width="1" /><text x="40" y="40" fill="#9ca39f" font-family="ui-monospace, monospace" font-size="14" letter-spacing="2">SYSTEM VIEW / ${type.toUpperCase()}</text>`;

  let drawing = "";
  if (type === "erp") {
    const ys = [88, 162, 236, 310];
    drawing = labels.slice(0, 4).map((label, index) => `<rect x="90" y="${ys[index]}" width="430" height="54" fill="none" stroke="${index === 1 ? "#e97a4a" : "#f4f1ea"}" /><text x="305" y="${ys[index] + 33}" text-anchor="middle" fill="#f4f1ea" font-family="ui-monospace, monospace" font-size="16" letter-spacing="1">${escapeHtml(label)}</text>${index < 3 ? `<path d="M305 ${ys[index] + 54}V${ys[index + 1]}" stroke="#e97a4a" marker-end="url(#arrow-${type})" />` : ""}`).join("");
    drawing += `<rect x="760" y="150" width="350" height="160" fill="#b74d2c" stroke="#f4f1ea" />${svgLabel(labels[4], 935, 225)}<path d="M520 189H760M520 263H760" stroke="#e97a4a" marker-end="url(#arrow-${type})" /><path d="M760 282H560V337H520" fill="none" stroke="#59605d" stroke-dasharray="7 7" />`;
  } else {
    const xs = [38, 270, 502, 734, 966];
    drawing = xs.map((x, index) => `<rect x="${x}" y="166" width="196" height="96" fill="${index === 2 ? "#b74d2c" : "none"}" stroke="${index === 2 ? "#e97a4a" : "#f4f1ea"}" />${svgLabel(labels[index], x + 98, 211)}${index < 4 ? `<path d="M${x + 196} 214H${xs[index + 1] - 10}" stroke="#e97a4a" marker-end="url(#arrow-${type})" />` : ""}`).join("");
    if (type === "workflow") {
      drawing += `<path d="M1064 262V330H136V276" fill="none" stroke="#59605d" stroke-dasharray="8 8" marker-end="url(#arrow-${type})" /><text x="600" y="354" text-anchor="middle" fill="#9ca39f" font-family="ui-monospace, monospace" font-size="13" letter-spacing="2">PROCESS STATE RETURNS TO THE OPERATOR VIEW</text>`;
    } else {
      drawing += `<path d="M136 130V112H1064V130" fill="none" stroke="#59605d" stroke-dasharray="8 8" /><text x="600" y="100" text-anchor="middle" fill="#9ca39f" font-family="ui-monospace, monospace" font-size="13" letter-spacing="2">VERSIONED DELIVERY PATH</text>`;
    }
  }

  return `<svg viewBox="0 0 1200 450" role="img" aria-labelledby="${titleId}" xmlns="http://www.w3.org/2000/svg"><title id="${titleId}">${escapeHtml(accessibleLabel)}</title>${marker}${frame}${drawing}<rect x="1134" y="405" width="26" height="26" fill="#e97a4a" /></svg>`;
}

function paragraphs(values) {
  return values.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
}

function articlePage(localeKey, definition, index) {
  const locale = locales[localeKey];
  const study = locale.cases[definition.slug];
  const sectionEntries = [
    ["starting-point", study.starting.title],
    ["constraints", study.constraints.title],
    ["diagnosis", study.diagnosis.title],
    ["architecture", study.architecture.title],
    ["decisions", study.decisions.title],
    ["delivery", study.delivery.title],
    ["result", study.result.title],
  ];
  const toc = sectionEntries.map(([id, title], itemIndex) => `<li><a href="#${id}" data-toc-link><span>${String(itemIndex + 1).padStart(2, "0")}</span><span>${escapeHtml(title)}</span></a></li>`).join("");
  const facts = study.facts.map(([term, detail]) => `<div class="fact"><dt>${escapeHtml(term)}</dt><dd>${escapeHtml(detail)}</dd></div>`).join("");
  const constraints = study.constraints.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  const decisions = study.decisions.items.map((decision, itemIndex) => `<article class="decision"><span class="decision-number">D${String(itemIndex + 1).padStart(2, "0")}</span><h3>${escapeHtml(decision.title)}</h3><p>${escapeHtml(decision.body)}</p><p class="decision-tradeoff">${escapeHtml(decision.tradeoff)}</p></article>`).join("");
  const nextDefinition = caseDefinitions[(index + 1) % caseDefinitions.length];
  const nextStudy = locale.cases[nextDefinition.slug];
  const formattedDate = new Intl.DateTimeFormat(`${locale.lang}-CH`, { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${site.published}T12:00:00Z`));

  return `${pageHead({ localeKey, title: study.title, description: study.summary, slug: definition.slug, type: "article" })}
<body>
${header(localeKey, definition.slug)}
<main id="main">
  <article itemscope itemtype="https://schema.org/Article">
    <meta itemprop="datePublished" content="${site.published}" />
    <meta itemprop="author" content="${escapeHtml(site.author)}" />
    <header class="article-hero">
      <div class="article-hero__inner shell">
        <div class="article-hero__copy">
          <span class="article-kicker eyebrow">${escapeHtml(locale.ui.articleLabel)} / ${definition.number}</span>
          <h1 itemprop="headline">${heading(study.title)}</h1>
          <p class="article-hero__summary" itemprop="description">${escapeHtml(study.summary)}</p>
        </div>
        <dl class="article-hero__facts">${facts}</dl>
      </div>
    </header>
    <div class="article-meta-bar shell">
      <div class="article-meta-bar__group"><span>${escapeHtml(locale.ui.published)} ${escapeHtml(formattedDate)}</span><span>${study.readMinutes} ${escapeHtml(locale.ui.readTime)}</span></div>
      <div class="tag-list" aria-label="${escapeHtml(locale.ui.stack)}">${definition.stack.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
    </div>
    <div class="case-layout shell">
      <aside class="case-toc"><span class="toc-title">${escapeHtml(locale.ui.contents)}</span><ol>${toc}</ol></aside>
      <div class="article-body" itemprop="articleBody">
        <section class="story-section" id="starting-point" data-story-section><h2>${heading(study.starting.title)}</h2>${paragraphs(study.starting.paragraphs)}</section>
        <section class="story-section" id="constraints" data-story-section><h2>${heading(study.constraints.title)}</h2><p>${escapeHtml(study.constraints.intro)}</p><ol class="constraint-list">${constraints}</ol></section>
        <section class="story-section" id="diagnosis" data-story-section><h2>${heading(study.diagnosis.title)}</h2>${paragraphs(study.diagnosis.paragraphs)}</section>
        <section class="story-section architecture-section" id="architecture" data-story-section><h2>${heading(study.architecture.title)}</h2><p>${escapeHtml(study.architecture.intro)}</p><figure class="architecture-frame">${architectureSvg(definition.diagram, study.architecture.labels, `${study.architecture.title}. ${study.architecture.caption}`)}<figcaption>${escapeHtml(study.architecture.caption)}</figcaption></figure></section>
        <section class="story-section architecture-section" id="decisions" data-story-section><h2>${heading(study.decisions.title)}</h2><p>${escapeHtml(study.decisions.intro)}</p><div class="decision-grid">${decisions}</div></section>
        <section class="story-section" id="delivery" data-story-section><h2>${heading(study.delivery.title)}</h2>${paragraphs(study.delivery.paragraphs)}</section>
        <section class="story-section" id="result" data-story-section><h2>${heading(study.result.title)}</h2>${paragraphs(study.result.paragraphs)}</section>
        <aside class="scope-note"><strong>${escapeHtml(locale.ui.sourceNote)}</strong><p>${escapeHtml(study.scope)}</p></aside>
      </div>
    </div>
    <nav class="article-next shell" aria-label="${escapeHtml(locale.ui.next)}"><div><span class="section-label">${escapeHtml(locale.ui.next)} / ${nextDefinition.number}</span><h2>${heading(nextStudy.cardTitle)}</h2></div><a href="${routeFor(localeKey, nextDefinition.slug)}" aria-label="${escapeHtml(locale.ui.next)}: ${escapeHtml(nextStudy.cardTitle)}">↗</a></nav>
  </article>
  <section class="site-cta">
    <div class="site-cta__copy"><h2>${heading(locale.index.ctaTitle)}</h2><p>${escapeHtml(locale.index.ctaBody)}</p></div>
    <div class="site-cta__action"><a href="${site.portfolioUrl}/#contact">${escapeHtml(locale.ui.contact)} <span aria-hidden="true">↗</span></a></div>
  </section>
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
<main class="not-found shell" id="main"><span class="not-found__code">ERROR / 404</span><h1>${escapeHtml(locale.ui.notFoundTitle)}</h1><p>${escapeHtml(locale.ui.notFoundBody)}</p><a class="text-link" href="${routeFor(localeKey, null)}">${escapeHtml(locale.ui.notFoundAction)} <span aria-hidden="true">→</span></a></main>
${footer(localeKey)}
</body>
</html>`;
}

function rss(localeKey) {
  const locale = locales[localeKey];
  const items = caseDefinitions.map((definition) => {
    const study = locale.cases[definition.slug];
    const url = absolute(routeFor(localeKey, definition.slug));
    return `<item><title>${escapeXml(study.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${escapeXml(study.summary)}</description><pubDate>${new Date(`${site.published}T12:00:00Z`).toUTCString()}</pubDate></item>`;
  }).join("");
  return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${escapeXml(site.name)} — ${escapeXml(locale.ui.home)}</title><link>${absolute(routeFor(localeKey, null))}</link><description>${escapeXml(locale.index.description)}</description><language>${locale.lang}</language><lastBuildDate>${new Date(`${site.published}T12:00:00Z`).toUTCString()}</lastBuildDate><atom:link href="${absolute(feedRoute(localeKey))}" rel="self" type="application/rss+xml" />${items}</channel></rss>`;
}

function sitemap() {
  const pages = [null, ...caseDefinitions.map((definition) => definition.slug)];
  const urls = pages.flatMap((slug) => localeOrder.map((localeKey) => {
    const route = routeFor(localeKey, slug);
    const links = localeOrder.map((alternateLocale) => `<xhtml:link rel="alternate" hreflang="${alternateLocale}" href="${absolute(routeFor(alternateLocale, slug))}" />`).join("");
    return `<url><loc>${absolute(route)}</loc><lastmod>${site.published}</lastmod>${links}<xhtml:link rel="alternate" hreflang="x-default" href="${absolute(routeFor("en", slug))}" /></url>`;
  }));
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>`;
}

function llmsText() {
  const studies = caseDefinitions.map((definition) => {
    const study = locales.en.cases[definition.slug];
    return `- [${study.title}](${absolute(routeFor("en", definition.slug))}): ${study.summary}`;
  }).join("\n");
  return `# ${site.name} Case Studies\n\n> Evidence-bound accounts of selected engineering work. Client names, commercial details and unsupported metrics are intentionally omitted.\n\n## Case studies\n\n${studies}\n\n## Languages\n\n- [English](${absolute("/")})\n- [Italiano](${absolute("/it/")})\n- [Deutsch](${absolute("/de/")})\n- [Français](${absolute("/fr/")})\n\n## Main studio\n\n- [Ejupi Labs](${site.portfolioUrl})\n`;
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(join(outputRoot, "assets"), { recursive: true });
await cp(join(sourceRoot, "assets"), join(outputRoot, "assets"), { recursive: true });
await cp(join(sourceRoot, "_headers"), join(outputRoot, "_headers"));
await cp(join(root, "src", "styles.css"), join(outputRoot, "assets", "styles.css"));
await cp(join(root, "src", "client.js"), join(outputRoot, "assets", "client.js"));

for (const localeKey of localeOrder) {
  const locale = locales[localeKey];
  await mkdir(dirname(outputPath(routeFor(localeKey, null))), { recursive: true });
  await writeFile(outputPath(routeFor(localeKey, null)), indexPage(localeKey), "utf8");
  await write(`${locale.prefix.replace(/^\//, "")}${locale.prefix ? "/" : ""}404.html`, notFoundPage(localeKey));
  await write(feedRoute(localeKey).replace(/^\//, ""), rss(localeKey));
  for (const [index, definition] of caseDefinitions.entries()) {
    const target = outputPath(routeFor(localeKey, definition.slug));
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, articlePage(localeKey, definition, index), "utf8");
  }
}

await write("sitemap.xml", sitemap());
await write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${absolute("/sitemap.xml")}\n`);
await write("llms.txt", llmsText());
await write("site.webmanifest", `${JSON.stringify({ name: `${site.name} — Case Studies`, short_name: "Ejupi Labs", start_url: "/", display: "standalone", background_color: "#f4f1ea", theme_color: "#f4f1ea", icons: [{ src: "/assets/brand/favicon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }] }, null, 2)}\n`);

const sourceHeaders = await readFile(join(sourceRoot, "_headers"), "utf8");
if (!sourceHeaders.includes("Content-Security-Policy")) throw new Error("Security headers are missing.");

console.log(`Built ${localeOrder.length * (caseDefinitions.length + 2) + 4} public files in ${outputRoot}`);
