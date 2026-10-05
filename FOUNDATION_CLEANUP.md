# Foundation cleanup — Phase 2

> **Scope:** clean → fix → verify. No redesign, no new visual language, no new sections, no new animations, no character work.
> **Branch:** `redesign/illustrated-portfolio` (created from `main` @ `e852f4f`)
> **Checkpoint:** `main` remains at `e852f4f "Phase 1: repository audit"` — untouched and fully recoverable. No history was rewritten.

---

## 0. Git checkpoint

| Ref | Commit | State |
|---|---|---|
| `main` | `e852f4f` Phase 1: repository audit | **Preserved, unmodified** |
| `redesign/illustrated-portfolio` | branched from `e852f4f` | All Phase 2 work happens here |
| Original | `736da54` Initial commit | Untouched |

**Also fixed (repository config, not history):** `.git/config` contained literal `user.name=--global` and `user.email=--global` — the result of a previously mis-run `git config user.name --global`. Left unset so the correct global identity (`lovepreetparmar <lplovepreetparmar@gmail.com>`) applies. This is a local-config fix only; no commits were altered.

---

## 1. Files removed — 53 total (48 source files, ~1,730 lines, plus 5 Markdown docs)

**Removal was gated on evidence:** an import-graph traversal from `src/main.tsx` identified orphans, and an independent grep of *every* import statement in the repo confirmed that **each reference to a candidate module originated from a candidate module** — zero references from live code. Markdown files were separately confirmed to be referenced by no `.ts`, `.tsx`, `.html`, or `.json` file.

### 1a. Orphaned source — 48 files (~1,730 lines)

| Group | Files | Lines |
|---|---:|---:|
| `src/experience/**` (abandoned 8-chapter scroll experience: `ScrollController`, `ChapterManager`, `ChapterOverlay`, `GlobalCanvas`, `HeroObject`, `SceneManager`, `slab/*`, stores) | 18 | 797 |
| `src/scenes/**` (abandoned R3F scenes: Boot, Identity, Developer, Code, Work, AI, Journey, Contact, Hero, ParticleField) | 10 | 373 |
| `src/sections/**` — superseded dark-theme sections: `Intro`, `BootSequence`, `AISection`, `Projects`, `Skills` | 5 | 183 |
| `src/hooks/**` — `useChapter`, `useMobile`, `usePointer`, `useScrollProgress`, `useWebGL` | 5 | 111 |
| `src/components/**` — `Preloader`, `IndexMenu`, `ChapterIndicator`, `SlabFallback` | 4 | 146 |
| `src/animations/**` — `hero.ts`, `masterTimeline.ts` | 2 | 55 |
| `src/data/navigation.ts` (dead nav data, contained the broken `#home`/`#experience` targets) | 1 | 18 |
| `src/pages/Lab/LabPage.tsx` (superseded by `LabRedirect`) | 1 | 26 |
| `src/lib/performance.ts` (DPR cap + particle tier; R3F-only helpers) | 1 | 13 |
| `src/styles/experience.css` (imported globally, styled nothing live) | 1 | 7 |
| **Total** | **48** | **~1,730** |

Corresponding import removed from `src/main.tsx` (`import '@/styles/experience.css'`).

### 1b. Obsolete Markdown — 5 files

| File | Reason |
|---|---|
| `SHAPESHIFTER_ARCHITECTURE.md` | Superseded single-"Slab" 3D actor direction |
| `DIGITAL_PLAYGROUND_ARCHITECTURE.md` | Superseded "playground acts" direction |
| `EXPERIENCE_ARCHITECTURE.md` | Superseded 8-chapter scroll-experience spec (describes deleted files) |
| `IMPLEMENTATION_PLAN.md` | Stale phase plan pointing at the abandoned R3F hero; deployment facts already captured in `PORTFOLIO_AUDIT.md` §14 |
| `LEGACY_CONTENT_MAP.md` | Derived entirely from the legacy repository that must be ignored |

