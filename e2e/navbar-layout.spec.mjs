import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("ejupilabs.intro-seen", "1");
    localStorage.setItem("djenis.ejupilabs.intro-seen", "1");
  });
});

for (const layout of [
  { width: 1280, headerHeight: 88, inset: 32, mobile: false },
  { width: 390, headerHeight: 76, inset: 20, mobile: true },
]) {
  test(`navbar follows the shared ${layout.width}px geometry`, async ({ page }) => {
    await page.setViewportSize({ width: layout.width, height: 844 });
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const header = page.locator(".site-header");
    const inner = page.locator(".site-header__inner");
    const brand = page.locator(".brand-link");
    const desktopNavigation = page.locator(".desktop-nav");
    const actions = page.locator(".header-actions");
    const toggle = page.locator("[data-menu-toggle]");

    await expect(header).toHaveCSS("height", `${layout.headerHeight}px`);

    const [innerBox, brandBox] = await Promise.all([
      inner.boundingBox(),
      brand.boundingBox(),
    ]);
    const layoutWidth = await page.evaluate(() => document.body.getBoundingClientRect().width);
    expect(innerBox).not.toBeNull();
    expect(brandBox).not.toBeNull();
    expect(Math.abs(innerBox.x - layout.inset)).toBeLessThanOrEqual(1);
    expect(Math.abs(innerBox.x + innerBox.width - (layoutWidth - layout.inset))).toBeLessThanOrEqual(1);
    expect(Math.abs(brandBox.x - innerBox.x)).toBeLessThanOrEqual(1);

    if (layout.mobile) {
      await expect(desktopNavigation).toBeHidden();
      await expect(actions).toBeHidden();
      await expect(toggle).toBeVisible();
      const toggleBox = await toggle.boundingBox();
      expect(toggleBox).not.toBeNull();
      expect(toggleBox.width).toBe(44);
      expect(toggleBox.height).toBe(44);
      expect(Math.abs(toggleBox.x + toggleBox.width - (layoutWidth - layout.inset))).toBeLessThanOrEqual(1);
      return;
    }

    await expect(desktopNavigation).toBeVisible();
    await expect(actions).toBeVisible();
    await expect(toggle).toBeHidden();
    const [navigationBox, actionsBox] = await Promise.all([
      desktopNavigation.boundingBox(),
      actions.boundingBox(),
    ]);
    expect(navigationBox).not.toBeNull();
    expect(actionsBox).not.toBeNull();
    expect(Math.abs(navigationBox.x + navigationBox.width / 2 - layoutWidth / 2)).toBeLessThanOrEqual(1);
    expect(Math.abs(actionsBox.x + actionsBox.width - (layoutWidth - layout.inset))).toBeLessThanOrEqual(1);
  });
}
