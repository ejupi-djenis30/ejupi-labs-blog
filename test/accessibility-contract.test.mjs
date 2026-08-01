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
