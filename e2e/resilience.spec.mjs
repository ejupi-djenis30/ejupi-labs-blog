import { expect, test } from "@playwright/test";

import { currentCaseDefinitions } from "../src/content.mjs";
import { editorialUi } from "../src/editorial.mjs";

const SEARCH_INDEX_PATTERN =
  /\/assets\/search\.en\.[0-9a-f]{12}\.json$/u;
const VALID_SEARCH_CASES = currentCaseDefinitions.map(({ slug }) => ({
  slug,
  text: slug,
}));

async function focusSkipLink(page, browserName) {
  const skipLink = page.locator(".skip-link");
  if (browserName === "webkit") await skipLink.focus();
  else await page.keyboard.press("Tab");
  await expect(skipLink).toBeFocused();
}

async function enableForcedColors(page) {
  try {
    await page.emulateMedia({ forcedColors: "active" });
    return await page.evaluate(
      () => window.matchMedia("(forced-colors: active)").matches,
    );
  } catch {
    return false;
  }
}

test("removed project URLs return the standard not-found response", async ({
  request,
}) => {
  const removedSlug = ["djenis", "ai", "agent"].join("-");
  for (const prefix of ["", "/it", "/de", "/fr"]) {
    const response = await request.get(
      `${prefix}/case-studies/${removedSlug}/`,
    );
    expect(response.status()).toBe(404);
    expect(response.headers()["content-type"]).toContain("text/html");
  }
});

test("skip navigation transfers keyboard focus to the main content", async ({
  browserName,
  page,
}) => {
  await page.goto("/");

  await focusSkipLink(page, browserName);
  await page.keyboard.press("Enter");

  await expect(page).toHaveURL(/#main$/u);
  await expect(page.locator("#main")).toBeFocused();
});

test("the article contents navigation moves focus to the selected section", async ({
  page,
}) => {
  await page.goto("/case-studies/ai-workflow-cloud-migration/");

  const link = page.locator(
    '[data-toc-link][href="#technology-rationale"]',
  );
  await link.focus();
  await page.keyboard.press("Enter");

  await expect(page).toHaveURL(/#technology-rationale$/u);
  await expect(page.locator("#technology-rationale h2")).toBeFocused();
  await expect(link).toHaveAttribute("aria-current", "true");
});

test("page compass reveals with reading progress and yields to the footer", async ({ page }) => {
  await page.goto("/");

  const compass = page.locator("[data-page-compass]");
  await expect(compass).toBeHidden();

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight * 0.45));
  await expect(compass).toBeVisible();
  await expect
    .poll(() =>
      compass.evaluate((element) =>
        Number.parseFloat(getComputedStyle(element).getPropertyValue("--compass-progress"))
      )
    )
    .toBeGreaterThan(0);

  await page.locator(".site-footer").scrollIntoViewIfNeeded();
  await expect(compass).toBeHidden();
});

test.describe("without JavaScript", () => {
  test.use({
    javaScriptEnabled: false,
  });

  test("keeps navigation and the complete archive readable", async ({
    browserName,
    page,
  }) => {
    for (const width of [1280, 390]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto("/", { waitUntil: "domcontentloaded" });

      await expect(page.locator("html")).toHaveClass(/\bno-js\b/u);
      await expect(page.locator("[data-menu-toggle]")).toBeHidden();
      await expect(page.locator(".desktop-nav")).toBeVisible();
      await expect(page.locator(".header-actions")).toBeVisible();
      await expect(page.locator("[data-discovery]")).toBeHidden();
      await expect(page.locator("[data-case-card]")).toHaveCount(
        currentCaseDefinitions.length,
      );
      await expect(page.locator("[data-case-card]").first()).toBeVisible();

      const overflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      );
      expect(overflow, `${width}px no-JS overflow`).toBeLessThanOrEqual(0);

      await focusSkipLink(page, browserName);
      await page.keyboard.press("Enter");
      await expect(page.locator("#main")).toBeFocused();
    }
  });
});

test("reduced motion removes smooth scrolling and long transitions", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
  const durations = await page.locator("[data-menu]").evaluate((element) => ({
    animation: getComputedStyle(element).animationDuration,
    transition: getComputedStyle(element).transitionDuration,
  }));
  for (const duration of `${durations.animation},${durations.transition}`.split(
    ",",
  )) {
    expect(Number.parseFloat(duration)).toBeLessThanOrEqual(0.00002);
  }
});

