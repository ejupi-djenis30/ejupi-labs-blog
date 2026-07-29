# Ejupi Labs Case Studies

The editorial site for [blog.ejupilabs.com](https://blog.ejupilabs.com). It publishes multilingual engineering case studies in English, Italian, German and French, spanning anonymised professional systems and open-source Ejupi Labs projects.

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
- `/case-studies/jdoor-security-lab/`
- Localised equivalents under `/it/`, `/de/` and `/fr/`

English is the canonical default at the root. Every canonical page includes canonical URLs, reciprocal `hreflang` links, an `x-default` reference, structured Blog or BlogPosting data and a locale-matched 1200×630 social preview. The build also creates four RSS feeds, a multilingual sitemap, localised OpenSearch descriptors, `robots.txt`, `llms.txt`, the machine-readable `/case-studies.json` catalog, local font assets and nearest-match 404 pages.

The search-only archive works with keyboard and touch input, preserves the query in the URL and leaves the complete archive visible when JavaScript is unavailable. The full-text index is generated from each complete article and loaded only after a visitor starts a search.

## Local development

Requirements: Node.js 22 or newer.

```bash
npm ci
npm run dev
```

Useful commands:

```bash
npm run build      # generate dist/
npm run generate:social # regenerate the reviewed social-preview SVG and PNG assets
npm run validate   # validate routes, SEO, localisation and asset policy
npm run new:case -- --slug example-case # create an unpublished four-language draft
npm test           # build, validate and run Node tests
npm run test:e2e   # exercise mobile navigation and responsive state in Chromium
npm run check      # full test suite plus a Cloudflare deployment dry-run
```

## Project structure

```text
src/content.mjs     Localised professional editorial source and route registry
src/content-contract.mjs Publication schema and fail-closed localisation checks
src/labs-content.mjs English Labs case studies
src/labs-locales.mjs Italian, German and French Labs case studies
src/editorial.mjs   Localised archive, search and filter labels
src/styles.css      Shared visual system
src/client.js       Archive search, mobile navigation, reading progress and section state
scripts/build.mjs   Static-site generator
scripts/validate.mjs Build and SEO validator
scripts/generate-social-previews.mjs Deterministic localised social-preview generator
scripts/new-case.mjs Safe unpublished case-study scaffold
site/assets/        Local fonts, Ejupi Labs brand assets and social previews
site/_headers       Cloudflare security and cache headers
test/               Content, navigation and generated-route tests
e2e/                Browser-level keyboard, focus, scroll and resize checks
wrangler.jsonc      Assets-only Worker and custom-domain configuration
```

## Content rules

The case studies describe engineering decisions supported by the source portfolio or checked repository evidence. Each one separates the selected technical boundary, why it fit the actual constraints, the strongest credible alternative and the cost deliberately accepted. These comparisons are contextual rather than universal technology rankings. The articles do not invent client names, team sizes or commercial outcomes. Approximate delivery windows and project measurements appear only where a source record supports them. Every Labs article includes an evidence ledger and an explicit limitation; every article states its evidence boundary.

`npm run new:case` writes only to `drafts/`. Production does not read that directory. Publishing remains an explicit review step: add the approved definition and all four complete locale copies to the source catalog, then run the full checks.

## Deployment

The production hostname is declared as a Cloudflare Custom Domain in `wrangler.jsonc`. After the quality checks pass and Cloudflare authentication is available:

```bash
npm run deploy
```

The deploy lifecycle first checks every Labs commit against GitHub. Entries marked
`release` must also have a tag that resolves to that exact commit and a published,
non-draft, non-prerelease Release. Entries marked `snapshot` stop at the immutable
commit check. `GH_TOKEN` or `GITHUB_TOKEN` is optional, but a dedicated read-only
token avoids the low anonymous API rate limit. Ordinary `test` and `check` runs
mock this boundary and never contact GitHub.

`workers_dev` and preview URLs are disabled so the custom domain remains the only public production origin.

## Licensing

The source code is available under the [MIT License](LICENSE).

The Ejupi Labs name, logos and published case-study text are brand and editorial content. They remain copyright © 2026 Ejupi Labs and are not granted under the MIT License.
