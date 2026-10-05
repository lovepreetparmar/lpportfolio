# Content inventory — `lpportfolio`

> **Scope:** every item below was read directly from this repository. Nothing is inferred, carried over, or rewritten.
> **Source of truth:** `src/data/*.ts`, `src/sections/**`, `src/pages/**`, `src/lib/constants.ts`, `index.html`, `public/*`.
> **Not used:** the old `lovepreetparmar.github.io` repository was not opened, inspected, or referenced. The previous version of this file was built from it and has been replaced.
> Anything absent from this repository is marked **`[NOT FOUND]`**.

---

## 1. Identity and personal information

| Field | Value | File |
|---|---|---|
| Name (full) | `Lovepreet Parmar` | `src/lib/constants.ts`, `index.html`, `Hero`, `About`, `Seo` JSON-LD |
| Name (wordmark / nav) | `Lovepreet` | `Navigation.tsx`, `MonogramLoader`, `ChapterOverlay` |
| Initials monogram | `LP` | `MonogramLoader.tsx`, `public/favicon.svg` |
| Role A | `Full Stack Developer` | `index.html` `<title>` + `og:title`, `Seo` JSON-LD `jobTitle` |
| Role B | `Software Developer` | `src/lib/constants.ts` (`SITE_TITLE`, `SITE_DESCRIPTION`) |
| Role C | `Software developer` | `Hero.tsx` sub-line, `Footer.tsx` |
| Role D | `Software developer` (dl value) | `About.tsx` → "Role" |
| Self-description | `an illustrator and developer familiar with programming and design tools` | `About.tsx` |
| Origin | `Originally from New Delhi` | `About.tsx` |
| Location | `Chandigarh, India` | `About.tsx` |
| Education | `Information Technology at Chandigarh Engineering College (B.Tech, 2015–2019)` | `About.tsx` |
| Interests | `Music, travel, Android ROM testing, coding` | `About.tsx` (dl "Interests") |
| Background | `Design + development` | `About.tsx` (dl "Background") |
| Site URL | `https://lovepreetparmar.com` | `constants.ts`, `index.html` canonical, `robots.txt`, `sitemap.xml` |

**`[NOT FOUND]` in this repository:** phone number, street address, date of birth, profile photograph, profile video, résumé/CV file, languages spoken, design-tool proficiency (Photoshop/Illustrator/etc.), years-of-experience headline, awards, certifications, testimonials, clients, employers after 2019, statistics or metrics of any kind.

---

## 2. Contact information

| Field | Value | File |
|---|---|---|
| Email | `lplovepreetparmar@gmail.com` | `src/data/social.ts` (`EMAIL`), used by `Navigation`, `Contact`, `Footer`, `ChapterOverlay` |
| Contact mechanism | `mailto:` button + email printed as text | `Contact.tsx`, `Navigation.tsx`, `Footer.tsx` |
| Contact form | `[NOT FOUND]` — none exists | — |
| Phone | `[NOT FOUND]` | — |
| Address | `[NOT FOUND]` (city only: Chandigarh, India) | — |
| Newsletter / subscribe | `[NOT FOUND]` | — |

---

## 3. Social links

Defined in `src/data/social.ts` — exactly three:

| Label | URL |
|---|---|
| GitHub | `https://github.com/lovepreetparmar` |
| LinkedIn | `https://www.linkedin.com/in/lovepreetparmar/` |
| Email | `mailto:lplovepreetparmar@gmail.com` |

Same two profile URLs are repeated in `Seo.tsx` JSON-LD `sameAs`.

**`[NOT FOUND]` in this repository:** Instagram, Twitter/X, Facebook, Bluesky, Discord, YouTube, Dribbble, Behance, personal blog. (`public/icons.svg` contains unused Bluesky/Discord/X/GitHub sprite symbols, but no URLs anywhere in the codebase reference them.)

---

## 4. Introduction / hero copy (verbatim)

From `src/sections/Hero/Hero.tsx`:

