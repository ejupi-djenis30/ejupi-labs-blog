import { expect, test } from "@playwright/test";
import { caseDefinitions } from "../src/content.mjs";

const locales = ["/", "/it/", "/de/", "/fr/"];

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
    await expect(menu.locator("a").first()).toBeFocused();
    expect(await page.locator("main").evaluate((element) => element.inert)).toBe(true);

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

test("archive search, taxonomy, URL state and empty state stay in sync", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/?q=llama.cpp&type=labs");

  const cards = page.locator("[data-case-card]:visible");
  await expect(page.locator("[data-discovery]")).toBeVisible();
  await expect(page.locator("[data-case-search]")).toHaveValue("llama.cpp");
  await expect(page.locator('[data-case-type="labs"]')).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(cards).toHaveCount(1);
  await expect(page.locator("[data-case-count]")).toHaveText("1");

  await page.locator("[data-case-search]").fill("phrase-that-does-not-exist");
  await expect(cards).toHaveCount(0);
  await expect(page.locator("[data-case-empty]")).toBeVisible();
  await expect(page).toHaveURL(/q=phrase-that-does-not-exist/);

  await page.locator("[data-case-empty] [data-case-clear]").click();
  await expect(cards).toHaveCount(caseDefinitions.length);
  await expect(page.locator("[data-case-search]")).toBeFocused();
  await expect(page).toHaveURL(/^http:\/\/127\.0\.0\.1:\d+\/$/);

  await page.keyboard.press("Escape");
  await page.keyboard.press("Tab");
  await page.locator("body").click({ position: { x: 10, y: 200 } });
  await page.keyboard.press("/");
  await expect(page.locator("[data-case-search]")).toBeFocused();
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
    caseDefinitions.length,
  );
  expect(searchRequests).toEqual([]);

  await page.locator("[data-case-search]").fill("manual gate is slower");
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
  await expect(page.locator("#evidence")).toBeVisible();
  expect(await page.locator(".evidence-ledger > div").count()).toBeGreaterThanOrEqual(4);
  await expect(page.locator(".project-action")).toHaveAttribute(
    "href",
    "https://ejupi-djenis30.github.io/PsychologistRustBot/",
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
