# Portfolio audit — `lpportfolio`

> Phase 1 — inspection only. No code, dependency, route, or configuration changes were made.
> Repository: `git@github-lovepreet:lovepreetparmar/lpportfolio.git` · Branch: `main` · Single commit `736da54 "Initial commit: character-led portfolio site"` · Working tree clean at time of audit.

---

## 1. Snapshot

| Metric | Value |
|---|---|
| Framework | React 19.3.0 + TypeScript 6.0.3 |
| Build | Vite 8.3.1 (`tsc -b && vite build`) |
| Styling | Tailwind CSS 4.3.3 (CSS-first, `@tailwindcss/vite`) |
| Routing | React Router DOM 7.18.4 (`createBrowserRouter`) |
| Motion | GSAP 3.15.0 + ScrollTrigger, Lenis 1.3.26 |
| 3D | three 0.186.1, @react-three/fiber 9.8.1, drei 10.7.9 — **installed but not shipped** |
| Lint | oxlint 1.86.0 (warnings only, 0 errors) |
| Tests | **None** |
| CI/CD | **None** |
| Source files | 86 `.ts`/`.tsx` + 4 `.css` |
| Reachable from `main.tsx` | **39 of 86 modules (45%)** |
| Lines of code | ~3,595 total → **1,865 live / 1,730 dead (48% dead)** |
| Build output | `index.js` 375 KB raw / **123 KB gzip** + `jsx-runtime` 101 KB / 33 KB gzip + CSS 37 KB / 7 KB gzip |
| Character artwork | **None** — placeholder inline SVG only |
| Project imagery | **None** — procedural CSS wireframe mocks |

---

## 2. Current framework, build system and configuration

**Runtime / language**

- React `19.3.0`, React DOM `19.3.0`, TypeScript `~6.0.3`, `"type": "module"`.
- Node on this machine: `v22.17.0`, npm `10.9.2`. No `engines` field declared in `package.json`.

**Scripts** (`package.json`)

| Script | Command |
|---|---|
| `dev` | `vite` |
| `build` | `tsc -b && vite build` |
| `lint` | `oxlint` |
| `preview` | `vite preview` |

**Vite** (`vite.config.ts`)

- Plugins: `@vitejs/plugin-react` (6.1.1), `@tailwindcss/vite` (4.3.3).
- Single alias: `@` → `./src`.
- No `base`, no `build.rollupOptions`, no manual chunks, no proxy, no `define`.

**TypeScript project references**

- `tsconfig.json` → references `tsconfig.app.json` + `tsconfig.node.json`.
- App config: `strict`, `noUnusedLocals`, `noUnusedParameters`, `noUncheckedIndexedAccess`, `noFallthroughCasesInSwitch`, `verbatimModuleSyntax`, `erasableSyntaxOnly`, `moduleResolution: bundler`, `noEmit`, `jsx: react-jsx`, path alias `@/* → src/*`.
- `tsc -b` currently exits **0** with no errors.

**Linting**

- `.oxlintrc.json`: plugins `react`, `typescript`, `ocx`/`oxc`; `react/rules-of-hooks: error`, `react/only-export-components: warn`.
- `npx oxlint src` → **0 errors, 15 warnings** (set-state-in-effect, impure render calls, exhaustive-deps, fast-refresh export shape).

**Not present**

- No `tailwind.config.*` and no `postcss.config.*` (correct for Tailwind v4 CSS-first).
- No ESLint/Prettier, no Husky/lint-staged, no test runner, no `.github/workflows`, no Docker, no Vercel/Netlify/Cloudflare config.

**Entry chain**

```text
index.html  (#root, Google Fonts, meta/OG/canonical)
  └─ src/main.tsx        → StrictMode → <App/>, imports globals.css + experience.css
       └─ src/App.tsx    → <SmoothScroll> wraps <Seo/> <CustomCursor/> <MonogramLoader/> <RouterProvider/>
            └─ src/router.tsx → createBrowserRouter (Home eager, all others React.lazy + Suspense)
```

---

## 3. Application architecture

**Live architecture (what actually renders):**

