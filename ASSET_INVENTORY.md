# Asset inventory — `lpportfolio`

> Complete scan of the repository (excluding `node_modules/` and `.git/`), including `public/`, `src/assets/`, generated `dist/`, and assets defined inside source files.
> **No files were moved, renamed, deleted, or modified during this audit.**

**Scan result — total media files in the repository: 7** (4 SVG, 1 PNG, 2 duplicates inside `dist/`).
**Local font files: 0 · Video files: 0 · Photographs: 0 · Project screenshots: 0 · ICO/favicon.ico: 0 · PDF/résumé: 0.**

---

## 1. Files in `public/` (shipped as-is by Vite)

| # | Path | Type / size | Dimensions | Current purpose | Reuse? | Replace? | New asset needed? |
|---|---|---|---|---|---|---|---|
| 1 | `public/favicon.svg` | SVG · 271 B | `viewBox 0 0 32 32` | Site icon: rounded dark (`#050505`) square with white **"LP"** text. Referenced by `index.html` `<link rel="icon">`. | ✅ Yes — works today | Optional — the redesign's character identity may want its own mark | Recommended: character/monogram favicon |
| 2 | `public/icons.svg` | SVG sprite · 5,031 B | symbols with `viewBox 0 0 16 17` | **None.** Contains `<symbol>` definitions: `bluesky-icon`, `discord-icon`, `github-icon`, `x-icon`, `social-icon`, `documentation-icon`. **Never referenced** by any file in `src/`, `index.html`, or `public/`. | ⚠️ Only partly — the sprite has **no LinkedIn icon**, which is one of only two real social links | Likely yes | Only if the new design uses an icon sprite; otherwise remove |
| 3 | `public/robots.txt` | text · 73 B | — | Crawl rules: `User-agent: * / Allow: /` + sitemap pointer to `lovepreetparmar.com` | ✅ Yes | No | No |
| 4 | `public/sitemap.xml` | XML · 171 B | — | Lists **only** `https://lovepreetparmar.com/` | ✅ Structure | ⚠️ Must be regenerated — `/experiments` and all `/work/:slug` are missing | Yes: expanded URL list after redesign |
| 5 | `public/.htaccess` | Apache config · 214 B | — | SPA fallback: rewrites non-file/non-directory paths to `/index.html`, plus no-cache for `index.html`. Required for the static Hostinger deployment | ✅ **Required** | No | No |
| 6 | `public/character/README.md` | Markdown · 545 B | — | Pipeline spec for character art: `character/hero/{idle,blink,look-left,look-right,look-up,look-down}.webp` + optional `frames/000…`, WebP/AVIF, responsive widths, lazy-load after hero | ✅ Keep as the plan | ⚠️ Contains a reference to `images/all/bg1_new.jpg` from the **legacy repository** — that path does not exist here | ✅ **Yes — the actual character artwork (highest-priority missing asset)** |

**Note:** the `public/character/` folder contains **only** the README — no artwork exists yet.

---

## 2. Files in `src/assets/`

| # | Path | Type / size | Dimensions | Current purpose | Reuse? | Replace? | New asset needed? |
|---|---|---|---|---|---|---|---|
| 7 | `src/assets/hero.png` | PNG, 8-bit colormap · 13,057 B | **343 × 361 px** | **None — unreferenced.** A 3D render of a rounded "glass slab" with a purple/violet glow beneath it, left over from the abandoned *Shapeshifter* single-`Slab` direction. | ❌ No — off-direction (the target is a warm illustrated world, not dark 3D renders) | Replace | Only if the redesign wants an abstract hero object — otherwise no |
| 8 | `src/assets/react.svg` | SVG · 4,126 B | React logo | **None — unreferenced.** Vite template leftover | ❌ No | Remove | No |
| 9 | `src/assets/vite.svg` | SVG · 8,709 B | Vite logo | **None — unreferenced.** Vite template leftover | ❌ No | Remove | No |

---

## 3. Build output (`dist/` — gitignored, local only)

| Path | Note |
|---|---|
| `dist/favicon.svg`, `dist/icons.svg`, `dist/robots.txt`, `dist/sitemap.xml`, `dist/.htaccess`, `dist/character/README.md` | Copies of `public/` produced by the last `vite build` (30 Sep 13:51) |
| `dist/assets/index-*.js` (375,714 B), `jsx-runtime-*.js` (101,003 B), `index-*.css` (37,526 B), plus 5 lazy route chunks | Build artifacts — **not source assets**, regenerate at will |
| `dist/index.html` (1,504 B) | Generated entry |

No action required; `dist/` is correctly gitignored.

---

## 4. Assets defined in code (no files)

