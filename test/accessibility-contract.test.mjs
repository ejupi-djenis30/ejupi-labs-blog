import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const stylesheet = await readFile(
  new URL("../src/styles.css", import.meta.url),
  "utf8",
);

function blockFor(selector) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
  const match = stylesheet.match(
    new RegExp(`${escapedSelector}\\s*\\{(?<body>[^}]+)\\}`, "u"),
  );
  assert.ok(match, `Missing CSS block for ${selector}`);
  return match.groups.body;
}

function declarations(block) {
  return new Map(
    [...block.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/gu)].map((match) => [
      match[1],
      match[2].trim(),
    ]),
  );
}

const rootTokens = declarations(blockFor(":root"));

test("critical interface fonts avoid late swaps after their preload window", () => {
  const fontFaces = [...stylesheet.matchAll(/@font-face\s*\{(?<body>[\s\S]*?)\}/gu)];
  assert.equal(fontFaces.length, 2);
  for (const fontFace of fontFaces) {
    assert.match(fontFace.groups.body, /font-display:\s*optional;/u);
  }
});

function resolveColor(value, seen = new Set()) {
  const variable = value.match(/^var\((--[\w-]+)\)$/u)?.[1];
  if (!variable) {
    assert.match(value, /^#[0-9a-f]{6}$/iu, `Unsupported color token: ${value}`);
    return value;
  }
  assert.ok(!seen.has(variable), `Circular CSS variable reference: ${variable}`);
  const next = rootTokens.get(variable);
  assert.ok(next, `Missing root color token: ${variable}`);
  return resolveColor(next, new Set([...seen, variable]));
}

function luminance(color) {
  const channels = color
    .slice(1)
    .match(/.{2}/gu)
    .map((channel) => Number.parseInt(channel, 16) / 255)
    .map((channel) =>
      channel <= 0.04045
        ? channel / 12.92
        : ((channel + 0.055) / 1.055) ** 2.4,
    );
  return (
    channels[0] * 0.2126 +
    channels[1] * 0.7152 +
    channels[2] * 0.0722
  );
}

function contrastRatio(first, second) {
  const firstLuminance = luminance(first);
  const secondLuminance = luminance(second);
  return (
    (Math.max(firstLuminance, secondLuminance) + 0.05) /
    (Math.min(firstLuminance, secondLuminance) + 0.05)
  );
}

function mix(first, second, firstWeight) {
  const toChannels = (color) =>
    color
      .slice(1)
      .match(/.{2}/gu)
      .map((channel) => Number.parseInt(channel, 16));
  const firstChannels = toChannels(first);
  const secondChannels = toChannels(second);
  return `#${firstChannels
    .map((channel, index) =>
      Math.round(
        channel * firstWeight + secondChannels[index] * (1 - firstWeight),
      )
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;
}

test("the editorial case-card palette keeps normal text at WCAG AA contrast", () => {
  const palette = declarations(blockFor(".case-card"));
  const background = resolveColor(palette.get("--card-bg"));

  for (const token of ["--card-fg", "--card-muted"]) {
    const foreground = resolveColor(palette.get(token));
    assert.ok(
      contrastRatio(foreground, background) >= 4.5,
      `${token} contrast is below 4.5:1`,
    );
  }
});

test("article oxide surfaces keep copy and focus indicators above contrast thresholds", () => {
  const oxide = resolveColor("var(--oxide)");
  const oxideText = resolveColor("var(--oxide-text)");
  const paper = resolveColor("var(--paper)");
  const scopeBackground = mix(oxide, paper, 0.06);

  assert.ok(
    contrastRatio(oxideText, scopeBackground) >= 4.5,
    "scope-note label contrast is below 4.5:1",
  );
  assert.ok(
    contrastRatio(paper, oxide) >= 4.5,
    "oxide CTA copy contrast is below 4.5:1",
  );
  assert.match(
    blockFor(".site-cta p"),
    /color:\s*var\(--paper\);/u,
  );
  assert.match(
    blockFor(".site-cta__action a:focus-visible"),
    /outline-color:\s*var\(--paper\);/u,
  );
  assert.match(
    blockFor(".scope-note strong"),
    /color:\s*var\(--oxide-text\);/u,
  );
});

test("forced-colors mode preserves focus, progress and content boundaries", () => {
  const start = stylesheet.indexOf("@media (forced-colors: active)");
  const end = stylesheet.indexOf("@media (prefers-reduced-motion: reduce)", start);

  assert.notEqual(start, -1, "Missing the forced-colors media query.");
  assert.ok(end > start, "The forced-colors media query must be self-contained.");

  const contract = stylesheet.slice(start, end);
  assert.match(contract, /forced-color-adjust:\s*auto/u);
  assert.match(contract, /:focus-visible\s*\{[\s\S]*?outline:\s*3px solid Highlight/u);
  assert.match(
    contract,
    /\.reading-progress\s*\{[\s\S]*?forced-color-adjust:\s*none/u,
  );
  assert.match(contract, /background:\s*Canvas/u);
  assert.match(contract, /border-color:\s*CanvasText/u);
  assert.match(contract, /background:\s*Highlight/u);
  assert.match(contract, /color:\s*LinkText/u);
  assert.doesNotMatch(
    contract,
    /\.title-stop\s*\{[^}]*background:\s*Highlight/gu,
  );
  assert.match(contract, /text-decoration-thickness:\s*2px/u);
});

test("font-relative breakpoints and complete summaries support resized text", () => {
  assert.match(stylesheet, /:root\s*\{[\s\S]*?font-synthesis:\s*none/u);
  assert.match(stylesheet, /h1,\s*h2,\s*h3\s*\{[\s\S]*?text-wrap:\s*balance/u);
  assert.match(stylesheet, /p,\s*li\s*\{[\s\S]*?text-wrap:\s*pretty/u);
  assert.match(
    stylesheet,
    /\.eyebrow,[\s\S]*?font-variant-numeric:\s*tabular-nums/u,
  );
  for (const breakpoint of ["65.625em", "51.25em", "35em"]) {
    assert.ok(
      stylesheet.includes(`@media (max-width: ${breakpoint})`),
      `Missing font-relative ${breakpoint} breakpoint.`,
    );
  }
  const summaryRule =
    stylesheet.match(/\.case-card__summary\s*\{(?<rule>[^}]*)\}/u)?.groups
      ?.rule ?? "";
  assert.ok(summaryRule, "Missing case-study summary rule.");
  assert.doesNotMatch(summaryRule, /overflow:\s*hidden/u);
  assert.doesNotMatch(summaryRule, /line-clamp/u);

  const reducedMotion = stylesheet.slice(
    stylesheet.indexOf("@media (prefers-reduced-motion: reduce)"),
    stylesheet.indexOf("@media print"),
  );
  assert.match(reducedMotion, /transition-delay:\s*0s !important/u);
});

test("compact interface text keeps a readable size floor", () => {
  const compactSizes = [...stylesheet.matchAll(/font-size:\s*(0\.\d+)rem/gu)].map(
    ([, size]) => Number.parseFloat(size),
  );
  assert.ok(compactSizes.length > 0, "Expected compact rem-based interface sizes.");
  assert.ok(
    Math.min(...compactSizes) >= 0.68,
    `Compact interface text falls below 0.68rem: ${Math.min(...compactSizes)}rem.`,
  );
});

test("language choices keep generous targets and symmetric navigation feedback", () => {
  assert.match(
    stylesheet,
    /\.site-nav > a,\s*\.language-list a\s*\{[^}]*min-height:\s*2\.75rem;/u,
  );
  assert.match(
    stylesheet,
    /\.language-list a\s*\{[^}]*min-width:\s*2\.75rem;/u,
  );
  assert.match(
    stylesheet,
    /\.site-nav > a:is\(:hover, :focus-visible\)::after,\s*\.language-list a:is\(:hover, :focus-visible\)::after,/u,
  );
  assert.match(
    stylesheet,
    /\.language-list a\[aria-current="page"\]::after\s*\{[^}]*height:\s*2px;/u,
  );
});

test("the page compass owns its compact surface and exposes reading progress", () => {
  assert.match(
    stylesheet,
    /\.page-compass\.text-button\s*\{[^}]*--compass-progress:\s*0;[^}]*width:\s*3\.25rem;[^}]*conic-gradient\([\s\S]*?var\(--compass-progress\)/u,
  );
  assert.match(stylesheet, /\.page-compass\.text-button\s*\{[^}]*border:\s*3px solid transparent;/u);
});

test("touch controls retain visible branded feedback", () => {
  assert.match(
    stylesheet,
    /button,\s*a\s*\{[^}]*-webkit-tap-highlight-color:\s*#e97a4a38;/u,
  );
  assert.match(stylesheet, /button\s*\{[^}]*cursor:\s*pointer;/u);
  assert.match(stylesheet, /button:disabled\s*\{[^}]*cursor:\s*default;/u);
});

test("interface copy keeps authored casing and the primary reading face", () => {
  assert.doesNotMatch(stylesheet, /text-transform:\s*uppercase/u);
  for (const selector of [
    ".skip-link",
    ".brand-label",
    ".index-hero__ledger dt",
    ".discovery label",
    ".text-button",
    ".case-card__decision dt",
    ".architecture-frame figcaption",
    ".evidence-ledger dt",
    ".evidence-citation",
  ]) {
    const rule = blockFor(selector);
    assert.doesNotMatch(rule, /font-family:\s*var\(--mono\)/u);
    assert.doesNotMatch(rule, /letter-spacing:/u);
  }
  assert.match(blockFor(".discovery__shortcut"), /font-family:\s*var\(--mono\)/u);
  assert.match(blockFor(".technology-choice__number"), /font-family:\s*var\(--mono\)/u);
});

test("editorial actions expose the same response to pointer and keyboard", () => {
  assert.match(
    stylesheet,
    /\.case-toc a:is\(:hover, :focus-visible\),\s*\.case-toc a\[aria-current="true"\]\s*\{[^}]*color:\s*var\(--ink\);/u,
  );
  assert.match(
    blockFor(".project-action:is(:hover, :focus-visible)"),
    /background:\s*var\(--oxide\);/u,
  );
  assert.match(
    blockFor(".article-related__list a:is(:hover, :focus-visible) > span:last-child"),
    /transform:\s*translate\(0\.2rem, -0\.2rem\);/u,
  );
});

test("editorial canvases stay quiet while increased contrast sharpens hierarchy", () => {
  assert.doesNotMatch(stylesheet, /--grid:/u);
  assert.doesNotMatch(stylesheet, /body::before\s*\{/u);

  const start = stylesheet.indexOf("@media (prefers-contrast: more)");
  const end = stylesheet.indexOf("@media (forced-colors: active)", start);
  assert.notEqual(start, -1, "Missing the increased-contrast media query.");
  assert.ok(end > start, "The increased-contrast query must be self-contained.");

  const contract = stylesheet.slice(start, end);
  for (const token of ["--muted", "--rule", "--rule-light"]) {
    assert.match(contract, new RegExp(`${token}:`, "u"));
  }
});

test("case-study motion is finite and follows the reader's action", () => {
  assert.doesNotMatch(stylesheet, /\binfinite\b/u);
  assert.match(
    stylesheet,
    /\.case-card:has\(\.text-link:is\(:hover, :focus-visible\)\) \.case-card__signal i\s*\{[^}]*transition-delay:\s*var\(--bar-delay\)/u,
  );
  assert.match(
    stylesheet,
    /\.case-card:has\(\.text-link:is\(:hover, :focus-visible\)\)\s*\{[^}]*box-shadow:\s*inset 0 3px var\(--signal\)/u,
  );
  for (const delay of ["45ms", "90ms", "135ms"]) {
    assert.match(stylesheet, new RegExp(`--bar-delay:\\s*${delay}`, "u"));
  }
});
