# Ejupi Labs Case Studies

The editorial site for [blog.ejupilabs.com](https://blog.ejupilabs.com). It publishes nine engineering case studies in English, Italian, German and French: three anonymised professional systems and six open-source Ejupi Labs projects.

The site is intentionally static. A small Node.js generator builds every route, search surface, feed and metadata record ahead of time. Cloudflare Workers Static Assets serves the result from the custom domain without invoking Worker code for normal page requests.

## Published routes

- `/case-studies/ai-workflow-cloud-migration/`
- `/case-studies/archival-workflow-management/`
- `/case-studies/retail-erp-evolution/`
- `/case-studies/careeros-local/`
- `/case-studies/eliza-lab/`
- `/case-studies/djenis-ai-agent/`
- `/case-studies/dig-gopher-explorer/`
- `/case-studies/integradraw/`
- `/case-studies/vector-placement-operations/`
- Localised equivalents under `/it/`, `/de/` and `/fr/`

English is the canonical default at the root. Every page includes canonical URLs, reciprocal `hreflang` links, an `x-default` reference and structured Blog or BlogPosting data. The build also creates four RSS feeds, a multilingual sitemap, an OpenSearch descriptor, `robots.txt`, `llms.txt`, local font assets and nearest-match 404 pages.

The archive search and taxonomy filters run in the browser over the content already present in the document. They make no request, work with keyboard and touch input, preserve filter state in the URL and leave the complete archive visible when JavaScript is unavailable.

## Local development

Requirements: Node.js 22 or newer.

```bash
npm ci
npm run dev
```

Useful commands:

```bash
npm run build      # generate dist/
npm run validate   # validate routes, SEO, localisation and asset policy
npm test           # build, validate and run Node tests
npm run test:e2e   # exercise mobile navigation and responsive state in Chromium
npm run check      # full test suite plus a Cloudflare deployment dry-run
```

## Project structure

```text
src/content.mjs     Localised professional editorial source and route registry
src/labs-content.mjs English Labs case studies
src/labs-locales.mjs Italian, German and French Labs case studies
src/editorial.mjs   Localised archive, search and filter labels
src/styles.css      Shared visual system
src/client.js       Archive search, mobile navigation, reading progress and section state
scripts/build.mjs   Static-site generator
scripts/validate.mjs Build and SEO validator
site/assets/        Local fonts and Ejupi Labs SVG brand assets
site/_headers       Cloudflare security and cache headers
test/               Content, navigation and generated-route tests
e2e/                Browser-level keyboard, focus, scroll and resize checks
wrangler.jsonc      Assets-only Worker and custom-domain configuration
```

## Content rules

The case studies describe engineering decisions supported by the source portfolio or checked repository evidence. They do not invent client names, team sizes or commercial outcomes. Approximate delivery windows and project measurements appear only where a source record supports them. Every Labs article includes an evidence ledger and an explicit limitation; every article states its evidence boundary.

## Deployment

The production hostname is declared as a Cloudflare Custom Domain in `wrangler.jsonc`. After the quality checks pass and Cloudflare authentication is available:

```bash
npm run deploy
```

`workers_dev` and preview URLs are disabled so the custom domain remains the only public production origin.

## Licensing

The source code is available under the [MIT License](LICENSE).

The Ejupi Labs name, logos and published case-study text are brand and editorial content. They remain copyright © 2026 Ejupi Labs and are not granted under the MIT License.
