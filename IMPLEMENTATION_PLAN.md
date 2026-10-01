# Implementation plan

Progressive build per product spec. **Current status:** Phases 0–4 scaffolded; sections 5–11 are structural placeholders pending polish passes.

## Phase map

| Phase | Scope | Status |
|-------|--------|--------|
| 0 | Content inventory | Done — `CONTENT_INVENTORY.md` |
| 1 | Vite + React + TS + deps + Git | Done |
| 2 | Design tokens, typography, globals | Done (baseline) |
| 3 | Router, Lenis, hooks, SEO shell, preloader, nav, cursor | Done (baseline) |
| 4 | Hero (R3F + GSAP) | Done (baseline) |
| 5 | Intro + About | Next (GSAP typography) |
| 6 | Tech network | Next |
| 7 | Selected work (2 projects first) | Next |
| 8 | Experience timeline | Next |
| 9 | AI section | Next |
| 10 | Contact + footer | Next |
| 11 | `/work/:slug` case studies | Next |
| 12–16 | Perf, a11y, SEO, build, Hostinger | Later |

## Architecture decisions

1. **Single WebGL canvas** — `GlobalCanvas` fixed behind content; scene mode driven by scroll section (hero first).
2. **Animation** — GSAP + ScrollTrigger; Lenis synced via `gsap.ticker`; contexts cleaned on unmount.
3. **Data** — All copy in `src/data/*`; components receive props only.
4. **Mobile** — Reduced particles, no custom cursor, lighter hero mesh.
5. **Fallback** — `useWebGL` + `useReducedMotion` disable canvas; CSS gradient background.

## Deployment

- Build: `npm run build` → `dist/`
- Hostinger: upload `dist/*` to `public_html/`
- SPA: `public/.htaccess` (copied to dist root on build via `public/`)

## Branch strategy

- `main` — production-ready snapshots
- `develop` or `feature/*` — optional per spec
