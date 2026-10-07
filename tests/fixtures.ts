import { expect, test as base, type Page } from '@playwright/test'

/**
 * Shared Playwright fixtures for the portfolio test suite.
 *
 * - `consoleErrors`: collects every browser console error and uncaught
 *   pageerror during a test, then asserts the list is empty in teardown so a
 *   test fails loudly if the page logs an error.
 * - `captureCheckpoint`: writes a screenshot to tests/screenshots/<name>.png
 *   at the named scroll checkpoint. Screenshots are gitignored debugging
 *   artifacts, never committed fixtures.
 *
 * These are test-only helpers; they touch no application code.
 */

type ConsoleEntry = { kind: 'console' | 'pageerror'; text: string }

type PortfolioFixtures = {
  /** List of console errors / uncaught errors collected during the test. */
  consoleErrors: ConsoleEntry[]
  /** Capture a full-page screenshot at a named checkpoint. */
  captureCheckpoint: (name: string) => Promise<void>
}

export const test = base.extend<PortfolioFixtures>({
  consoleErrors: async ({ page }, use) => {
    const errors: ConsoleEntry[] = []
    page.on('console', (message) => {
      if (message.type() === 'error') {
        errors.push({ kind: 'console', text: message.text() })
      }
    })
    page.on('pageerror', (error) => {
      errors.push({ kind: 'pageerror', text: error.message })
    })

    await use(errors)

    // Teardown: a clean test produces no console errors and no uncaught
    // page errors. Surface everything collected so failures are debuggable.
    const summary = errors.map((e) => `[${e.kind}] ${e.text}`).join('\n  ')
    expect(errors, `Unexpected console/page errors:\n  ${summary}`).toEqual([])
  },

  captureCheckpoint: async ({ page }, use) => {
    const capture = async (name: string) => {
      // Ensure visible character images are decoded before capturing the screenshot
      const charImages = page.locator('img.character-layer')
      const count = await charImages.count()
      for (let i = 0; i < count; i++) {
        const img = charImages.nth(i)
        if (await img.isVisible().catch(() => false)) {
          await img
            .evaluate((el: HTMLImageElement) => {
              if (el.decode) {
                return Promise.race([
                  el.decode(),
                  new Promise((resolve) => setTimeout(resolve, 800)),
                ]).catch(() => {})
              }
            })
            .catch(() => {})
        }
      }

      await page.screenshot({
        path: `tests/screenshots/${name}.png`,
        fullPage: false,
      })
    }
    await use(capture)
  },
})

export { expect }

/**
 * Wait for the boot loader overlay to unmount.
 *
 * The MonogramLoader pins `body { overflow: hidden }` and covers the page for
 * up to ~2.8s on first paint. Scrolling while it is up either does nothing or
 * fights Lenis, so every scroll-driven test waits here first. Under
 * prefers-reduced-motion the loader renders nothing and this resolves fast.
 */
export async function waitForPageReady(page: Page): Promise<void> {
  await page.locator('.mono-loader').waitFor({ state: 'detached', timeout: 20_000 })
}

/**
 * Scroll a section into view and wait until it is actually in the viewport.
 *
 * Uses the browser's native scrollIntoView (block: 'start' aligns the section
 * top to the viewport top, crossing the GSAP ScrollTrigger `top 60%` start
 * line) then asserts visibility. Lenis syncs from the native scroll event and
 * forwards it to ScrollTrigger, so pose/visibility callbacks fire after this.
 */
export async function scrollToSection(page: Page, id: string): Promise<void> {
  await page.locator(`#${id}`).evaluate((el) => el.scrollIntoView({ block: 'start' }))
  await expect(page.locator(`#${id}`)).toBeInViewport()
}

/**
 * Read the current pose off the persistent (fixed) character layer.
 *
 * The persistent character is the one that follows the visitor from Work to
 * Contact, so it is the reliable source of pose state while scrolling. The
 * `data-character-pose` attribute is a non-visual testing hook on the
 * AnimatedCharacter root; it has no styling or behaviour effect.
 */
export function persistentPose(page: Page) {
  return page.locator('.persistent-character [data-character-pose]')
}

/**
 * The persistent character is shown/hidden by GSAP animating `opacity` between
 * 0 and 1 while keeping `display: block`. Playwright's `toBeVisible` treats an
 * `opacity:0` element as visible (it still has a bounding box and is not
 * `visibility:hidden`), so visibility must be asserted on the computed opacity
 * instead — that is the exact state the component controls.
 */
export const PERSISTENT_CHARACTER = '.persistent-character'

export async function expectCharacterVisible(page: Page) {
  const locator = page.locator(PERSISTENT_CHARACTER)
  await expect(locator).toHaveCSS('opacity', '1', { timeout: 10_000 })
  await expect(locator).toHaveCSS('pointer-events', 'auto', { timeout: 10_000 })
  const img = locator.locator('img.character-layer')
  await expect(img).toBeVisible({ timeout: 10_000 })
  await expect(img).toHaveJSProperty('complete', true, { timeout: 10_000 })
}

export async function expectCharacterHidden(page: Page) {
  const locator = page.locator(PERSISTENT_CHARACTER)
  await expect(locator).toHaveCSS('opacity', '0', { timeout: 10_000 })
  await expect(locator).toHaveCSS('pointer-events', 'none', { timeout: 10_000 })
}