**Kept:** `CHARACTER_PORTFOLIO_ARCHITECTURE.md` (the current design direction for the redesign), `README.md`, and the three Phase 1 deliverables (`PORTFOLIO_AUDIT.md`, `CONTENT_INVENTORY.md`, `ASSET_INVENTORY.md`).

### 1c. Result

```text
Before: 86 .ts/.tsx + 4 .css = 3,595 lines  →  48 dead files / 1,730 lines (48%)
After:  39 .ts/.tsx + 3 .css = 1,931 lines  →  39/39 reachable, 0 dead files
```

---

## 2. Dependencies removed

| Package | Evidence | Kept? |
|---|---|---|
| `lucide-react` ^1.49.0 | Grep across `src/`, `index.html`, `vite.config.ts`, `tsconfig*`, `.oxlintrc` → **zero references**; only the `package.json` entry existed | ✅ Removed via `npm uninstall` |
| `three`, `@react-three/fiber`, `@react-three/drei`, `three-stdlib`, `@types/three` | Unused by live code, but **explicitly retained** for a possible selective R3F use in the redesign | **Kept — not removed** |

No dependencies were installed. `package-lock.json` updated only by the uninstall; **0 vulnerabilities** reported by npm.

**Bundle effect:** CSS 37.53 → **33.04 kB** raw (7.23 → 6.69 kB gzip) because Tailwind no longer scans dead files. Main JS 375.71 → 376.41 kB (the dead code was never bundled; the small increase is the new Lenis anchor logic).

---

## 3. Bugs fixed

### A. Broken loader colour tokens

`MonogramLoader` used `border-paper` (×4) and `bg-paper` — `--color-paper` was never defined, so Tailwind emitted neither class (verified absent from the built CSS). Result: the four corner brackets fell back to `currentColor` (dark ink) and the progress fill rendered transparent, so the bar appeared never to fill.

**Fix:** swapped to the existing theme-consistent `border-white` / `bg-white`. `--color-white` ships with Tailwind's default palette and is already used elsewhere in the design (`bg-white/30`, `bg-white/80`), so the intended light-on-cream appearance is restored with **no design change**. Verified in built CSS: `border-white` ✓, `bg-white` ✓, `paper` → 0 occurrences.

Every other undefined token found in the audit (`bg-base`, `text-paper`, `--color-border`, `--color-surface`, `var(--muted)`, `var(--black)`, `var(--white)`, `--color-bg`) lived only in files that were deleted. A re-scan of the surviving source found **zero undefined tokens**.

### B. Dead anchors — `#home` and `#experience`

- Added `id="experience"` to the Experience section (`src/sections/Experience/Experience.tsx`).
- Added `id="home"` to `<main>` in `src/pages/Home/Home.tsx` — `<main>` starts at the top of the document (the header is `fixed`), so `#home` resolves to the same position as the top of the page.
- The other dead anchor source, `src/data/navigation.ts`, was deleted.

Verified against the production bundle — every element id present: `home`, `hero`, `experience`, `work`, `about`, `contact`, `stack`; every hash link emitted: `#work` (×2), `#about`, `#contact`, `#hero`. **Every hash link now has a matching target; no dead anchors remain.**

### C. Lenis anchor scrolling

`src/components/transitions/SmoothScroll.tsx` now routes in-page anchors through Lenis instead of letting the browser jump natively:

- Document-level click handler matches `a[href^="#"]` with a strict `^#[\w-]+$` guard (no invalid-selector throws).
- Resolves the target, subtracts the live `header` height so content is not hidden under the fixed nav.
- `lenis.scrollTo(top, { duration: 1.1 })` when Lenis is active; instant `window.scrollTo` when `prefers-reduced-motion` disables Lenis.
- `history.pushState(null, '', hash)` preserves native back-button behaviour for anchors.
- Targets that do not exist on the current page are left to native browser behaviour.

Lenis itself was **not replaced or reconfigured** — duration, `smoothWheel`, `touchMultiplier`, and the `ScrollTrigger.update` wiring are unchanged. The ticker/listener lifecycle now also has a correctly paired cleanup.

