import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright configuration for the Lovepreet portfolio.
 *
 * Configured for baseURL http://localhost:5174. The dev server is started
 * automatically by the webServer config below using `npm run dev -- --port 5174`
 * (or reuses an existing server on 5174 if one is already running).
 *
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  // Fail the build on CI if you accidentally left test.only in the source.
  forbidOnly: Boolean(process.env.CI),
  // Don't run tests in parallel on CI — fewer flakes, easier logs.
  workers: process.env.CI ? 1 : undefined,
  // Give the dev server time to boot and the character scroll triggers time to settle.
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL: 'http://localhost:5174',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // No shared navigation state between tests — each one starts fresh.
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*\.spec\.ts/,
      testIgnore: /mobile\.spec\.ts/,
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 7'] },
      testMatch: /mobile\.spec\.ts/,
    },
  ],

  // Start the Vite dev server automatically before the test suite on port 5174
  // and tear it down afterwards (or reuse an existing server on 5174).
  webServer: {
    command: 'npm run dev -- --port 5174',
    url: 'http://localhost:5174',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
