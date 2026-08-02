import { expect, test } from "@playwright/test";

for (const { name, route, width } of [
  { name: "desktop archive", route: "/", width: 1440 },
  {
    name: "mobile VECTOR article",
    route: "/case-studies/vector-placement-operations/",
    width: 390,
  },
]) {
  test(name + " keeps its cold load within production budgets", async ({
    browserName,
    page,
  }) => {
    test.skip(browserName !== "chromium", "Performance budgets are calibrated for Chromium.");

    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.addInitScript(() => {
      window.__performanceAudit = {
        cls: 0,
        largestContentfulPaint: 0,
        longTasks: [],
      };
      const supportedTypes = PerformanceObserver.supportedEntryTypes ?? [];

      if (supportedTypes.includes("layout-shift")) {
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) window.__performanceAudit.cls += entry.value;
          }
        }).observe({ type: "layout-shift", buffered: true });
      }
      if (supportedTypes.includes("largest-contentful-paint")) {
        new PerformanceObserver((list) => {
          const lastEntry = list.getEntries().at(-1);
          if (lastEntry) {
            window.__performanceAudit.largestContentfulPaint = lastEntry.startTime;
          }
        }).observe({ type: "largest-contentful-paint", buffered: true });
      }
      if (supportedTypes.includes("longtask")) {
        new PerformanceObserver((list) => {
          window.__performanceAudit.longTasks.push(
            ...list.getEntries().map(({ duration }) => duration),
          );
        }).observe({ type: "longtask", buffered: true });
      }
    });

    const failedResponses = [];
    page.on("response", (response) => {
      if (response.status() >= 400) failedResponses.push(response.url());
    });

    await page.goto(route, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(200);

    const metrics = await page.evaluate(() => {
      const entries = [
        ...performance.getEntriesByType("navigation"),
        ...performance.getEntriesByType("resource"),
      ];
      const firstPartyEntries = entries.filter(
        ({ name: url }) =>
          new URL(url, window.location.href).origin === window.location.origin,
      );
      const externalResources = entries
        .filter(
          ({ name: url }) =>
            new URL(url, window.location.href).origin !== window.location.origin,
        )
        .map(({ name: url }) => url);
      const longTasks = window.__performanceAudit.longTasks;

      return {
        cls: window.__performanceAudit.cls,
        decodedBytes: firstPartyEntries.reduce(
          (total, { decodedBodySize }) => total + decodedBodySize,
          0,
        ),
        externalResources,
        firstPartyRequestCount: firstPartyEntries.length,
        largestContentfulPaint:
          window.__performanceAudit.largestContentfulPaint,
        longestTask: Math.max(0, ...longTasks),
        totalBlockingTime: longTasks.reduce(
          (total, duration) => total + Math.max(0, duration - 50),
          0,
        ),
      };
    });

    expect(failedResponses).toEqual([]);
    expect(metrics.externalResources).toEqual([]);
    expect(metrics.firstPartyRequestCount).toBeLessThanOrEqual(7);
    expect(metrics.decodedBytes).toBeLessThanOrEqual(160_000);
    expect(metrics.cls).toBeLessThan(0.05);
    expect(metrics.largestContentfulPaint).toBeGreaterThan(0);
    expect(metrics.largestContentfulPaint).toBeLessThan(2_000);
    expect(metrics.longestTask).toBeLessThan(200);
    expect(metrics.totalBlockingTime).toBeLessThan(200);
  });
}
