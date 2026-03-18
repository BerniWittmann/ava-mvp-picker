import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [["html", { open: "never" }], ["list"]],
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: {
          executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ||
            "/root/.cache/ms-playwright/chromium-1194/chrome-linux/chrome",
        },
      },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000/ava-mvp-picker",
    reuseExistingServer: true,
    timeout: 60000,
  },
});
