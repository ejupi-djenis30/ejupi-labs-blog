import { expect, test } from "@playwright/test";
import { currentCaseDefinitions } from "../src/content.mjs";
import { editorialUi } from "../src/editorial.mjs";

const locales = ["/", "/it/", "/de/", "/fr/"];

function contrastRatio(foreground, background) {
  const luminance = (channels) =>
    channels
      .map((channel) => channel / 255)
      .map((channel) =>
        channel <= 0.04045
          ? channel / 12.92
          : ((channel + 0.055) / 1.055) ** 2.4,
      )
      .reduce(
        (total, channel, index) =>
          total + channel * [0.2126, 0.7152, 0.0722][index],
        0,
      );
  const foregroundLuminance = luminance(foreground);
  const backgroundLuminance = luminance(background);
  return (
    (Math.max(foregroundLuminance, backgroundLuminance) + 0.05) /
    (Math.min(foregroundLuminance, backgroundLuminance) + 0.05)
  );
}

for (const localePath of locales) {
  test(`${localePath} keeps mobile navigation isolated and keyboard-contained`, async ({
    page,
  }) => {
    const consoleErrors = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => consoleErrors.push(error.message));

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(localePath);

    const toggle = page.locator("[data-menu-toggle]");
    const menu = page.locator("[data-menu]");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(menu).toHaveAttribute("aria-hidden", "true");
    await expect(menu).toHaveJSProperty("inert", true);

    const lockedPosition = await page.evaluate(() => {
      const previousScrollBehavior =
        document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, 500);
      const position = window.scrollY;
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
      return position;
    });
    expect(lockedPosition).toBeGreaterThan(0);
    await expect(toggle).toBeInViewport();
    const toggleBox = await toggle.boundingBox();
    expect(toggleBox).not.toBeNull();
    await page.mouse.click(
      toggleBox.x + toggleBox.width / 2,
      toggleBox.y + toggleBox.height / 2,
    );

    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(menu).not.toHaveAttribute("aria-hidden", "true");
    await expect(menu).toHaveJSProperty("inert", false);
    await expect(page.locator("body")).toHaveClass(/menu-open/);
    await expect(page.locator("body")).toHaveCSS("position", "fixed");
    await expect(menu).toHaveCSS("position", "fixed");
    await expect(menu).toHaveCSS("top", "72px");
    await expect(menu).toHaveCSS("max-height", "none");
    await expect(menu).toHaveCSS("background-color", "rgb(244, 241, 234)");
    await expect(menu).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, 0)");
    await expect(page.locator("body")).toHaveCSS(
      "top",
      `-${lockedPosition}px`,
    );
    const menuBox = await menu.boundingBox();
    expect(menuBox).not.toBeNull();
    expect(Math.abs(menuBox.y - 72)).toBeLessThanOrEqual(1);
    expect(Math.abs(menuBox.y + menuBox.height - 844)).toBeLessThanOrEqual(1);
    const firstLink = menu.locator("a").first();
    await expect(firstLink).toBeFocused();
    expect(await page.locator("main").evaluate((element) => element.inert)).toBe(true);

    await page.keyboard.press("Shift+Tab");
    await expect(toggle).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(firstLink).toBeFocused();

    const lastLink = menu.locator("a").last();
    await lastLink.focus();
    await page.keyboard.press("Tab");
    await expect(toggle).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(lastLink).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toBeFocused();
    await expect(menu).toHaveAttribute("aria-hidden", "true");
    await expect(page.locator("body")).not.toHaveClass(/menu-open/);
    expect(await page.locator("main").evaluate((element) => element.inert)).toBe(false);
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBe(lockedPosition);
    expect(consoleErrors).toEqual([]);
  });
}