### D. Mobile menu accessibility (`Navigation.tsx`)

The full-screen menu overlay stayed `opacity-0 pointer-events-none` + `aria-hidden` when closed, but its links remained in the tab order — keyboard users could tab into invisible links.

**Fix:** added `inert={!open}` on the overlay (React 19 boolean attribute; removes it from both the accessibility tree and focus navigation) plus `id="mobile-menu"` and `aria-controls="mobile-menu"` on the toggle button to pair it with `aria-expanded`. No visual change — the closed state is byte-identical.

### E. Custom cursor (`CustomCursor.tsx`)

- **Fixed an unbounded `requestAnimationFrame` leak:** the rAF loop was never cancelled — its cleanup removed only the event listeners, so the callback kept rescheduling forever after unmount (e.g. when a resize crossed the mobile breakpoint and the component returned `null`). The frame id is now stored and passed to `cancelAnimationFrame` on cleanup.
- **Native pointer intentionally preserved.** The custom cursor is a *pure additive enhancement*: its elements are `pointer-events-none` and `aria-hidden`, it never sets `cursor: none`, and it disables itself entirely on mobile and under `prefers-reduced-motion`. The real OS pointer, text selection, caret, and all hover affordances therefore remain fully usable — if the JS fails or the enhancement is off, nothing is lost.

### F. Router / loader gating (`App.tsx`, `MonogramLoader.tsx`)

**Before:** `{ready ? <RouterProvider/> : null}` — `#root` was genuinely empty until the loader finished (≈1.0 s, up to 2.8 s), so crawlers and assistive technology saw no document at all.

**After:** `<RouterProvider>` mounts **immediately**; the loader is a visual overlay only (`fixed inset-0 z-[100]`), still rendering the identical "LP" bracket + progress bar, still completing on `document.fonts.ready` with the 2.8 s fallback, and still skipped entirely under `prefers-reduced-motion`.

To preserve previous behaviour with content now mounted behind it:
- the loader holds `document.body.style.overflow = 'hidden'` so the page cannot be scrolled blind while it is up, restoring the previous value on cleanup;
- the loader root is marked `aria-hidden="true"` (it is decorative and contains no focusable elements) so screen readers reach the real page directly;
- `finish` was converted to `useCallback`, removing the stale-deps lint warning.

**Accepted, documented timing nuance:** the Hero's existing GSAP intro now runs as the app mounts rather than after it, so the headline reveal finishes just as (or slightly before) the loader fades. Same animation, same curves, same order — only the start offset moved.

---

## 4. Content leaks removed

Only development-facing text was removed or neutralised. **No new claims, metrics, clients, employers, features, or copy were added.**

| Location | Before | After |
|---|---|---|
| `data/projects.ts` — HR Browser | "…**case study details pending repository verification.**" | "Desktop HR tooling built with Electron and React." |
| `data/projects.ts` — Rego Kernel | "…**verify architecture and features before launch.**" | "AI-backed web platform with a FastAPI service layer." |
| `sections/Experience/Experience.tsx` | Footnote: "Post-2019 project work is documented under Work; **add employers here when you want them published.**" | Removed entirely |
| `pages/Experiments/ExperimentsPage.tsx` | "…— **more demos landing soon**." | "Small playgrounds for motion, type, and interaction." (forward promise dropped) |
| `pages/Experiments/ExperimentDetailPage.tsx` | "Interactive build — **coming in a later phase**." | "Interactive demo not available yet." (internal phrasing language removed) |

Verified against the production bundle: **0 occurrences** of `pending repository`, `verify architecture`, `add employers`, `later phase`, `landing soon`.

Unchanged and still accurate: all project descriptions overviews, technologies, the four experience entries, the 19 skills, the bio, and all contact/social data.

---

## 5. SEO fixes

### `index.html`

