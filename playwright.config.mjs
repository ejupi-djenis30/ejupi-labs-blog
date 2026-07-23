import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: "line",
  use: {
    baseURL: "http://127.0.0.1:8792",
    browserName: "chromium",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run build && wrangler dev --local --port 8792",
    url: "http://127.0.0.1:8792",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