for (const width of [390, 1440]) {
  test(`${width}px case-card palettes keep all normal text at WCAG AA contrast`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    await page.goto("/");

    const samples = await page.evaluate(() => {
      const channels = (value) =>
        (value.match(/[\d.]+/gu) ?? []).slice(0, 3).map(Number);
      const selectors = [
        ".case-card__meta",
        ".case-card__category",
        ".case-card__summary",
        ".tag-list",
        ".text-link",
      ];

      return [...document.querySelectorAll("[data-case-card]")].flatMap(
        (card) => {
          const background = channels(getComputedStyle(card).backgroundColor);
          return selectors.map((selector) => {
            const element = card.querySelector(selector);
            if (!element) throw new Error(`Missing card sample: ${selector}`);
            return {
              background,
              foreground: channels(getComputedStyle(element).color),
              selector,
              slug: card.dataset.caseSlug,
              tone: card.dataset.resultTone,
            };
          });
        },
      );
    });

    expect(new Set(samples.map(({ tone }) => tone))).toEqual(
      new Set(["paper", "oxide", "ink"]),
    );
    for (const sample of samples) {
      expect(
        contrastRatio(sample.foreground, sample.background),
        `${sample.slug} (${sample.tone}) ${sample.selector} must meet WCAG AA`,
      ).toBeGreaterThanOrEqual(4.5);
    }

    const languageTargets = await page
      .locator(".language-list a")
      .evaluateAll((links) =>
        links.map((link) => {
          const box = link.getBoundingClientRect();
          return { height: box.height, width: box.width };
        }),
      );
    // WebKit can expose an exact 44 CSS px layout as 43.99998 because its
    // internal device-pixel conversion uses floating-point coordinates.
    const layoutEpsilonPx = 0.001;
    for (const target of languageTargets) {
      expect(target.width).toBeGreaterThanOrEqual(44 - layoutEpsilonPx);
      expect(target.height).toBeGreaterThanOrEqual(44 - layoutEpsilonPx);
    }
  });

  test(`${width}px article oxide surfaces preserve text and focus contrast`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    await page.goto("/case-studies/ai-workflow-cloud-migration/");

    const combinations = await page.evaluate(() => {
      const channels = (value) => {
        const srgb = value.match(
          /^color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/u,
        );
        if (srgb) return srgb.slice(1, 4).map((channel) => Number(channel) * 255);
        return (value.match(/[\d.]+/gu) ?? []).slice(0, 3).map(Number);
      };
      const opaqueBackground = (element) => {
        let current = element;
        while (current) {
          const color = getComputedStyle(current).backgroundColor;
          const values = color.match(/[\d.]+/gu) ?? [];
          if (values.length === 3 || Number(values[3]) > 0) {
            return channels(color);
          }
          current = current.parentElement;
        }
        return [255, 255, 255];
      };
      return [
        ".scope-note > strong",
        ".scope-note > p",
        ".site-cta__copy > p",
        ".site-cta__action > a",
      ].map((selector) => {
        const element = document.querySelector(selector);
        if (!element) throw new Error(`Missing article contrast sample: ${selector}`);
        return {
          background: opaqueBackground(element),
          foreground: channels(getComputedStyle(element).color),
          selector,
        };
      });
    });

    for (const combination of combinations) {
      expect(
        contrastRatio(combination.foreground, combination.background),
        `${combination.selector} must meet WCAG AA`,
      ).toBeGreaterThanOrEqual(4.5);
    }

    const action = page.locator(".site-cta__action > a");
    await action.focus();
    const focusIndicator = await action.evaluate((element) => {
      const channels = (value) => {
        const srgb = value.match(
          /^color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/u,
        );
        if (srgb) return srgb.slice(1, 4).map((channel) => Number(channel) * 255);
        return (value.match(/[\d.]+/gu) ?? []).slice(0, 3).map(Number);
      };
      const style = getComputedStyle(element);
      const surface = getComputedStyle(element.parentElement);
      return {
        adjacent: channels(surface.backgroundColor),
        outline: channels(style.outlineColor),
        width: Number.parseFloat(style.outlineWidth),
      };
    });
    expect(focusIndicator.width).toBeGreaterThanOrEqual(3);
    expect(
      contrastRatio(focusIndicator.outline, focusIndicator.adjacent),
    ).toBeGreaterThanOrEqual(3);

    await action.hover();
    await expect(action).toHaveCSS("background-color", "rgb(244, 241, 234)");
    await expect(action).toHaveCSS("color", "rgb(183, 77, 44)");
    const hover = await action.evaluate((element) => {
      const channels = (value) => {
        const srgb = value.match(
          /^color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/u,
        );
        if (srgb) return srgb.slice(1, 4).map((channel) => Number(channel) * 255);
        return (value.match(/[\d.]+/gu) ?? []).slice(0, 3).map(Number);
      };
      const style = getComputedStyle(element);
      return {
        background: channels(style.backgroundColor),
        foreground: channels(style.color),
      };
    });
    expect(contrastRatio(hover.foreground, hover.background)).toBeGreaterThanOrEqual(
      4.5,
    );
  });
}