| Item | Before | After |
|---|---|---|
| `<title>` | Lovepreet Parmar — **Full Stack Developer** | Lovepreet Parmar — **Software Developer** |
| `og:title` | Full Stack Developer | Software Developer |
| `meta description` | "…a **full stack developer** building web, mobile, AI and interactive digital experiences." | "…a **software developer** building web, mobile, and AI-powered experiences." (now byte-identical to `SITE_DESCRIPTION` in `lib/constants.ts`) |
| `og:description` | mismatched | matches the description |
| `robots` | absent | `<meta name="robots" content="index, follow" />` |
| `og:url`, `og:site_name` | absent | added (`https://lovepreetparmar.com/`, `Lovepreet Parmar`) |
| `twitter:card` | `summary_large_image` (false — no image exists) | `summary` (accurate) |

**No OG image was fabricated.** A commented-out TODO documents exactly what to add when real artwork exists (`/og.png`, 1200×630) and that `twitter:card` should return to `summary_large_image` at that point. Verified: the only **active** `twitter:card` is `summary`, and no active `og:image` tag exists.

### `src/components/common/Seo.tsx`

- `jobTitle` in the JSON-LD `Person` block: `Full Stack Developer` → `Software Developer`.
- Canonical normalisation: the site root now emits `https://lovepreetparmar.com/` (trailing slash), matching `index.html` instead of the previous slash-less form. Per-route canonicals unchanged.

### `public/sitemap.xml`

Was **1 URL**. Now **10 URLs** — every real content route:

`/` · `/experiments` · `/experiments/{magnetic-type, liquid-type, particle-lp}` · `/work/{fitguide, ai-studio, lpsynch, hr-browser, rego-kernel}`

`/lab` is deliberately excluded (it is a redirect to `/experiments`), as is the 404 route. All URLs are derived from code that exists — none invented.

### `public/robots.txt`

Unchanged — already correct (`User-agent: * / Allow: /` + sitemap pointer).

---

## 6. Intentionally preserved

| Preserved | Why |
|---|---|
| **`src/data/` content layer** — `projects.ts`, `experience.ts`, `skills.ts`, `social.ts`, `experiments.ts` + `src/types/portfolio.ts` | The data-driven architecture is the foundation of the redesign. Only dev-notes were trimmed from it; no structure changed |
| **All visual design** — palette, typography, spacing, layout, section order, hero copy | Explicitly out of scope |
| **The placeholder character** (`CharacterCanvas`, `AnimatedCharacter`, `CharacterExpressionContext`) | Renderer swap belongs to the next phase |
| **Hero entrance animation, Work scroll reveals, breathing keyframe** | No animations added, removed, or altered |
| **Lenis + GSAP ScrollTrigger wiring** | Only the anchor path was added |
| **Routes** — `/`, `/experiments`, `/experiments/:slug`, `/lab`, `/work/:slug`, `*` | Untouched |
| **`lucide-react`-free but Three.js group intact** — `three`, `@react-three/fiber`, `@react-three/drei`, `three-stdlib`, `@types/three` | Held pending the selective-use decision |
| **`public/.htaccess`, `robots.txt`, `favicon.svg`, `icons.svg`, `src/assets/*`** | No assets were deleted in this phase |
| **`CHARACTER_PORTFOLIO_ARCHITECTURE.md`** | Current design direction |
| **Accessibility baseline** — `useReducedMotion` guards, `focus-ring`, `aria-label`s, `role="img"` | Strengthened, never weakened |

## 7. Deferred to the redesign

- Character artwork / renderer (`public/character/` is still README-only).
- Real project screenshots replacing the CSS wireframe mocks in `ProjectVisual`.
- `og:image` creation — documented as a TODO, not fabricated.
- Self-hosting Inter + Space Grotesk (currently Google Fonts CDN).
- Favicon set (`.ico` + PNG) and a brand mark beyond the "LP" monogram.
- Decisions on `src/assets/hero.png` (unused 3D render), `src/assets/react.svg`, `src/assets/vite.svg`, `public/icons.svg`.
- Replacing the untouched Vite-template `README.md`.
- Three.js / R3F keep-or-drop decision.
- Reconciling `PORTFOLIO_AUDIT.md` — it is a **pre-cleanup snapshot** and still describes the 48 dead files; read it together with this document.
- Nav IA (e.g. whether an Experience link should appear), loader redesign, and any new sections.