```text
Lovepreet Parmar                    (label-mono eyebrow)

I build
digital
things.                             ← third line in accent colour

Software developer building web, mobile, and AI-powered experiences.
Web · Mobile · AI · Product         (label-mono)

[ Explore my work → ]               → anchor #work

MOVE
DRAG
SCROLL                              (hint list)
```

Page-level metadata (`index.html`):

```text
<title>Lovepreet Parmar — Full Stack Developer</title>
description: "Portfolio of Lovepreet Parmar, a full stack developer building web,
              mobile, AI and interactive digital experiences."
og:title:    "Lovepreet Parmar — Full Stack Developer"
og:type:     website · twitter:card: summary_large_image
canonical:   https://lovepreetparmar.com/
```

`src/lib/constants.ts` (different wording):

```text
SITE_TITLE:       "Lovepreet Parmar — Software Developer"
SITE_DESCRIPTION: "Portfolio of Lovepreet Parmar, a software developer building
                   web, mobile, and AI-powered experiences."
```

JSON-LD (`Seo.tsx`): `@type: Person`, `name: Lovepreet Parmar`, `jobTitle: Full Stack Developer`, `url`, `sameAs: [GitHub, LinkedIn]`.

**Unused alternative hero copy** (orphaned `src/experience/ChapterOverlay.tsx`, never rendered):

```text
Lovepreet / Parmar
I build digital things.
Web · Mobile · AI · 3D
```

**Unused alternative intro** (orphaned `src/sections/Intro/Intro.tsx`, never rendered):

```text
I'M A / DEVELOPER / WHO LIKES / BUILDING / THINGS THAT / FEEL / IMPOSSIBLE.
```

---

## 5. About content (verbatim)

From `src/sections/About/About.tsx`:

> **Label:** About
> **Heading:** "A little about the person behind the code."
>
> **Paragraph 1:** "I'm Lovepreet Parmar — an illustrator and developer familiar with programming and design tools. I build modern digital products across web, mobile, AI, and interactive experiences."
>
> **Paragraph 2:** "Originally from New Delhi, based in Chandigarh, India. I studied Information Technology at Chandigarh Engineering College (B.Tech, 2015–2019) and have kept designing and shipping software since."

**Fact list (dl):**

| Label | Value |
|---|---|
| Role | Software developer |
| Location | Chandigarh, India |
| Interests | Music, travel, Android ROM testing, coding |
| Background | Design + development |

**No other about/bio copy exists.** No biography page, no long-form story, no FAQ: **`[NOT FOUND]`**.

---

## 6. Skills / technology stack

From `src/data/skills.ts` (19 entries, each `name` / `category` / `description`), rendered as a typographic list in `Stack.tsx`:

| # | Name | Category | Description |
|---|---|---|---|
| 1 | React | Frontend | Web applications and design systems |
| 2 | TypeScript | Language | Typed application code |
| 3 | JavaScript | Language | Interactive web experiences |
| 4 | HTML | Frontend | Semantic markup |
| 5 | CSS | Frontend | Layout and visual design |
| 6 | Tailwind CSS | Frontend | Utility-first styling |
| 7 | Vite | Tools | Modern frontend tooling |
| 8 | GSAP | Tools | Motion and scroll animation |
| 9 | React Native | Mobile | Cross-platform mobile apps |
| 10 | Expo | Mobile | React Native delivery |
| 11 | PHP | Backend | Server-side web applications |
| 12 | MySQL | Database | Relational data |
| 13 | Python | Backend | Scripting and ML coursework |
| 14 | FastAPI | Backend | Python API services |
| 15 | Node.js | Backend | JavaScript services |
| 16 | Supabase | Database | Auth and Postgres |
| 17 | Firebase | Backend | App data and auth |
| 18 | Electron | Desktop | Desktop applications |
| 19 | Git | Tools | Version control |

Source comment in the file: *"Technologies from verified legacy skills + current projects (no invented stack)."*