```text
App
├── SmoothScroll            Lenis ↔ gsap.ticker ↔ ScrollTrigger.update (bails on prefers-reduced-motion)
├── Seo                     document.title, meta description/OG, canonical, JSON-LD Person
├── CustomCursor            rAF-lerped dot + [data-cursor] label; disabled on mobile / reduced motion
├── MonogramLoader          "LP" boot overlay; gates <RouterProvider> until complete (or instantly on reduced motion)
└── RouterProvider
    ├── /                HomePage
    │   └── CharacterExpressionProvider
    │       ├── SiteNavigation        fixed header + full-screen mobile overlay
    │       ├── Hero                  headline + AnimatedCharacter + MagneticButton + GSAP intro
    │       ├── Work                  5 featured projects, GSAP ScrollTrigger reveals, ProjectVisual mocks
    │       ├── About                 bio + AnimatedCharacter (working/happy) + fact list
    │       ├── ExperienceSection     4 timeline entries (no section id — see §14)
    │       ├── Stack                 19 skills as typographic list, drives character "thinking"
    │       ├── Contact               headline + mailto + 3 social links + AnimatedCharacter
    │       └── Footer                name, socials, email, back-to-top (#hero)
    ├── /experiments, /experiments/:slug    lazy, placeholder content
    ├── /lab                               lazy, <Navigate to="/experiments" replace>
    ├── /work/:slug                        lazy, data-driven detail page
    └── *                                  lazy, 404
```

**State management:** no store library. One React context (`CharacterExpressionContext`) plus module-scoped mutable objects in the orphaned `experience/` folder (`pointerStore`, `experienceState`, `playgroundStore`, `slabStore`) that are never mounted.

**Data layer:** all copy lives in `src/data/*.ts` and is typed by `src/types/portfolio.ts`. Components receive data via import + props (no fetch, no CMS, no `localStorage`).

---

## 4. Folder structure

```text
lpportfolio/
├── index.html                     meta, OG, canonical, Google Fonts (Inter + Space Grotesk)
├── vite.config.ts                 react + tailwind plugins, @ alias
├── tsconfig{,.app,.node}.json     strict project references
├── .oxlintrc.json                 lint config
├── package.json / package-lock.json
├── README.md                      untouched Vite+React template readme
├── IMPLEMENTATION_PLAN.md         phase table (phases 0–4 done, 5–16 pending)
├── CHARACTER_PORTFOLIO_ARCHITECTURE.md   current design direction (character-led)
├── DIGITAL_PLAYGROUND_ARCHITECTURE.md    superseded "playground acts" direction
├── EXPERIENCE_ARCHITECTURE.md     superseded 8-chapter scroll experience spec
├── SHAPESHIFTER_ARCHITECTURE.md   superseded single-"Slab" 3D actor spec
├── LEGACY_CONTENT_MAP.md          legacy-repo → new-site mapping (legacy-derived)
├── CONTENT_INVENTORY.md           being replaced by this audit pass
├── public/
│   ├── .htaccess                  Apache SPA rewrite (→ Hostinger)
│   ├── favicon.svg                271 B "LP" monogram
│   ├── icons.svg                  5 KB SVG sprite (bluesky/discord/github/x/social/documentation) — never referenced
│   ├── robots.txt / sitemap.xml   sitemap lists homepage only
│   └── character/README.md        frame-pipeline instructions — folder contains no artwork
├── dist/                          build output (gitignored, present locally)
└── src/
    ├── main.tsx / App.tsx / router.tsx
    ├── assets/                    hero.png (unused), react.svg, vite.svg (template leftovers)
    ├── components/                15 files → 11 live, 4 orphaned
    ├── contexts/                  CharacterExpressionContext (live)
    ├── data/                      6 files → 5 live, navigation.ts orphaned
    ├── hooks/                     9 files → 4 live, 5 orphaned
    ├── lib/                       constants, utils live; performance.ts orphaned
    ├── pages/                     7 files → 6 live, LabPage.tsx orphaned
    ├── sections/                  11 files → 6 live, 5 orphaned
    ├── scenes/                    10 files → ALL ORPHANED (R3F scenes)
    ├── experience/                18 files → ALL ORPHANED (scroll/chapter/slab system)
    ├── animations/                3 files → utils.ts live, hero.ts + masterTimeline.ts orphaned
    ├── styles/                    globals + typography + animations live; experience.css orphaned content
    └── types/portfolio.ts         Project, Experience, Skill, SocialLink, NavigationItem
```

---

## 5. Pages and routes

Defined in `src/router.tsx` via `createBrowserRouter`:

| Route | Component | Loading | Notes |
|---|---|---|---|
| `/` | `HomePage` | eager (entry chunk) | Single-page anchor story |
| `/experiments` | `ExperimentsPage` | `React.lazy` + Suspense `"Loading…"` | Index of 3 experiments |
| `/experiments/:slug` | `ExperimentDetailPage` | lazy | Renders title/description + *"Interactive build — coming in a later phase."* |
| `/lab` | `LabRedirect` | lazy | `<Navigate to="/experiments" replace>` |
| `/work/:slug` | `ProjectPage` | lazy | Data-driven; shows "Project not found" fallback |
| `*` | `NotFoundPage` | lazy | 404 |

