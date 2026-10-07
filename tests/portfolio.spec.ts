import {
  expect,
  test,
  expectCharacterHidden,
  expectCharacterVisible,
  scrollToSection,
  waitForPageReady,
} from './fixtures'

test.describe('portfolio smoke tests', () => {
  test('home page loads, has no console errors, and contains all sections', async ({
    page,
    consoleErrors,
  }) => {
    await page.goto('/')

    // The MonogramLoader pins `body { overflow: hidden }` and covers the
    // page for up to ~2.8s at boot. Wait for it to unmount before
    // asserting anything that touches layout or scroll.
    await waitForPageReady(page)

    // --- Page loads ---
    await expect(page).toHaveTitle(/Lovepreet/)

    // --- All required section anchors exist ---
    for (const id of ['hero', 'work', 'about', 'experience', 'contact']) {
      await expect(page.locator(`#${id}`), `#${id} should exist`).toBeVisible()
    }

    // --- Page can scroll from Hero to Contact ---
    await expect(page.locator('#hero')).toBeInViewport()
    await scrollToSection(page, 'contact')

    // The page fits horizontally at desktop width (no horizontal overflow).
    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    )
    expect(hasHorizontalOverflow).toBe(false)

    // --- No console or uncaught errors during the test ---
    const summary = consoleErrors.map((e) => `[${e.kind}] ${e.text}`).join('\n  ')
    if (summary) {
      console.error('Console errors captured during the test:\n  ' + summary)
    }
    expect(consoleErrors).toEqual([])
  })

  test('project rooms render all five projects with accessible links and room metadata', async ({
    page,
    consoleErrors,
  }) => {
    await page.goto('/')
    await waitForPageReady(page)
    await scrollToSection(page, 'work')

    // Confirm all five project rooms are rendered
    const rooms = page.locator('[data-project-room]')
    await expect(rooms).toHaveCount(5)

    // Confirm all five project titles are present
    const expectedProjects = [
      { title: 'FitGuide', slug: 'fitguide', roomType: 'fitness-lab' },
      { title: 'AI Studio', slug: 'ai-studio', roomType: 'ai-studio' },
      { title: 'LPSynch', slug: 'lpsynch', roomType: 'digital-workshop' },
      { title: 'HR Browser', slug: 'hr-browser', roomType: 'workstation' },
      { title: 'Rego Kernel', slug: 'rego-kernel', roomType: 'terminal-bay' },
    ]

    for (const proj of expectedProjects) {
      const room = page.locator(`[data-project-room][data-room-type="${proj.roomType}"]`)
      await expect(room).toBeVisible()
      await expect(room.getByRole('heading', { name: proj.title })).toBeVisible()
      const link = room.locator(`a[href="/work/${proj.slug}"]`).first()
      await expect(link).toBeVisible()
    }

    const summary = consoleErrors.map((e) => `[${e.kind}] ${e.text}`).join('\n  ')
    if (summary) {
      console.error('Console errors captured during the test:\n  ' + summary)
    }
    expect(consoleErrors).toEqual([])
  })

  test('interactive project room entrance and detail page workflow with back navigation', async ({
    page,
    consoleErrors,
  }) => {
    // 1. Visit Work
    await page.goto('/')
    await waitForPageReady(page)
    await scrollToSection(page, 'work')

    // 2. Verify all five Project Rooms
    const rooms = page.locator('[data-project-room]')
    await expect(rooms).toHaveCount(5)

    // 3. Click FitGuide "Explore project"
    const fitguideRoom = page.locator('[data-project-room][data-room-type="fitness-lab"]')
    await expect(fitguideRoom).toBeVisible()
    const exploreBtn = fitguideRoom.getByRole('link', { name: /explore project/i })
    await expect(exploreBtn).toBeVisible()
    await exploreBtn.click()

    // 4. Verify URL becomes /work/fitguide
    await expect(page).toHaveURL(/\/work\/fitguide/)

    // 5. Verify FitGuide title appears
    await expect(page.getByRole('heading', { name: 'FitGuide', level: 1 })).toBeVisible()

    // 6. Verify project visual appears
    await expect(page.locator('.project-visual')).toBeVisible()

    // 7. Verify existing factual technologies appear
    for (const tech of ['React Native', 'Expo', 'TypeScript', 'Supabase', 'AI']) {
      await expect(page.locator('main').getByText(tech, { exact: true })).toBeVisible()
    }

    // Case-study fields verification (FitGuide verified overview)
    await expect(page.getByRole('heading', { name: 'Overview' })).toBeVisible()
    await expect(
      page.getByText('FitGuide combines React Native and Supabase with an AI coach layer'),
    ).toBeVisible()

    // Capture screenshot of the project detail page
    await page.screenshot({ path: 'tests/screenshots/project-detail.png', fullPage: false })

    // 8. Verify Back to projects exists
    const backBtn = page.getByRole('link', { name: /back to projects/i }).first()
    await expect(backBtn).toBeVisible()

    // 9. Navigate back
    await backBtn.click()

    // 10. Verify Work remains functional
    await expect(page.locator('#work')).toBeInViewport()
    await expect(page.locator('[data-project-room]')).toHaveCount(5)
    await expect(page.locator('[data-project-room]').first()).toHaveCSS('opacity', '1')
    await page.screenshot({ path: 'tests/screenshots/work-after-back.png', fullPage: false })

    const summary = consoleErrors.map((e) => `[${e.kind}] ${e.text}`).join('\n  ')
    if (summary) {
      console.error('Console errors captured during the test:\n  ' + summary)
    }
    expect(consoleErrors).toEqual([])
  })

  test('persistent character interaction from Work through Contact and hiding after', async ({
    page,
    consoleErrors,
    captureCheckpoint: capture,
  }) => {
    // A. Open the home page.
    await page.goto('/')
    await waitForPageReady(page)

    // B. Confirm the Hero character exists.
    const heroCharacter = page.locator('#hero .hero-character')
    await expect(heroCharacter).toBeVisible()
    await capture('hero')

    // Initial state: persistent character starts hidden (opacity 0)
    await expectCharacterHidden(page)

    // C. Scroll to #work.
    await scrollToSection(page, 'work')

    // D. Wait for the persistent character transition.
    // E. Verify the persistent character becomes visible.
    await expectCharacterVisible(page)
    await capture('work')

    // F. Scroll to #about.
    await scrollToSection(page, 'about')

    // G. Verify the persistent character remains visible.
    await expectCharacterVisible(page)
    await capture('about')

    // H. Scroll to #experience.
    await scrollToSection(page, 'experience')

    // I. Verify it remains visible.
    await expectCharacterVisible(page)
    await capture('experience')

    // J. Scroll to #contact.
    await scrollToSection(page, 'contact')

    // K. Verify it remains visible.
    await expectCharacterVisible(page)
    await capture('contact')

    // L. Scroll past the Contact section.
    // In this layout, the footer below #contact is 254px tall while the GSAP
    // ScrollTrigger hide rule triggers at `bottom 30%` of the viewport (216px).
    // To allow the browser to physically scroll past contact so the trigger fires,
    // we attach a temporary scroll runway past the footer.
    await page.evaluate(() => {
      const spacer = document.createElement('div')
      spacer.setAttribute('data-test-scroll-runway', 'true')
      spacer.style.height = '1000px'
      document.body.appendChild(spacer)
      const contact = document.getElementById('contact')!
      const target = contact.getBoundingClientRect().bottom + window.scrollY - window.innerHeight * 0.2
      window.scrollTo(0, target)
    })

    // M. Verify the persistent character becomes hidden.
    await expectCharacterHidden(page)
    await capture('after-contact')

    const summary = consoleErrors.map((e) => `[${e.kind}] ${e.text}`).join('\n  ')
    if (summary) {
      console.error('Console errors captured during the test:\n  ' + summary)
    }
    expect(consoleErrors).toEqual([])
  })
})
