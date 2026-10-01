# Illustrated character portfolio — architecture

**Direction:** Scowlby-style *interaction* (cursor follow, editorial hero, intentional motion) — **original** Lovepreet character & layout.  
**Theme:** Warm light editorial (ivory/cream, near-black type, 1–3 accents tuned to final character art).

## Stack (unchanged)

React, TypeScript, Vite, Tailwind, React Router, GSAP + ScrollTrigger, Lenis. Three.js/R3F **only** for optional project visuals — **not** for the character.

## Character system (Phase 3 focus)

```text
public/character/          ← replaceable WebP frames / SVG
components/
  AnimatedCharacter/       ← state API: idle | looking | happy | …
  CharacterCanvas/         ← pointer → look direction (frame index or SVG pupils)
sections/Hero/             ← typography + character + micro-scene
```

**Implementation path:** Option A frame sequence (preferred) or SVG pupil offset until illustrations exist.

```tsx
<AnimatedCharacter state="idle" followCursor expression="neutral" />
```

## Homepage story (single page, anchor sections)

```text
#hero      — LOVEPREET + I BUILD DIGITAL THINGS + character
#work      — editorial project list (01–05)
#about     — illustrated scene + bio from inventory
#stack     — typographic technologies
#experiments — teaser → /experiments
#experience — compact list (legacy resume data)
#contact   — character + mailto
```

## Data

`projects.ts`, `experience.ts`, `skills.ts`, `social.ts`, `experiments.ts` — no copy in components.

## Deprecating (from prior experiments)

Dark `#0a0a0a` playground, `HeroObject` torus, fanned stack engine, slab-as-hero — slab presets may return **only** as optional project device visuals later.

## Build order (from brief)

1. ✅ Inventory + legacy map  
2. **Now:** light design system, nav, `AnimatedCharacter` + hero shell  
3. Polish hero until character + type feel right  
4. Work → About → Stack/Experiments → Contact → transitions → perf