**Dead route/component:** `src/pages/Lab/LabPage.tsx` is never imported (superseded by `LabRedirect`).

There is **no** `/about`, `/contact`, `/work` index, or `/resume` route — About and Contact are homepage anchors only.

---

## 6. Components

### Live components

| Component | Path | Responsibility |
|---|---|---|
| `SiteNavigation` | `components/navigation/Navigation.tsx` | Fixed blurred header: wordmark "Lovepreet", 4 inline links + `mailto` CTA; mobile = text "Menu" button toggling a full-screen overlay |
| `AnimatedCharacter` | `components/AnimatedCharacter/` | State machine (`idle/looking/happy/curious/thinking/excited/working`), random blink loop, pointer-driven gaze, breathe animation |
| `CharacterCanvas` | `components/CharacterCanvas/` | **Placeholder** inline SVG figure (head, hair, body, phone), pupil offset ±6px, 3 mouth paths. Comment: *"Placeholder SVG until illustrated frames land in `public/character/`"* |
| `ProjectVisual` | `components/ProjectVisual/ProjectVisual.tsx` | 16:10 card with pointer-tilt; renders `phone` / `browser` / `desktop` / `custom` wireframe mocks from CSS only |
| `MagneticButton` | `components/Magnetic/MagneticButton.tsx` | Anchor with pointer-follow translate (12% of offset); disabled on mobile |
| `CustomCursor` | `components/cursor/CustomCursor.tsx` | 8px dot (lerp 0.18) + label from `data-cursor` (`VIEW/OPEN/PLAY/DRAG/MAIL`) |
| `MonogramLoader` | `components/UI/MonogramLoader.tsx` | "LP" bracket loader, progress bar, waits for `document.fonts.ready` with 2.8 s timeout |
| `SmoothScroll` | `components/transitions/SmoothScroll.tsx` | Lenis (`duration 1.1`, `smoothWheel`, `touchMultiplier 1.2`) driven by `gsap.ticker` |
| `Seo` | `components/common/Seo.tsx` | Title/description/OG/canonical + `schema.org/Person` JSON-LD |
| `Footer` | `components/common/Footer.tsx` | Name, "Software developer", copyright, socials, email, `#hero` back-to-top |
| `ProjectPage` nav/footer reuse | `pages/Project/ProjectPage.tsx` | Title, description, visual, "What it is", technology pills, optional GitHub/live links, prev/next |

### Orphaned components (never imported)

`common/Preloader.tsx` (56 lines), `navigation/IndexMenu.tsx` (53), `ChapterIndicator/ChapterIndicator.tsx` (24), `UI/SlabFallback.tsx` (13).

### Context

`CharacterExpressionContext` — `expression | setExpression | resetExpression`; `Work` sets `curious` on hover, `Stack` sets `thinking`, reset on leave; `Hero` reads it, `About`/`Contact` hardcode `happy`.

---

## 7. Styling system

- **Tailwind CSS v4**, imported as `@import 'tailwindcss'` in `src/styles/globals.css`. No JS config file; theme is declared with `@theme`.
- **Design tokens** (`@theme`): `--color-cream #f6f1e8`, `--color-ink #141210`, `--color-accent #e85d4c`, `--color-accent-muted #3d6b5a`, `--color-muted #6b6560`, `--color-line rgba(20,18,16,.12)`.
- **Duplicated `:root` block**: `--cream`, `--ink`, `--accent` (same values) + `--font-display 'Space Grotesk'`, `--font-body 'Inter'`, `--font-mono ui-monospace/SF Mono/Menlo`.
- **Fonts loaded from Google Fonts CDN** in `index.html` (`Inter 400/500/600`, `Space Grotesk 400/500/600/700`) with `preconnect`. No local font files, no self-hosting, no `font-display` control.
- **Utility classes** in `typography.css`: `.display-xl`, `.display-lg`, `.label-mono`, `.eyebrow`, `.body-lg`. Plus `.page-padding`, `.section-gap`, `.focus-ring`, `.sr-only`, `.character-breathe` keyframe in `globals.css`; `.scroll-hint` / `pulse-soft` in `animations.css` (**unused**).
- **Hand-rolled classnames** alongside Tailwind: `font-[family-name:var(--font-display)]` used ~20× instead of a `font-display` theme key.
- **`src/styles/experience.css`** is imported globally in `main.tsx` but only styles `.experience-track` and `#experience-root` — neither exists in the live tree — and references undefined `var(--white)`.