## 8. Remaining technical concerns

1. **Cross-page anchors.** `SiteNavigation` is shared by every route but `#work` / `#about` / `#contact` only exist on `/`. On `/experiments` those links change the hash without scrolling. Not addressed — fixing it would mean changing navigation behaviour, which this phase excludes.
2. **No `id="experience"` link exists.** The target is now valid, but nothing links to it (the nav data that did was dead and removed). Add a nav entry if wanted during the redesign.
3. **React 19 lint warnings (0 errors, 9 warnings), all understood:**
   - `router.tsx` ×6 + `CharacterExpressionContext` — `only-export-components`: inherent to a router module and to a context file exporting a hook; affects Fast Refresh only, not production.
   - `Footer.tsx` — `purity` on `new Date()` for the copyright year; harmless, evaluates once per render.
   - `AnimatedCharacter.tsx` — `set-state-in-effect` syncing the `expression` prop to local state; benign, and the component is reserved for the character phase.
4. **SPA prerendering still absent** — meta tags are static now (good), but content still requires JS execution; no SSR/SSG. Acceptable for a static Hostinger deployment.
5. **No tests or CI.** Suggested gate before any further work: `tsc -b && oxlint src && vite build`.
6. **Entry chunk ≈ 158 kB gzip** (JS) — Home is eager by design so crawlers see content; route-level splitting exists only for sub-routes.
7. **Vite deprecation warning:** `vite.config.ts` uses `__dirname`, unsupported by the future `configLoader: 'native'` default. Harmless today; switch to `import.meta.dirname` when touching the config.
8. **`.DS_Store`** files still exist locally (untracked and gitignored).
9. **`public/character/README.md`** still references `images/all/bg1_new.jpg` from the legacy repository — left alone, but it should be rewritten when character work begins.

---

## 9. Verification results

| Check | Command | Result |
|---|---|---|
| Orphan scan | import-graph traversal from `src/main.tsx` | **39 / 39 reachable · 0 dead files** |
| TypeScript | `npx tsc -b` | **PASS — exit 0, no errors** (strict mode, `noUncheckedIndexedAccess`) |
| Lint | `npx oxlint src` | **PASS — exit 0 · 0 errors · 9 warnings** (all catalogued in §8.3; down from 15) |
| Production build | `npm run build` (`tsc -b && vite build`) | **PASS — exit 0 · 65 modules · built in 94 ms** |
| Bundle | — | `index.js` 376.41 kB (124.82 gz) · `jsx-runtime` 101.00 kB (33.57 gz) · CSS **33.04 kB (6.69 gz)** — CSS down 12% raw |
| Token check | built CSS | `border-white` ✓ · `bg-white` ✓ · `paper` → **0** |
| Anchor check | built JS | ids `home` `hero` `experience` `work` `about` `contact` `stack`; links `#work` `#about` `#contact` `#hero` — **all resolve** |
| Leak check | built JS + HTML | `pending repository` `verify architecture` `add employers` `later phase` `landing soon` → **0 occurrences** |
| Meta check | `dist/index.html` | title `Lovepreet Parmar — Software Developer` ✓ · `robots: index, follow` ✓ · active `twitter:card: summary` ✓ · no active `og:image` ✓ (TODO documented in a comment) |
| Dead-module check | built JS | `GlobalCanvas` `SceneManager` `ChapterOverlay` `SlabFallback` `IndexMenu` `BootSequence` `LabPage` `masterTimeline` → **0 occurrences** |
| npm audit | `npm uninstall` | **0 vulnerabilities** |

---

**Phase 2 complete: CLEAN → FIX → VERIFY → STOP.** No visual design, hero, character, sections, animations, or routes were changed.