**`[NOT FOUND]`:** skill percentages/ratings, design tools (Photoshop, Illustrator, Figma…), DevOps/Cloud (AWS, Docker, CI/CD), frameworks beyond the list above, soft-skill or language ratings.

---

## 7. Experience

From `src/data/experience.ts` (4 entries), rendered by `sections/Experience/Experience.tsx` under the heading **"Learning & roles"**. File comment: *"Sourced from legacy portfolio; extend with post-2019 roles before publish."*

| Year | Title | Organization | Description (verbatim) |
|---|---|---|---|
| 2019 | PHP development internship | Impinge Solutions | "Six-month internship building web applications with PHP, MySQL, and JavaScript — integrations, documentation, and production-style workflows." |
| 2018 | Machine learning & AI program | Experts Hub | "Intensive ML/AI coursework and project work with Python, NumPy, TensorFlow, and Keras." |
| 2015–2019 | B.Tech Information Technology | Chandigarh Engineering College | "Degree in information technology with software engineering and systems fundamentals." |
| 2016 | Graphic designer | Social Bang Bang | "Short-term design work — posters, logos, and brand visuals." |

**Visible footnote rendered under the list (verbatim):**
> "Post-2019 project work is documented under Work; add employers here when you want them published."

**`[NOT FOUND]`:** any role, employer, or title dated after 2019; job titles; employment type; remote/on-site status; client work; freelance engagements.

---

## 8. Projects

From `src/data/projects.ts` (5 entries, all `featured: true`), rendered in `sections/Work/Work.tsx` under **"Selected projects"** with the sub-line:
> "Product stories across mobile, web, and AI — hover to peek; open for case notes."

Each entry links to `/work/:slug`.

### 01 — FitGuide
- **Category:** `MOBILE · AI · FITNESS`
- **Description:** "AI-powered personal fitness coach with workouts, recovery tracking, nutrition, and offline-friendly sync."
- **Overview:** "FitGuide combines React Native and Supabase with an AI coach layer for personalized training, progress analytics, and an interactive muscle map."
- **Technologies:** React Native, Expo, TypeScript, Supabase, AI
- **visualType:** `phone`

### 02 — AI Studio
- **Category:** `WEB · AI`
- **Description:** "Full-stack CRM with lead operations, analytics, role-based portals, and Gemini-powered workflows."
- **Overview:** "A React and Vite application with Firebase data, team tooling, and AI integrations for sales and operations teams."
- **Technologies:** React, TypeScript, Vite, Firebase, Gemini
- **visualType:** `browser`

### 03 — LPSynch
- **Category:** `WEB · SOFTWARE`
- **Description:** "Company website redesign with cinematic scroll storytelling and static deployment to Hostinger."
- **Overview:** "Modern React site replacing a legacy PHP presence, with content-driven sections and a custom digital-flow interaction layer."
- **Technologies:** React, TypeScript, Vite, GSAP, Tailwind
- **visualType:** `browser`

### 04 — HR Browser
- **Category:** `DESKTOP · ELECTRON`
- **Description:** "Desktop HR tooling built with Electron and React — **case study details pending repository verification.**"
- **Overview:** `[NOT FOUND]`
- **Technologies:** Electron, React, TypeScript, APIs
- **visualType:** `desktop`

### 05 — Rego Kernel
- **Category:** `AI · WEB · BACKEND`
- **Description:** "AI-backed web platform with a FastAPI service layer — **verify architecture and features before launch.**"
- **Overview:** `[NOT FOUND]`
- **Technologies:** React, FastAPI, Python, SQLite, APIs
- **visualType:** `custom`

### Project fields declared in `src/types/portfolio.ts` but **empty for every project**
`image` · `video` · `github` · `liveUrl` · `problem` · `solution` · `architecture` · `challenges` · `lessons` → **`[NOT FOUND]`** for all 5 projects.