### Broken / undefined color tokens

| Token used | Where | Status |
|---|---|---|
| `bg-paper`, `border-paper`, `text-paper` | **`MonogramLoader` (live)**, `LabPage`, `SlabFallback` | `--color-paper` never defined → classes not generated (verified absent from built CSS) |
| `bg-base` | `IndexMenu`, `LabPage`, `SlabFallback` | undefined |
| `border-[var(--color-border)]`, `bg-[var(--color-surface)]` | orphaned `Skills`, `Projects`, `AISection` | undefined |
| `var(--muted)`, `var(--black)`, `var(--white)`, `var(--color-bg)` | `BootSequence`, `ChapterOverlay`, `experience.css`, `Preloader` | undefined |

**Live impact:** the MonogramLoader's four corner brackets fall back to `currentColor` (dark ink) and its progress fill renders transparent, so the bar appears never to fill.

---

## 8. Animation system

| Layer | Implementation | Where used |
|---|---|---|
| Smooth scroll | Lenis 1.3.26 attached to `gsap.ticker`, `lenis.on('scroll', ScrollTrigger.update)`, `lagSmoothing(0)` | Global (`App`) |
| Scroll reveals | `gsap.fromTo` + `ScrollTrigger` (`start: 'top 85%'`, `toggleActions: play none none reverse`) | `Work` items |
| Entrance timeline | `gsap.context` + `fromTo` stagger (headline lines 0.12 s, character scale, hints) | `Hero` |
| Loader fade | `gsap.to('.mono-loader', {opacity: 0})` | `MonogramLoader` |
| CSS keyframes | `character-breathe` 4 s, `pulse-soft` 2.4 s (`.scroll-hint` **unused**) | `AnimatedCharacter` |
| Pointer micro-interactions | inline `style.transform` on `pointermove` (not GSAP) | `MagneticButton`, `ProjectVisual` |
| Character gaze | normalized mouse → pupil offset ±6 px; random blink 2.5–6.5 s, 120 ms close | `AnimatedCharacter` |
| Custom cursor | rAF loop with `lerp 0.18`, scale ×3 on `[data-cursor]` hover | `CustomCursor` |

- Plugin registration is centralized in `animations/utils.ts` → `ensureGsapPlugins()` (also calls `prefersReducedMotion()` helper).
- **Every animation is gated by `useReducedMotion()`** (`prefers-reduced-motion: reduce`) — a genuine accessibility strength worth keeping.
- **Dead animation code:** `animations/hero.ts` (`runHeroIntro` targeting `.hero-lovepreet`/`.hero-parmar`, selectors that no longer exist) and `animations/masterTimeline.ts` (10 lines, imports orphaned `CHAPTERS`).

---

## 9. Dependencies

**`dependencies`**

| Package | Locked | Imported anywhere? | Verdict |
|---|---|---|---|
| `react` / `react-dom` | 19.3.0 | Yes | Keep |
| `react-router-dom` | 7.18.4 | Yes | Keep |
| `tailwindcss` + `@tailwindcss/vite` | 4.3.3 | Yes | Keep |
| `gsap` | 3.15.0 | Yes (ScrollTrigger) | Keep |
| `lenis` | 1.3.26 | Yes | Keep |
| `three` | 0.186.1 | Only orphaned `scenes/` + `experience/` | **Not in bundle** (verified: 0 `WebGLRenderer` matches in built JS) |
| `@react-three/fiber` | 9.8.1 | Only orphaned files | **Not in bundle** |
| `@react-three/drei` | 10.7.9 | Only orphaned files | **Not in bundle** |
| `three-stdlib` | 2.36.1 | Never imported directly (also a drei transitive) | Redundant direct dep |
| `lucide-react` | 1.49.0 | **Never imported** | Unused |

**`devDependencies`:** `@types/node` 24.13.3, `@types/react` 19.2.18, `@types/react-dom` 19.2.7, `@types/three` 0.186.0, `@vitejs/plugin-react` 6.1.1, `oxlint` 1.86.0, `typescript` 6.0.3, `vite` 8.3.1.

**Not installed but referenced by the future stack:** none — React, TypeScript, Vite, Tailwind, GSAP, ScrollTrigger, Lenis and React Router are all already present. Three.js/R3F/drei are present too (and would need a deliberate keep-or-drop decision).

