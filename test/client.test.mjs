import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  calculateReadingProgress,
  matchesCaseStudy,
  normalizeSearchValue,
  shouldCloseOnEscape,
} from "../src/client.js";

test("mobile disclosure closes on Escape only while open", () => {
  assert.equal(shouldCloseOnEscape("Escape", true), true);
  assert.equal(shouldCloseOnEscape("Escape", false), false);
  assert.equal(shouldCloseOnEscape("Enter", true), false);
  assert.equal(shouldCloseOnEscape("Tab", true), false);
});

test("mobile disclosure locks page scrolling while open", async () => {
  const source = await readFile(new URL("../src/client.js", import.meta.url), "utf8");

  assert.match(source, /document\.body\.style\.top = `-\$\{lockedScrollPosition\}px`/);
  assert.match(source, /top: lockedScrollPosition/);
  assert.match(source, /behavior: "instant"/);
  assert.match(source, /menuToggle\.focus\(\{ preventScroll: true \}\)/);
});

test("mobile disclosure isolates the page and traps keyboard focus", async () => {
  const source = await readFile(new URL("../src/client.js", import.meta.url), "utf8");

  assert.match(source, /element\.setAttribute\("aria-hidden", "true"\)/);
  assert.match(source, /event\.shiftKey && document\.activeElement === firstItem/);
  assert.match(source, /document\.activeElement === lastItem/);
});

test("skip link transfers keyboard focus to the main landmark", async () => {
  const source = await readFile(new URL("../src/client.js", import.meta.url), "utf8");

  assert.match(source, /skipLink\.addEventListener\("click"/);
  assert.match(source, /requestAnimationFrame\(\(\) => target\.focus\(\)\)/);
});

test("reading progress is clamped and handles non-scrollable pages", () => {
  assert.equal(calculateReadingProgress(0, 1000, 1000), 0);
  assert.equal(calculateReadingProgress(250, 1500, 1000), 0.5);
  assert.equal(calculateReadingProgress(-50, 1500, 1000), 0);
  assert.equal(calculateReadingProgress(1000, 1500, 1000), 1);
});

test("case-study search is accent-insensitive and requires every query word", () => {
  assert.equal(normalizeSearchValue("  Déploiement   GKE "), "deploiement gke");
  const candidate = {
    text: "Déploiement d’une plateforme GKE avec Terraform",
    kind: "professional",
    topic: "cloud-platforms",
  };
  assert.equal(matchesCaseStudy(candidate, { query: "gke terraform" }), true);
  assert.equal(matchesCaseStudy(candidate, { query: "gke camunda" }), false);
  assert.equal(
    matchesCaseStudy(candidate, {
      query: "deploiement",
      selectedKind: "professional",
      selectedTopic: "cloud-platforms",
    }),
    true,
  );
  assert.equal(
    matchesCaseStudy(candidate, { selectedKind: "labs" }),
    false,
  );
});

test("homepage search no longer depends on visible taxonomy controls", async () => {
  const source = await readFile(new URL("../src/client.js", import.meta.url), "utf8");

  assert.doesNotMatch(source, /data-case-type|data-case-topic/u);
  assert.match(source, /url\.searchParams\.delete\("type"\)/u);
  assert.match(source, /url\.searchParams\.delete\("topic"\)/u);
  assert.match(source, /caseList\.dataset\.visibleCount = String\(visibleCount\)/u);
  assert.match(source, /card\.dataset\.resultTone/u);
});

test("README describes the archive as search-only", async () => {
  const readme = await readFile(new URL("../README.md", import.meta.url), "utf8");

  assert.match(readme, /search-only archive/iu);
  assert.doesNotMatch(readme, /taxonomy filters/iu);
});

test("reading progress batches scroll work through requestAnimationFrame", async () => {
  const source = await readFile(new URL("../src/client.js", import.meta.url), "utf8");

  assert.match(source, /document\.addEventListener\("scroll", scheduleReadingProgress/);
  assert.match(source, /progressFrame = window\.requestAnimationFrame\(updateReadingProgress\)/);
});
