import { expect, test, expectCharacterVisible, persistentPose, scrollToSection, waitForPageReady } from './fixtures'

/**
 * Character pose tests.
 *
 * The scroll-driven pose map lives in `useScrollPose`:
 *   work → sit-coding
 *   about → thinking
 *   experience → thinking
 *   contact → wave
 *
 * The AnimatedCharacter root exposes `data-character-pose` — a non-visual
 * testing hook with no styling or behaviour effect — so tests can assert the
 * resolved pose directly instead of guessing at CSS selectors. The persistent
 * (fixed) character follows the visitor from Work to Contact and reflects the
 * same CharacterPoseContext, so it is the reliable source of pose state.
 */
test.describe('character pose transitions', () => {
  test('pose changes as the visitor scrolls through each section', async ({
    page,
    consoleErrors,
  }) => {
    await page.goto('/')
    await waitForPageReady(page)

    const pose = persistentPose(page)

    // The persistent character is hidden until Work enters, so it has no pose
    // attribute yet. Bring it on-screen by scrolling to Work, and wait for it
    // to fade in via the GSAP opacity animation.
    await scrollToSection(page, 'work')
    await expectCharacterVisible(page)

    // Work → sit-coding (assert both testing hook and actual rendered pose illustration)
    await expect(pose).toHaveAttribute('data-character-pose', 'sit-coding')
    await expect(
      page.locator('.persistent-character img.character-layer'),
    ).toHaveAttribute('src', /\/character\/poses\/lovepreet-sit-coding\.webp$/)

    // About → thinking
    await scrollToSection(page, 'about')
    await expect(pose).toHaveAttribute('data-character-pose', 'thinking')
    await expect(
      page.locator('.persistent-character img.character-layer'),
    ).toHaveAttribute('src', /\/character\/poses\/lovepreet-thinking\.webp$/)

    // Experience → thinking
    await scrollToSection(page, 'experience')
    await expect(pose).toHaveAttribute('data-character-pose', 'thinking')
    await expect(
      page.locator('.persistent-character img.character-layer'),
    ).toHaveAttribute('src', /\/character\/poses\/lovepreet-thinking\.webp$/)

    // Contact → wave
    await scrollToSection(page, 'contact')
    await expect(pose).toHaveAttribute('data-character-pose', 'wave')
    await expect(
      page.locator('.persistent-character img.character-layer'),
    ).toHaveAttribute('src', /\/character\/poses\/lovepreet-wave\.webp$/)

    const summary = consoleErrors.map((e) => `[${e.kind}] ${e.text}`).join('\n  ')
    if (summary) {
      console.error('Console errors captured during the test:\n  ' + summary)
    }
    expect(consoleErrors).toEqual([])
  })
})