**Transitive note:** `camera-controls` etc. arrive via drei; they only cost install time while R3F code stays unmounted.

---

## 10. Assets

Full detail in `ASSET_INVENTORY.md`.

- **No photographs, no videos, no project screenshots, no local font files, no character artwork** exist in the repository.
- `public/favicon.svg` (271 B, "LP" monogram) — in use.
- `public/icons.svg` (5,031 B, symbol sprite: bluesky, discord, github, x, social, documentation) — **never referenced by any code**.
- `public/character/` contains only `README.md` describing an intended WebP frame pipeline; **zero image files**.
- `src/assets/hero.png` (13 KB, 343×361) is an unused 3D "glass slab with purple glow" render from the abandoned Shapeshifter direction.
- `src/assets/react.svg`, `src/assets/vite.svg` — Vite template leftovers, unreferenced.
- `public/robots.txt`, `public/sitemap.xml` (homepage URL only), `public/.htaccess` (Apache SPA fallback).
- Untracked `.DS_Store` in repo root and `src/`.

---

## 11. Current homepage structure

Rendered in `src/pages/Home/Home.tsx`, top to bottom:

1. **`SiteNavigation`** — fixed, `bg-cream/80 backdrop-blur-md`, wordmark + `Work · About · Experiments · Contact` + `Let's talk →` mailto pill.
2. **`Hero`** (`#hero`, `min-h-[100svh]`, `pt-28 pb-16`) — 12-col grid:
   - eyebrow `Lovepreet Parmar`
   - H1 in three lines: **"I build" / "digital" / "things."** (last line `text-accent`), `clamp(2.8rem, 9vw, 6.5rem)`
   - sub: *"Software developer building web, mobile, and AI-powered experiences."*
   - mono line: `Web · Mobile · AI · Product`
   - `MagneticButton` → `#work` ("Explore my work →")
   - hint list `MOVE / DRAG / SCROLL`
   - `AnimatedCharacter state="idle" followCursor expression={expression}`
3. **`Work`** (`#work`) — header "Selected projects" + *"Product stories across mobile, web, and AI — hover to peek; open for case notes."*; 5 entries as full-width editorial rows (number, title, category, description, tech pills, "View project →", `ProjectVisual` mock).
4. **`About`** (`#about`) — character (`working`/`happy`) + two bio paragraphs + 4-item definition list (Role, Location, Interests, Background).
5. **`ExperienceSection`** — "Learning & roles", 4 timeline rows, closing note about post-2019 work.
6. **`Stack`** (`#stack`) — "I work with" + 19 skill names in a flowing typographic list (hover → character `thinking`).
7. **`Contact`** (`#contact`) — "Have an idea? / Let's build it." + copy + `Email me →` + visible email + GitHub/LinkedIn/Email links + character.
8. **`Footer`** — name, role, © year, socials, email, `Back to top ↑` → `#hero`.

There is **no** hero image, video, or 3D object — the character SVG is the only visual anchor.

---

## 12. Existing navigation

- **Desktop:** fixed header, inline anchors `#work`, `#about`, route link `/experiments`, `#contact`, plus mailto CTA.
- **Mobile:** text `Menu` button → full-screen `bg-cream` overlay (same 4 links at `text-4xl`), close by tapping a link.
- **Data-driven nav is dead:** `src/data/navigation.ts` (`Home · About · Work · Experience · Contact`) and `src/components/navigation/IndexMenu.tsx` (numbered full-screen index) are **never imported**.
- **Anchor integrity:** live nav targets `#work`, `#about`, `#contact` — all exist. `data/navigation.ts` also targets `#home` and `#experience`, and **neither id exists** anywhere (`Hero` uses `id="hero"`; the Experience section has only `aria-label`, no `id`). Footer's `#hero` is valid.

---

## 13. Existing responsive behavior

- Breakpoints follow Tailwind defaults; `useIsMobile()` matches `(max-width: 767px)` — aligned with `md:` at 768px.
- **Hero:** single column below `lg`, character below the copy; `lg:grid-cols-12` with `col-span-7` / `col-span-5`.
- **Work / About / Contact:** stack to one column below `lg`.
- **Navigation:** inline links `hidden md:flex`; mobile overlay below `md`.
- **Touch:** `CustomCursor`, pointer-gaze, `MagneticButton` and `ProjectVisual` tilt all auto-disable on mobile (or on `prefers-reduced-motion`).
- **Sizing:** fluid `clamp()`/`text-[clamp(...)]` type; `min-h-[100svh]` hero (modern viewport units, good for mobile browser chrome).
- **No** dedicated tablet layout, no landscape-specific handling, no `srcset`/`sizes` (no images to serve), no responsive images/fonts.