**Also `[NOT FOUND]`:** project screenshots, live URLs, repository URLs, client names, launch dates, user/metric figures, team size, case-study prose.

**Unused per-project presets** (orphaned `src/experience/slab/presets.ts`, never rendered) — device geometry + accent colour for `hero`, `fitguide` `#3B82F6`, `ai-studio` `#84CC16`, `lpsynch` `#F97316`, `hr-browser` `#8B5CF6`, `rego-kernel`, `contact`.

---

## 9. Experiments

From `src/data/experiments.ts` (3 entries), rendered in `pages/Experiments/ExperimentsPage.tsx` under **"Experiments"** with the sub-line:
> "Small playgrounds for motion, type, and interaction — more demos landing soon."

| Slug | Title | Category | Type | Description (verbatim) |
|---|---|---|---|---|
| `magnetic-type` | Magnetic Type | Typography | `gsap` | "Letters move away from the cursor and return." |
| `liquid-type` | Liquid Type | Shader | `shader` | "Distorted display type with pointer-driven waves." |
| `particle-lp` | Particle LP | Three.js | `three` | "Particles form LP, scatter on pointer, reform when still." |

Detail page copy (`ExperimentDetailPage.tsx`): title + category + description, then:
> "Interactive build — coming in a later phase."

**`[NOT FOUND]`:** any actual experiment implementation, demo embeds, canvas/shader code for these three, screenshots.

---

## 10. Navigation and UI labels (verbatim)

**Live header (`components/navigation/Navigation.tsx`):**

| Element | Text |
|---|---|
| Wordmark | `Lovepreet` |
| Links | `Work` (`#work`) · `About` (`#about`) · `Experiments` (`/experiments`) · `Contact` (`#contact`) |
| CTA | `Let's talk →` (mailto) |
| Mobile toggle | `Menu` |

**Live section labels:** `Work`, `About`, `Experience`, `Stack`, `Contact`, `Introduction` (sr-only in orphaned Intro).

**Dead navigation data** (`src/data/navigation.ts`, never imported — targets `#home` and `#experience`, neither id exists):
`Home · About · Work · Experience · Contact` and numbered `01 Home … 05 Contact`.

**Dead index menu** (`IndexMenu.tsx`, never imported): `01 Work · 02 About · 03 Experiments · 04 Contact`, buttons `Close`.

**Footer (`Footer.tsx`):** `Lovepreet Parmar` · `Software developer` · `© {year} Lovepreet Parmar` · `GitHub` `LinkedIn` `Email` · `{email}` · `Back to top ↑`.

**Cursor labels (`data-cursor`):** `VIEW` `OPEN` `PLAY` `DRAG` `MAIL`.

**Route-level copy:**
- `ProjectPage`: `What it is`, `Technology`, `GitHub →`, `Live site →`, `← Home`, `Project not found`.
- `ExperimentsPage`: `← Home`.
- `ExperimentDetailPage`: `← Experiments`.
- `NotFoundPage`: `404` / `Page not found` / `← Home`.
- `LazyPage` fallback: `Loading…`.
- `MonogramLoader`: `LP`.

---

## 11. Other section copy (verbatim)

**`sections/Contact/Contact.tsx`**
> **Heading:** "Have an idea? / Let's build it." (second line accent)
> **Body:** "Reach out for collaborations, product builds, or a friendly hello."
> **Button:** "Email me →" · email printed below · social links

**`sections/Stack/Stack.tsx`**
> Label `Stack` · Heading "I work with"

**`sections/Work/Work.tsx`**
> Label `Work` · Heading "Selected projects" · Sub: "Product stories across mobile, web, and AI — hover to peek; open for case notes." · CTA "View project →"

**`sections/About/About.tsx`** → see §5.

