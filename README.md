# Ejupi Labs Case Studies

The editorial site for [blog.ejupilabs.com](https://blog.ejupilabs.com). It presents three anonymised engineering case studies in English, Italian, German and French.

The site is intentionally static. A small Node.js generator builds every route ahead of time, and Cloudflare Workers Static Assets serves the result from the custom domain without invoking Worker code for normal page requests.

## Published routes

- `/case-studies/ai-workflow-cloud-migration/`
- `/case-studies/archival-workflow-management/`
- `/case-studies/retail-erp-evolution/`
- Localised equivalents under `/it/`, `/de/` and `/fr/`

English is the canonical default at the root. Every page includes canonical URLs, reciprocal `hreflang` links and an `x-default` reference. The build also creates four RSS feeds, a multilingual sitemap, `robots.txt`, `llms.txt`, local font assets and nearest-match 404 pages.

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
npm run check      # full test suite plus a Cloudflare deployment dry-run
```

## Project structure

```text
src/content.mjs     Localised editorial source
src/styles.css      Shared visual system
src/client.js       Mobile navigation, reading progress and section state
scripts/build.mjs   Static-site generator
scripts/validate.mjs Build and SEO validator
site/assets/        Local fonts and Ejupi Labs SVG brand assets
site/_headers       Cloudflare security and cache headers
test/               Content, navigation and generated-route tests
wrangler.jsonc      Assets-only Worker and custom-domain configuration
```

## Content rules

The case studies describe engineering decisions that are supported by the source portfolio. They do not invent client names, industries, metrics, dates, team sizes or commercial outcomes. Each article states its evidence boundary directly.

## Deployment

The production hostname is declared as a Cloudflare Custom Domain in `wrangler.jsonc`. After the quality checks pass and Cloudflare authentication is available:

```bash
npm run deploy
```

`workers_dev` and preview URLs are disabled so the custom domain remains the only public production origin.

## Licensing

The source code is available under the [MIT License](LICENSE).

The Ejupi Labs name, logos and published case-study text are brand and editorial content. They remain copyright © 2026 Ejupi Labs and are not granted under the MIT License.
