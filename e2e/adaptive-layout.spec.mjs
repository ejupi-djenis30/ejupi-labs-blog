import { expect, test } from "@playwright/test";

async function layoutAudit(page) {
  return page.evaluate(() => {
    const viewportWidth = document.documentElement.clientWidth;
    const isVisible = (element) => {
      if (element.closest("[inert], [aria-hidden='true'], .sr-only")) return false;
      const style = getComputedStyle(element);
      const box = element.getBoundingClientRect();
      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        Number.parseFloat(style.opacity || "1") > 0 &&
        box.width > 0 &&
        box.height > 0
      );
    };
    const label = (element) =>
      element.getAttribute("aria-label") ||
      element.textContent?.trim().slice(0, 80) ||
      element.tagName;
    const outsideViewport = [...document.querySelectorAll(
      "a, button, input, select, textarea",
    )]
      .filter(isVisible)
      .filter((element) => {
        const box = element.getBoundingClientRect();
        return box.left < -1 || box.right > viewportWidth + 1;
      })
      .map(label);
    const clippedHeadings = [...document.querySelectorAll("h1, h2, h3")]
      .filter(isVisible)
      .filter((element) => element.scrollWidth > element.clientWidth + 1)
      .map(label);

    return {
      clippedHeadings,
      documentOverflow:
        document.documentElement.scrollWidth - viewportWidth,
      outsideViewport,
    };
  });
}

function expectLayoutAudit(audit, label) {
  expect(audit.documentOverflow, `${label} horizontal overflow`).toBeLessThanOrEqual(1);
  expect(audit.clippedHeadings, `${label} clipped headings`).toEqual([]);
  expect(audit.outsideViewport, `${label} clipped controls`).toEqual([]);
}

for (const width of [640, 320]) {
  test(`effective ${128000 / width}% zoom reflows archive and article content`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/de/case-studies/vector-placement-operations/",
    ]) {
      await page.goto(route);
      expectLayoutAudit(await layoutAudit(page), route);
    }

    await page.goto("/");
    const toggle = page.locator("[data-menu-toggle]");
    await toggle.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("[data-menu]")).toHaveAttribute(
      "data-open",
      "true",
    );
    expectLayoutAudit(await layoutAudit(page), "open mobile navigation");
  });
}

test("200% text enlargement keeps full summaries and keyboard actions available", async ({
  page,
}) => {
  for (const width of [800, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.addStyleTag({
      content: "html { font-size: 200% !important; }",
    });
    expectLayoutAudit(await layoutAudit(page), `${width}px enlarged text`);
  }

  const clippedSummaries = await page.locator(".case-card__summary").evaluateAll(
    (summaries) =>
      summaries
        .filter((summary) => summary.scrollHeight > summary.clientHeight + 1)
        .map((summary) => summary.textContent?.trim().slice(0, 80)),
  );
  expect(clippedSummaries).toEqual([]);

  const firstCaseLink = page.locator("[data-case-card] a").first();
  await firstCaseLink.focus();
  await expect(firstCaseLink).toBeFocused();
  const fontSize = await firstCaseLink.evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).fontSize),
  );
  expect(fontSize).toBeGreaterThanOrEqual(20);
});
