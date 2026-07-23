import { expect, test } from "@playwright/test";

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

    await page.evaluate(() => window.scrollTo(0, 500));
    const lockedPosition = await page.evaluate(() => window.scrollY);
    await toggle.click();

    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(menu).not.toHaveAttribute("aria-hidden", "true");
    await expect(menu).toHaveJSProperty("inert", false);
    await expect(page.locator("body")).toHaveClass(/menu-open/);
    await expect(page.locator("body")).toHaveCSS("position", "fixed");
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
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(lockedPosition);
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