---

## 14. Existing deployment setup

- **Target:** static hosting on Hostinger — per `IMPLEMENTATION_PLAN.md`: *"Build: `npm run build` → `dist/`; Hostinger: upload `dist/*` to `public_html/`"*.
- `public/.htaccess` is copied into `dist/` automatically and provides the SPA fallback (`RewriteRule . /index.html [L]` for non-file/non-directory paths, plus `index.html` no-cache rule).
- **No CI/CD**: no GitHub Actions, no deploy script, no hosting config file. Deployment is a manual upload.
- **SEO files:** `robots.txt` (`Allow: /` + sitemap URL), `sitemap.xml` listing **only** `https://lovepreetparmar.com/`.
- **Canonical domain:** `https://lovepreetparmar.com` in `index.html` and `src/lib/constants.ts`.
- `dist/` exists locally from the last build (gitignored, not committed).

---

## 15. Dead code inventory (48 files, ~1,730 lines — 48% of the codebase)

Verified by import-graph traversal from `src/main.tsx`.

| Group | Files | Lines | What it is |
|---|---:|---:|---|
| `src/experience/**` | 18 | 797 | Abandoned 8-chapter scroll experience: `ScrollController`, `ChapterManager`, `ChapterOverlay`, `GlobalCanvas` (R3F), `HeroObject`, `SceneManager`, `slab/*` (device-morph presets for fitguide/ai-studio/lpsynch/hr-browser/rego-kernel) |
| `src/scenes/**` | 10 | 373 | Abandoned R3F scenes: Boot, Identity, Developer, Code, Work, AI, Journey, Contact, Hero, ParticleField |
| `src/sections/**` | 5 | 183 | Superseded dark-theme sections: `Intro`, `BootSequence`, `AISection`, `Projects`, `Skills` (all reference undefined CSS variables) |
| `src/hooks/**` | 5 | 111 | `useChapter`, `useMobile` (alias), `usePointer`, `useScrollProgress`, `useWebGL` |
| `src/components/**` | 4 | 146 | `Preloader`, `IndexMenu`, `ChapterIndicator`, `SlabFallback` |
| `src/animations/**` | 2 | 55 | `hero.ts`, `masterTimeline.ts` |
| `src/data/navigation.ts` | 1 | 18 | Unused nav data with broken anchors |
| `src/pages/Lab/LabPage.tsx` | 1 | 26 | Superseded by `LabRedirect` |
| `src/lib/performance.ts` | 1 | 13 | DPR cap + particle tier (R3F-only helpers) |
| `src/styles/experience.css` | 1 | 7 | Imported globally, styles nothing live |

**Live code: 39 modules ≈ 1,865 lines** (plus `globals.css`, `typography.css`, `animations.css`).

Note: because Tailwind v4 scans all source files, utilities referenced only by dead files (e.g. `border-[var(--color-border)]`) are still emitted into the shipped CSS.

---

## 16. What is reusable

| Asset | Why |
|---|---|
| **All of `src/data/*.ts`** (`projects`, `experience`, `skills`, `social`, `experiments`) + `src/types/portfolio.ts` | Real, typed, copy-out-of-components content — exactly what the redesign needs. Minor edits only (see `CONTENT_INVENTORY.md` §"Copy that must not ship") |
| **Route map** in `router.tsx` | `/`, `/work/:slug`, `/experiments`, `/experiments/:slug`, `/lab`, 404 — sensible IA; reuse the path scheme |
| **`useReducedMotion` + `useIsMobile` + `useMousePosition`** | Small, correct, already wired to every interaction |
| **`SmoothScroll` (Lenis ↔ GSAP)** | The exact integration the target stack calls for; drop-in |
| **`animations/utils.ts` (`ensureGsapPlugins`)** | Correct single registration point for ScrollTrigger |
| **`Seo.tsx` + `lib/constants.ts`** | Title/description/OG/canonical/JSON-LD handled centrally |
| **`CharacterExpressionContext`** | Clean pattern for letting sections drive the character's expression |
| **`AnimatedCharacter` public API** | `state` / `followCursor` / `expression` props are a good contract to preserve while swapping the artwork |
| **`CustomCursor` + `MagneticButton`** | Finished, performance-aware interactions with `data-cursor` labels |
| **`public/.htaccess`, `robots.txt`, `favicon.svg`** | Deployment-ready for the same domain |
| **Tailwind v4 token setup** (`@theme`, `label-mono`, `focus-ring`, `.page-padding`) | Works; only needs the palette re-tuned to the new art direction |
| **Accessibility baseline** | `prefers-reduced-motion` guards, `aria-label`s, `focus-ring`, semantic sections, `role="img"` on the character |
| **Strict TS + oxlint** | Zero type errors, zero lint errors — a healthy base |