test("localized 404 pages stay within narrow viewports", async ({ page }) => {
  for (const width of [280, 320, 375]) {
    await page.setViewportSize({ width, height: 844 });
    for (const route of [
      "/404.html",
      "/it/404.html",
      "/de/404.html",
      "/fr/404.html",
    ]) {
      await page.goto(route);
      const geometry = await page.evaluate(() => {
        const main = document.querySelector(".not-found");
        const heading = document.querySelector(".not-found h1");
        if (!main || !heading) throw new Error("Missing 404 layout");
        return {
          documentOverflow:
            document.documentElement.scrollWidth -
            document.documentElement.clientWidth,
          headingOverflow: heading.scrollWidth - heading.clientWidth,
          mainOverflow: main.scrollWidth - main.clientWidth,
        };
      });
      expect(geometry, `${route} must fit at ${width}px`).toEqual({
        documentOverflow: 0,
        headingOverflow: 0,
        mainOverflow: 0,
      });
    }
  }
});

test("desktop navigation remains available after an open mobile menu is resized", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/case-studies/ai-workflow-cloud-migration/");

  const toggle = page.locator("[data-menu-toggle]");
  const menu = page.locator("[data-menu]");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");

  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(menu).not.toHaveAttribute("aria-hidden", "true");
  await expect(menu).toHaveJSProperty("inert", false);
  await expect(menu).toBeVisible();

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(menu).toHaveAttribute("aria-hidden", "true");
  await expect(menu).toHaveJSProperty("inert", true);

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test("the editorial header leads directly into search and case studies", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  await expect(page.locator(".index-register, .intro-section, .principle-grid, .site-cta")).toHaveCount(0);
  await expect(page.locator("[data-case-type], [data-case-topic]")).toHaveCount(0);
  await expect(page.locator("[data-case-search]")).toBeVisible();
  await expect(page.locator("[data-case-search]")).toBeInViewport();
  await expect(page.locator("[data-case-search]")).toHaveAttribute(
    "aria-keyshortcuts",
    "/",
  );
  await expect(page.locator(".discovery__status [data-case-clear]")).toBeDisabled();

  const layout = await page.evaluate(() => {
    const hero = document.querySelector(".index-hero");
    const discovery = document.querySelector("[data-discovery]");
    const caseList = document.querySelector("[data-case-list]");
    if (!hero || !discovery || !caseList) return null;
    const heroBox = hero.getBoundingClientRect();
    const discoveryBox = discovery.getBoundingClientRect();
    const listBox = caseList.getBoundingClientRect();
    const heroBeforeDiscovery = Boolean(
      hero.compareDocumentPosition(discovery) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    );
    const discoveryBeforeCases = Boolean(
      discovery.compareDocumentPosition(caseList) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    );
    return {
      heroHeight: heroBox.height,
      ordered: heroBeforeDiscovery && discoveryBeforeCases,
      discoveryTouchesList: Math.abs(discoveryBox.bottom - listBox.top) <= 1,
    };
  });

  expect(layout).not.toBeNull();
  expect(layout.heroHeight).toBeLessThan(630);
  expect(layout.ordered).toBeTruthy();
  expect(layout.discoveryTouchesList).toBe(true);
});