test("forced-colors keeps search, links, cards and current navigation visible", async ({
  browserName,
  page,
}) => {
  test.skip(
    !(await enableForcedColors(page)),
    `${browserName} does not expose forced-colors emulation.`,
  );
  await page.goto("/");

  const search = page.locator("[data-case-search]");
  await search.focus();
  const searchStyle = await search.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      borderStyle: style.borderTopStyle,
      borderWidth: style.borderTopWidth,
      outlineStyle: style.outlineStyle,
      outlineWidth: style.outlineWidth,
    };
  });
  expect(searchStyle.borderStyle).toBe("solid");
  expect(Number.parseFloat(searchStyle.borderWidth)).toBeGreaterThanOrEqual(1);
  expect(searchStyle.outlineStyle).not.toBe("none");
  expect(Number.parseFloat(searchStyle.outlineWidth)).toBeGreaterThanOrEqual(3);

  const cardBoundary = await page.locator("[data-case-card]").first().evaluate(
    (element) => {
      const style = getComputedStyle(element);
      return {
        borderStyle: style.borderTopStyle,
        borderWidth: style.borderTopWidth,
      };
    },
  );
  expect(cardBoundary.borderStyle).toBe("solid");
  expect(Number.parseFloat(cardBoundary.borderWidth)).toBeGreaterThanOrEqual(1);

  const currentLocale = page.locator('.language-list a[aria-current="page"]');
  await expect(currentLocale).toHaveCSS("text-decoration-line", "underline");

  const linkStyle = await page.locator(".text-link").first().evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      borderStyle: style.borderBottomStyle,
      color: style.color,
    };
  });
  const canvasText = await page.locator("body").evaluate(
    (element) => getComputedStyle(element).color,
  );
  expect(linkStyle.borderStyle).toBe("solid");
  expect(linkStyle.color).not.toBe(canvasText);
});

test("a cold mobile article stays stable when interface fonts arrive late", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => {
    window.__layoutShiftAudit = {
      supported:
        "PerformanceObserver" in window &&
        PerformanceObserver.supportedEntryTypes?.includes("layout-shift"),
      value: 0,
    };
    if (!window.__layoutShiftAudit.supported) return;

    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          window.__layoutShiftAudit.value += entry.value;
        }
      }
    }).observe({ type: "layout-shift", buffered: true });
  });
  await page.route(/\/assets\/fonts\/instrument-sans-.*\.woff2$/u, async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 1_200));
    await route.continue();
  });

  await page.goto("/fr/case-studies/jdoor-security-lab/", {
    waitUntil: "load",
  });
  await page.waitForTimeout(500);

  const audit = await page.evaluate(() => ({
    ...window.__layoutShiftAudit,
    overflow:
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  }));
  expect(audit.overflow).toBeLessThanOrEqual(0);
  if (audit.supported) expect(audit.value).toBeLessThan(0.1);
});

for (const failure of [
  {
    name: "404",
    fulfill: {
      body: JSON.stringify({ error: "not found" }),
      contentType: "application/json",
      status: 404,
    },
  },
  {
    name: "malformed JSON",
    fulfill: {
      body: '{"schemaVersion":1,"cases":[',
      contentType: "application/json",
      status: 200,
    },
  },
  {
    name: "unexpected schema",
    fulfill: {
      body: JSON.stringify({ schemaVersion: 2, cases: [] }),
      contentType: "application/json",
      status: 200,
    },
  },
  {
    name: "wrong-locale",
    fulfill: {
      body: JSON.stringify({
        schemaVersion: 1,
        locale: "it",
        cases: VALID_SEARCH_CASES,
      }),
      contentType: "application/json",
      status: 200,
    },
  },
  {
    name: "duplicate-slug",
    fulfill: {
      body: JSON.stringify({
        schemaVersion: 1,
        locale: "en",
        cases: VALID_SEARCH_CASES.map((entry, index) =>
          index === VALID_SEARCH_CASES.length - 1
            ? VALID_SEARCH_CASES[0]
            : entry,
        ),
      }),
      contentType: "application/json",
      status: 200,
    },
  },
]) {
  test(`search fails closed after a ${failure.name} index response`, async ({
    page,
  }) => {
    let requests = 0;
    await page.route(SEARCH_INDEX_PATTERN, async (route) => {
      requests += 1;
      await route.fulfill(failure.fulfill);
    });

    await page.goto("/");
    const search = page.locator("[data-case-search]");
    const state = page.locator("[data-search-state]");

    await search.fill("cloud");
    await expect(state).toHaveText(editorialUi.en.searchFallback);
    await expect(page.locator("[data-discovery]")).not.toHaveAttribute(
      "aria-busy",
    );
    await expect(page.locator("[data-case-card]:visible").first()).toBeVisible();
    expect(requests).toBe(1);

    await search.fill("local");
    await expect(state).toHaveText(editorialUi.en.searchFallback);
    expect(requests).toBe(1);
  });
}
