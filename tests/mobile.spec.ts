import { expect, test, waitForPageReady } from './fixtures'

/**
 * Mobile smoke test (Pixel 7 viewport, ~412px wide).
 *
 * Verifies the page loads, has no horizontal overflow, the Hero renders, and
 * the persistent character stays hidden on mobile. The persistent layer is
 * `hidden md:block` in PersistentCharacter, so on a mobile viewport it must
 * never become visible even while scrolling through Work→Contact.
 *
 * The mobile UI is not modified to make this pass; this only observes it.
 */
test.describe('mobile viewport', () => {
  test('page loads with no horizontal overflow and hidden persistent character', async ({
    page,
    consoleErrors,
  }) => {
    await page.goto('/')
    await waitForPageReady(page)

    // --- Page loads ---
    await expect(page).toHaveTitle(/Lovepreet/)

    // --- Hero works on mobile ---
    await expect(page.locator('#hero')).toBeVisible()

    // --- No horizontal overflow at mobile width ---
    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    )
    expect(hasHorizontalOverflow).toBe(false)

    // --- Persistent character stays hidden on mobile while scrolling ---
    await expect(page.locator('.persistent-character')).not.toBeVisible()

    for (const id of ['work', 'about', 'experience', 'contact']) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded()
      await expect(page.locator(`#${id}`)).toBeInViewport()
      await expect(
        page.locator('.persistent-character'),
        `persistent character should stay hidden on mobile at #${id}`,
      ).not.toBeVisible()
    }

    // --- No console or uncaught errors during the test ---
    const summary = consoleErrors.map((e) => `[${e.kind}] ${e.text}`).join('\n  ')
    if (summary) {
      console.error('Console errors captured during the test:\n  ' + summary)
    }
    expect(consoleErrors).toEqual([])
  })

  test('mobile project detail page renders cleanly with no horizontal overflow', async ({
    page,
    consoleErrors,
  }) => {
    await page.goto('/work/fitguide')
    await waitForPageReady(page)

    // Confirm heading and content render
    await expect(page.getByRole('heading', { name: 'FitGuide', level: 1 })).toBeVisible()
    await expect(page.locator('.project-visual')).toBeVisible()

    // Persistent character must remain hidden on mobile
    await expect(page.locator('.persistent-character')).not.toBeVisible()

    // Confirm no horizontal overflow
    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    )
    expect(hasHorizontalOverflow).toBe(false)

    // Capture mobile screenshot
    await page.screenshot({ path: 'tests/screenshots/project-detail-mobile.png', fullPage: false })

    const summary = consoleErrors.map((e) => `[${e.kind}] ${e.text}`).join('\n  ')
    if (summary) {
      console.error('Console errors captured during the test:\n  ' + summary)
    }
    expect(consoleErrors).toEqual([])
  })
})