---

## 17. What should be replaced

| Item | Reason |
|---|---|
| **`CharacterCanvas` placeholder SVG** | Explicitly a placeholder; needs the real illustrated character (this is the redesign's centerpiece) |
| **`ProjectVisual` wireframe mocks** | Generic CSS boxes stand in for real screenshots; every project needs genuine imagery |
| **Homepage visual language** | Editorial cream/ink layout is a baseline, not the target "illustrated world" |
| **`MonogramLoader`** | Uses undefined `bg-paper`/`border-paper` tokens; will be superseded by a character-led entry |
| **`SiteNavigation`** | Plain text header; the new concept needs a different wayfinding treatment |
| **Google Fonts CDN link** | Should become self-hosted (perf + privacy) with the final type selection |
| **`sitemap.xml` / `robots.txt` / OG tags** | Sitemap lists only `/`; `twitter:card=summary_large_image` has no image; title differs between `index.html` and `lib/constants.ts` |
| **Project detail page** | No images, no GitHub/live links, no real case-study fields filled in |
| **Experiments pages** | Titles + one-line descriptions only; detail page says "coming in a later phase" |
| **5 architecture/plan Markdown docs** | Contain three abandoned directions (Shapeshifter, Digital Playground, 8-chapter Experience) plus legacy-repo-derived content; will mislead future work once the new direction is fixed |

---

## 18. What should be removed

**Code (48 orphaned files, ~1,730 lines)** — all confirmed unreachable from `src/main.tsx`:

- Entire `src/experience/**` (18 files) and `src/scenes/**` (10 files) — the abandoned R3F scroll experience.
- Superseded sections: `Intro`, `BootSequence`, `AISection`, `Projects`, `Skills`.
- Orphaned components: `Preloader`, `IndexMenu`, `ChapterIndicator`, `SlabFallback`.
- Orphaned hooks: `useChapter`, `useMobile`, `usePointer`, `useScrollProgress`, `useWebGL`.
- `animations/hero.ts`, `animations/masterTimeline.ts`, `data/navigation.ts`, `pages/Lab/LabPage.tsx`, `lib/performance.ts`.
- `src/styles/experience.css` (and its import in `main.tsx`).

**Dependencies (do not remove during audit — flag for later):** `lucide-react` (never imported), `three`, `@react-three/fiber`, `@react-three/drei`, `three-stdlib`, `@types/three` (used only by dead code; ~all of R3F's install/bundle cost).

**Assets:** `src/assets/react.svg`, `src/assets/vite.svg`, `src/assets/hero.png`, `public/icons.svg` — all unreferenced.

**Hygiene:** `.DS_Store` (root + `src/`), and `dist/` should stay gitignored.

---

## 19. Technical risks and problems found

**Content correctness (highest risk — visible to the public today)**

1. **Developer TODO notes leak into live copy.** `projects.ts` ships: *"case study details pending repository verification"* (HR Browser) and *"verify architecture and features before launch"* (Rego Kernel). `Experience.tsx` renders: *"…add employers here when you want them published."*
2. **Two contradictory role titles.** `index.html` + JSON-LD say **"Full Stack Developer"**; `lib/constants.ts` says **"Software Developer"**; `Hero`/`Footer` say **"Software developer"**; About says *"an illustrator and developer"*.
3. **Experience timeline stops at 2019** and the source comment says *"extend with post-2019 roles before publish."*
4. **No evidence for any claim of project imagery, links, metrics, or results** — `github`/`liveUrl`/`image`/`video` and all case-study fields (`problem`, `solution`, `architecture`, `challenges`, `lessons`) are empty, so those UI branches never render.

**Functional / visual**

5. **Undefined color tokens** (§7): live bug in `MonogramLoader` — invisible progress fill, dark bracket corners; more breakage in any orphaned component if it is revived.
6. **Dead anchors** in `data/navigation.ts` (`#home`, `#experience`) and a missing `id="experience"` on the Experience section — anything using that data will silently fail.
7. **Anchor navigation bypasses Lenis.** `#work`/`#about`/`#contact` use native hash jumps; there is no `lenis.scrollTo()` wiring, so smooth-scroll and anchor jumps can fight each other.
8. **Loader gates the router:** no content is mounted (and no SEO-relevant DOM exists) until `MonogramLoader` finishes (~0.45 s minimum, up to 2.8 s on slow font loads). Crawlers that execute JS will see an empty `#root`.
9. **Mobile menu accessibility:** the overlay keeps `pointer-events-none opacity-0` with `aria-hidden` but its links remain keyboard-focusable.
10. **Custom cursor doesn't hide the native pointer**, so two cursors render simultaneously.

**SEO / distribution**

11. `sitemap.xml` lists only the homepage — `/experiments` and every `/work/:slug` are absent.
12. `twitter:card = summary_large_image` but **no `og:image`** anywhere; no favicon PNG/ICO fallback for platforms that ignore SVG.
13. SPA with no prerender/SSR: social link previews will not pick up per-route meta.
14. Google Fonts over CDN without `display=swap` control in the URL (relies on Google's default) and without self-hosting.

**Performance / architecture**

15. **48% dead code** inflates type-checking, linting, Tailwind's scan, and onboarding.
16. Entry chunk is **~157 KB gzip** (JS) before any route — React + Router + GSAP + Lenis + the whole Home tree in one chunk; only sub-routes are lazy.
17. **Three.js/R3F/drei are installed but unused** — heavy install and a standing temptation to ship a WebGL hero that the current direction doesn't need.
18. `Work` registers `ScrollTrigger` locally (`gsap.registerPlugin` at module scope) *and* `ensureGsapPlugins()` elsewhere — two registration paths.
19. `MonogramLoader`'s `useEffect` has a stale-deps warning (`finish` missing) and `Footer` calls `new Date()` during render (oxlint warnings).
20. No tests, no CI, no lockfile-drift check, no bundle-size budget — every change is verified manually.
21. Git history is a **single commit**, so there is no recoverable "last known good" state separate from `736da54`.
22. `README.md` is still the untouched Vite template readme.

**Verification performed:** `tsc -b` → 0 errors; `oxlint src` → 0 errors / 15 warnings; import-graph traversal → 39/86 reachable; built CSS inspected → `bg-paper`/`border-paper` absent; built JS inspected → no Three.js.

---

## 20. Recommended migration approach

**Key finding:** the target stack (React + TypeScript + Vite + Tailwind + GSAP + ScrollTrigger + Lenis + React Router + Three.js only where useful) is **already the installed stack**. This is a *re-skin and rebuild of the UI layer*, not a framework migration. Doing it as a rewrite-within-the-repo keeps content, routing, deployment, and domain intact.

**Phase 0 — Freeze and clean (low risk, no visual change)**
1. Delete the 48 orphaned files and `src/styles/experience.css` + its import; verify `tsc -b`, `oxlint`, and `vite build` still pass byte-for-byte-equivalent output for live routes.
2. Remove unused deps (`lucide-react`; and the R3F group if no 3D is planned) in a separate, reviewable commit.
3. Fix live content leaks (TODO notes, title inconsistency, missing `#experience` id) and the `bg-paper` token bug — these are correctness fixes, not redesign.

**Phase 1 — Content truth pass**
4. Re-verify every string in `CONTENT_INVENTORY.md` against the repo; decide the final role title, experience additions, and which of the 5 projects are publishable.
5. Collect real assets: character artwork, project screenshots, GitHub/live URLs, `og:image`.

**Phase 2 — Design system for the illustrated world**
6. Re-tune `@theme` tokens, type scale, and spacing for the new art direction; keep `label-mono` / `focus-ring` / `page-padding` conventions.
7. Keep the data layer and `AnimatedCharacter`'s prop contract; replace only the renderer (placeholder SVG → illustrated frames under `public/character/`).

**Phase 3 — Build the new experience**
8. New homepage composition (character-led hero, world/scroll narrative) using GSAP ScrollTrigger + Lenis; route a single new `Home` component through the existing router so `/work/:slug` and `/experiments` keep working.
9. Use Three.js/R3F **only** if a specific element genuinely needs it; otherwise drop the dependency entirely rather than reviving `src/experience/**`.

**Phase 4 — Hardening**
10. Self-hosted fonts, real imagery, sitemap/OG/JSON-LD fixes, mobile-menu focus handling, `lenis.scrollTo` for anchors, route-level code splitting for Home.
11. Add a minimal CI job (`tsc -b && oxlint && vite build`) and a real README before publishing.

**Working method:** do all of this on a branch (or a sibling worktree) so the current site stays deployable throughout; never mix cleanup commits with design commits.

---
