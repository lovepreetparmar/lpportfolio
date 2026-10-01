# Shapeshifter — component architecture

## Core idea

One **Slab** actor (procedural rounded box + screen face) persists in a single **GlobalCanvas**. Scroll and interaction tween `slabStore` (mutable); React only mounts shell UI.

```text
App
├── SmoothScrollProvider (Lenis ↔ GSAP ticker)
├── MonogramLoader (real load progress)
├── Cursor (DOM dot + labels)
└── Router
    ├── Home
    │   ├── GlobalCanvas
    │   │   ├── CursorLamp (point light)
    │   │   └── Slab (reads slabStore in useFrame)
    │   ├── Navigation (LP · INDEX · act counter)
    │   └── sections/ (Hero → Work → LabTeaser → Who → Contact) — phased
    ├── /work/:slug
    └── /lab, /lab/:slug — phase 7
```

## Mutable stores (no per-frame React)

| Store | Purpose |
|-------|---------|
| `pointerStore` | x, y, vx, vy (normalized) |
| `slabStore` | `SlabState` geometry + chrome + accent |
| `scrollStore` | progress, active act (later) |

## Slab module (`src/experience/slab/`)

- `types.ts` — `SlabState`, chrome union, named presets (`hero`, `fitguide`, …)
- `slabStore.ts` — current values
- `tweenSlab.ts` — GSAP tween into `slabStore`
- `Slab.tsx` — mesh + screen plane + chrome hints

## Timeline (`src/experience/SlabTimeline/`) — phase 4

Maps scroll progress → preset name → `tweenSlab`.

## Overview (`src/experience/Overview/`) — phase 4

Fanned stack when user presses `O`.

## Fallback

`useWebGL()` false → `SlabFallback` DOM frame in Home (phase 3+).

## Acts (homepage scroll)

| Act | DOM section | Slab |
|-----|-------------|------|
| 0 | Boot | (loader only) |
| 1 | Hero | blank glass |
| 2 | Work | per-project device |
| 3 | Who | hero-ish / minimal |
| 4 | Contact | mail screen |