test("archive search, URL state and empty state stay in sync", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/?q=llama.cpp");

  const cards = page.locator("[data-case-card]:visible");
  await expect(page.locator("[data-discovery]")).toBeVisible();
  await expect(page.locator("[data-case-search]")).toHaveValue("llama.cpp");
  await expect(page.locator("[data-case-type], [data-case-topic]")).toHaveCount(0);
  await expect(cards).toHaveCount(1);
  await expect(page.locator("[data-case-count]")).toHaveText("1");

  await page.locator("[data-case-search]").fill("phrase-that-does-not-exist");
  await expect(page.locator(".discovery__status [data-case-clear]")).toBeEnabled();
  await expect(cards).toHaveCount(0);
  await expect(page.locator("[data-case-empty]")).toBeVisible();
  await expect(page).toHaveURL(/q=phrase-that-does-not-exist/);

  await page.locator("[data-case-empty] [data-case-clear]").click();
  await expect(cards).toHaveCount(currentCaseDefinitions.length);
  await expect(page.locator("[data-case-search]")).toBeFocused();
  await expect(page).toHaveURL(/^http:\/\/127\.0\.0\.1:\d+\/$/);

  await page.keyboard.press("Escape");
  await page.keyboard.press("Tab");
  await page.locator("body").click({ position: { x: 10, y: 200 } });
  await page.keyboard.press("/");
  await expect(page.locator("[data-case-search]")).toBeFocused();
});

test("archive previews adapt from three columns to two and one", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const columnCount = () =>
    page.locator("[data-case-list]").evaluate(
      (element) =>
        getComputedStyle(element).gridTemplateColumns.split(" ").length,
    );

  await expect.poll(columnCount).toBe(3);
  await page.setViewportSize({ width: 900, height: 900 });
  await expect.poll(columnCount).toBe(2);
  await page.setViewportSize({ width: 768, height: 900 });
  await expect.poll(columnCount).toBe(1);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect.poll(columnCount).toBe(1);
});

test("768px archive and VECTOR article remain free of clipped content", async ({
  page,
}) => {
  await page.setViewportSize({ width: 768, height: 900 });
  for (const route of ["/", "/case-studies/vector-placement-operations/"]) {
    await page.goto(route);
    const audit = await page.evaluate(() => ({
      clippedHeadings: [...document.querySelectorAll("h1, h2, h3")]
        .filter((heading) => heading.scrollWidth > heading.clientWidth + 1)
        .map((heading) => heading.textContent?.trim().slice(0, 80)),
      overflow:
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    }));
    expect(audit.overflow, route + " horizontal overflow").toBeLessThanOrEqual(0);
    expect(audit.clippedHeadings, route + " clipped headings").toEqual([]);
  }
});

for (const { width, localePath } of [
  { width: 390, localePath: "/it/" },
  { width: 320, localePath: "/de/" },
]) {
  test(`${width}px archive keeps search and complete previews readable`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(localePath);

    const discovery = page.locator("[data-discovery]");
    await discovery.scrollIntoViewIfNeeded();
    const geometry = await page.evaluate(() => {
      const discoveryBox = document
        .querySelector("[data-discovery]")
        ?.getBoundingClientRect();
      const searchBox = document
        .querySelector("[data-case-search]")
        ?.getBoundingClientRect();
      const firstCard = document
        .querySelector("[data-case-card]")
        ?.getBoundingClientRect();
      const list = document.querySelector("[data-case-list]");
      const summary = document.querySelector(".case-card__summary");
      return {
        overflow:
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
        removedFilterCount: document.querySelectorAll(
          "[data-case-type], [data-case-topic]",
        ).length,
        searchHeight: searchBox?.height ?? 0,
        discoveryHeight: discoveryBox?.height ?? Infinity,
        firstCardHeight: firstCard?.height ?? Infinity,
        columns: list
          ? getComputedStyle(list).gridTemplateColumns.split(" ").length
          : 0,
        summaryClamp: summary
          ? getComputedStyle(summary).webkitLineClamp
          : "",
        summaryOverflow: summary
          ? getComputedStyle(summary).overflow
          : "",
        summaryFullyVisible: summary
          ? summary.scrollHeight <= summary.clientHeight + 1
          : false,
      };
    });

    expect(geometry.overflow).toBeLessThanOrEqual(0);
    expect(geometry.removedFilterCount).toBe(0);
    expect(geometry.searchHeight).toBeGreaterThanOrEqual(48);
    expect(geometry.discoveryHeight).toBeLessThan(220);
    expect(geometry.firstCardHeight).toBeLessThan(700);
    expect(geometry.columns).toBe(1);
    expect(["", "none"]).toContain(geometry.summaryClamp);
    expect(geometry.summaryOverflow).toBe("visible");
    expect(geometry.summaryFullyVisible).toBe(true);

    await page.locator("[data-case-search]").fill("llama.cpp");
    await expect(page.locator("[data-case-card]:visible")).toHaveCount(1);
    await expect(page).toHaveURL(/q=llama\.cpp/u);
  });
}