| # | Where | Type | Current purpose | Reuse? | Replace? | New asset needed? |
|---|---|---|---|---|---|---|
| 10 | `src/components/CharacterCanvas/CharacterCanvas.tsx` | Inline SVG (200×200 viewBox), drawn with paths/ellipses | **The site's entire visual identity today.** A placeholder figure: head + hair, torso, eyes with pupil offset ±6 px, blink (eye height 8 → 1.5), 3 mouth shapes (`neutral`/`happy`/`curious`), and a small phone/screen rect. Explicitly commented: *"Placeholder SVG until illustrated frames land in `public/character/`"*, `aria-label="Illustrated character placeholder for Lovepreet Parmar"` | ⚠️ Keep the **behaviour contract** (gaze, blink, expression props) | ✅ **Must be replaced** by the real illustrated character | ✅ **Yes — critical** (see §6) |
| 11 | `src/components/ProjectVisual/ProjectVisual.tsx` | Pure CSS/HTML wireframes | Project thumbnails: `phone` (dark phone frame), `browser` (traffic-light chrome + skeleton blocks), `desktop` (window + grid), `custom` (terminal `GET /api/v1/health → 200 OK` snippet). Plus pointer-tilt on `perspective(900px)`. | ⚠️ Usable as loading/placeholder art | ✅ Replace with real screenshots per project | ✅ **Yes — 5 project images (min. 5)** |
| 12 | `src/styles/globals.css` → `@keyframes character-breathe` | CSS keyframe (translateY 0 → −4 px, 4 s) | Idle breathing for the character | ✅ Yes | No | No |
| 13 | `src/styles/animations.css` → `pulse-soft` + `.scroll-hint` | CSS keyframe | **Unused** — `.scroll-hint` appears in no component | ❌ No | Remove | No |
| 14 | `src/components/UI/MonogramLoader.tsx` | Inline `<style>` + `@keyframes monoIn` | "LP" bracket entrance animation | ⚠️ Yes, but see token bug in audit §7 | Likely replaced by a character-led entry | Optional |
| 15 | `src/components/cursor/CustomCursor.tsx` | DOM + rAF lerp | Custom cursor dot + contextual label | ✅ Yes | Optional restyle | No |
| 16 | `src/components/Magnetic/MagneticButton.tsx`, `ProjectVisual` tilt | Inline `transform` on `pointermove` | Pointer micro-interactions | ✅ Yes | No | No |
| 17 | `public/favicon.svg` glyph "LP" (also inline in `MonogramLoader`) | Text-as-logo | Brand mark | ✅ | Optional | Optional new mark |

---

## 5. Remote / external assets (loaded at runtime, not in the repo)

| # | Asset | Source | Current purpose | Reuse? | Replace? | New asset needed? |
|---|---|---|---|---|---|---|
| 18 | **Inter** 400/500/600 | `https://fonts.googleapis.com` (CSS2 API) via `<link>` in `index.html` | Body font (`--font-body`) | ⚠️ Design TBD | Recommended: **self-host** (perf, privacy, no CDN dependency) | Font decision belongs to the new design system |
| 19 | **Space Grotesk** 400/500/600/700 | Same | Display font (`--font-display`) — headlines, wordmark, section titles | ⚠️ Design TBD | Recommended: self-host | Same |
| 20 | System mono stack (`ui-monospace, SF Mono, Menlo, monospace`) | Local OS | `.label-mono` eyebrow labels | ✅ Yes (zero cost) | Optional | No |
| 21 | `schema.org` JSON-LD injected at runtime | Generated in `Seo.tsx` | Structured data (Person: name, jobTitle, url, sameAs) | ✅ Yes | Update job title for consistency | No |

No image CDN, no video embeds, no analytics, no third-party scripts beyond Google Fonts.

---

## 6. Missing assets (gaps that block the redesign)

| Priority | Missing asset | Needed for | Suggested location |
|---|---|---|---|
| 🔴 1 | **Illustrated character artwork** — idle + expression frames (or a riggable source file) | Hero identity, About, Contact, favicon, loaders | `public/character/` (pipeline already specified in its README) |
| 🔴 2 | **Project screenshots / captures** (5 projects) | `ProjectVisual`, `/work/:slug`, share cards | `public/projects/<slug>/` |
| 🟠 3 | **Social share image (`og:image`)** — `twitter:card=summary_large_image` is declared but no image exists | Link previews on LinkedIn/X/WhatsApp | `public/og.png` (1200×630) |
| 🟠 4 | **Favicon set** (`.ico` + PNG 32/16 for platforms that ignore SVG) | Browser tabs, PWA, bookmarks | `public/` |
| 🟡 5 | **Portrait / about image or illustration** | About section (currently text + placeholder character) | `public/character/` or `public/images/` |
| 🟡 6 | **Hero background / world art** (parallax layers, environment) | The "illustrated world" concept | `public/world/` |
| 🟡 7 | **Icon set matching real links** (GitHub, LinkedIn, Email — current sprite has no LinkedIn) | Footer, Contact, mobile nav | `public/icons.svg` or inline |
| 🟢 8 | Self-hosted `.woff2` font files | Performance/privacy | `public/fonts/` |
| 🟢 9 | Résumé PDF / experiment demos / video | Optional extras | — |

---

## 7. Hygiene / non-assets

| Path | Note |
|---|---|
| `.DS_Store` (repo root, `src/`, `dist/`) | macOS cruft — **untracked** (`.gitignore` already covers it); safe to delete locally |
| `node_modules/` | Not tracked; `package-lock.json` present (lockfileVersion 3) |
| `README.md` | Untouched Vite template readme — should be replaced eventually |
| 7 `*.md` planning docs at repo root | Contain three superseded design directions + legacy-repo-derived content; not assets, but will mislead future work (see audit §17) |

---

## 8. Reuse summary

| Verdict | Items |
|---|---|
| ✅ **Reuse as-is** | `public/.htaccess`, `public/robots.txt`, `public/favicon.svg` (until a new mark exists), system mono stack, `character-breathe` keyframe, cursor + magnetic + tilt interactions |
| ⚠️ **Reuse the mechanism, update the content** | `sitemap.xml` (add URLs), `CharacterCanvas` (keep gaze/blink/expression API, swap artwork), `ProjectVisual` (keep tilt + frame types, swap in real screenshots), `icons.svg` (only if sprite approach retained), Google Fonts (re-select + self-host) |
| ❌ **Remove** | `src/assets/react.svg`, `src/assets/vite.svg`, `public/icons.svg` (if unused after redesign), `.scroll-hint`/`pulse-soft` CSS, `.DS_Store` files |
| ❓ **Decision needed** | `src/assets/hero.png` (off-direction 3D render — likely remove) |
| 🔴 **Create** | Character artwork, 5 project screenshots, `og.png`, favicon set, world/scene art, icon set, self-hosted fonts |