**Unused section copy (orphaned files, never rendered):**
- `sections/Boot/BootSequence.tsx`: `Lovepreet` / `Digital system` / `Initializing experience` / `WEB·MOBILE·AI·BACKEND·3D = READY` / `System online`
- `sections/AI/AISection.tsx`: "AI / is not / just a feature." + topics `LLM integration · Prompt engineering · AI agents · Computer vision · Automation · API integration`
- `sections/Projects/Projects.tsx`: heading `Selected work`
- `sections/Skills/Skills.tsx`: headings `Technology` / `Stack` + note "Interactive technology network — Phase 6."
- `pages/Lab/LabPage.tsx`: `Lab` / "Experiments ship in phase 7. Index:"
- `experience/ChapterOverlay.tsx` (8 chapter narratives): `Lovepreet / Digital system` · `Lovepreet Parmar / I build digital things. / Web · Mobile · AI · 3D` · `The developer / Digital workspace — web, mobile, backend, AI.` · `The system / PHP → Laravel → JavaScript → React → TypeScript → Python → AI` · `The work` + first 3 project links · `AI / LLM · Vision · Agents · Automation` · `The journey` + first 3 experience rows · `Let's build something.` + email + socials

> ⚠️ The ChapterOverlay "system" line (`PHP → Laravel → …`) and `AISection` topic list are **claims not otherwise supported** by data in this repository (`Laravel` never appears in `skills.ts`). Do not ship without confirmation.

---

## 12. Copy that must not ship as-is

These are developer notes currently rendered to visitors:

1. `src/data/projects.ts` — HR Browser: *"…case study details pending repository verification."*
2. `src/data/projects.ts` — Rego Kernel: *"…verify architecture and features before launch."*
3. `src/sections/Experience/Experience.tsx` — *"...add employers here when you want them published."*
4. `src/pages/Experiments/ExperimentDetailPage.tsx` — *"Interactive build — coming in a later phase."*
5. `src/sections/Stack/Stack.tsx` / `Skills.tsx` — phase placeholders ("Phase 6", "Phase 7").
6. Title inconsistency: **Full Stack Developer** (`index.html`, JSON-LD) vs **Software Developer** (`constants.ts`, Hero, Footer).
7. Note in `public/character/README.md`: references `images/all/bg1_new.jpg` from the legacy repo — an external/legacy pointer, not an asset in this repository.

---

## 13. Missing content summary (blockers for the redesign)

| Needed for redesign | Status |
|---|---|
| Illustrated character artwork / animation frames | `[NOT FOUND]` (`public/character/` has only a README) |
| Reference photo or illustration source | `[NOT FOUND]` |
| Real project screenshots / video | `[NOT FOUND]` |
| GitHub / live URLs per project | `[NOT FOUND]` |
| Case-study prose (problem/solution/architecture/lessons) | `[NOT FOUND]` |
| Post-2019 experience entries | `[NOT FOUND]` |
| Portrait / about imagery | `[NOT FOUND]` |
| Testimonials, clients, awards, metrics | `[NOT FOUND]` — and none may be invented |
| Blog / writing samples | `[NOT FOUND]` |
| Résumé PDF | `[NOT FOUND]` |
| `og:image` / social share image | `[NOT FOUND]` |
| Additional social profiles (Instagram, X, etc.) | `[NOT FOUND]` |

---

## 14. Where content lives (for the migration)

```text
src/data/projects.ts      → Work section, /work/:slug, (dead ChapterOverlay)
src/data/experience.ts    → Experience section, (dead ChapterOverlay)
src/data/skills.ts        → Stack section, (dead Skills section)
src/data/social.ts        → EMAIL + Contact + Footer + Navigation + (dead ChapterOverlay)
src/data/experiments.ts   → /experiments, /experiments/:slug, (dead LabPage)
src/data/navigation.ts    → dead (Nav duplicates it inline)
src/lib/constants.ts      → SITE_NAME / SITE_TITLE / SITE_DESCRIPTION / SITE_URL (Seo + Footer)
index.html                → <title>, meta description, OG, canonical, font loading
```

All copy is already de-coupled from components — **the content layer can be reused unchanged** in the redesign, subject only to the corrections in §12.