test("full-text search announces loading and a localized fallback", async ({
  page,
}) => {
  let finishRequest;
  await page.route(/\/assets\/search\.it\.[0-9a-f]{12}\.json$/u, async (route) => {
    await new Promise((resolve) => {
      finishRequest = resolve;
    });
    await route.abort();
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/it/");
  const state = page.locator("[data-search-state]");
  await expect(state).toHaveAttribute("role", "status");
  await page.locator("[data-case-search]").fill("cloud");
  await expect(state).toHaveText(editorialUi.it.searchLoading);
  await expect.poll(() => typeof finishRequest).toBe("function");
  finishRequest();
  await expect(state).toHaveText(editorialUi.it.searchFallback);
  await expect(page.locator("[data-case-card]:visible").first()).toBeVisible();
});

test("full-text index stays lazy and finds copy that exists only inside an article", async ({
  page,
}) => {
  const searchRequests = [];
  page.on("request", (request) => {
    if (/\/assets\/search\.en\.[0-9a-f]{12}\.json$/u.test(request.url())) {
      searchRequests.push(request.url());
    }
  });

  await page.goto("/");
  await expect(page.locator("[data-case-card]:visible")).toHaveCount(
    currentCaseDefinitions.length,
  );
  expect(searchRequests).toEqual([]);

  await page.locator("[data-case-search]").fill("artifact evidence traffic authority");
  await expect(page.locator("[data-case-card]:visible")).toHaveCount(1);
  await expect(
    page.locator(
      '[data-case-card][data-case-slug="ai-workflow-cloud-migration"]:visible',
    ),
  ).toHaveCount(1);
  await expect.poll(() => searchRequests.length).toBe(1);
});

test("localized Labs article exposes evidence and its working product page", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/de/case-studies/eliza-lab/");
  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  await expect(page.locator("#technology-rationale")).toBeVisible();
  await expect(page.locator(".technology-choice")).toHaveCount(4);
  await expect(page.locator("#evidence")).toBeVisible();
  expect(await page.locator(".evidence-ledger > div").count()).toBeGreaterThanOrEqual(4);
  await expect(page.locator(".project-action")).toHaveAttribute(
    "href",
    "https://ejupi-djenis30.github.io/eliza-lab/",
  );
  await expect(page.locator('.language-list a[hreflang="fr"]')).toHaveAttribute(
    "href",
    "/fr/case-studies/eliza-lab/",
  );
  const geometry = await page.evaluate(() => {
    const frame = document.querySelector(".architecture-frame")?.getBoundingClientRect();
    return {
      overflow:
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
      frameLeft: frame?.left,
      frameRight: frame?.right,
      viewport: document.documentElement.clientWidth,
    };
  });
  expect(geometry.overflow).toBeLessThanOrEqual(0);
  expect(geometry.frameLeft).toBeGreaterThanOrEqual(0);
  expect(geometry.frameRight).toBeLessThanOrEqual(geometry.viewport);
});
