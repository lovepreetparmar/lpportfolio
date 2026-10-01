# LOVEPREET — Digital Playground

## Creative north star

One continuous **playground**: discover by move, drag, scroll, click — not a linear resume.

**Signature interaction (Phase 5):** `ProjectStack` — fanned 3D cards (DOM + GSAP), not a grid.

**Hero (Phase 4, in progress):** `HeroObject` in `GlobalCanvas` + oversized DOM type + cursor lamp.

**Retained from Shapeshifter build:** `slab/` presets + `tweenSlab` for per-project device morphs inside Work (phone/browser/desktop) — not the hero focal object.

## Single canvas

```text
GlobalCanvas
├── CursorLamp
├── Environment
├── HeroObject          (home / hero act)
├── ProjectObjects/*    (phase 5+, swap by active project)
└── ParticleField       (experiments, lazy)
```

High-frequency state: `pointerStore`, `playgroundStore` (act, activeProjectIndex), slab tween proxy — **no React state per frame**.

## Homepage acts (scroll + interaction, not “sections”)

| Act | ID | Deliverable |
|-----|-----|-------------|
| Playground entry | `#hero` | HeroObject + type + MOVE/DRAG/SCROLL |
| Work | `#work` | **ProjectStack** (priority) |
| Quiet beat | — | Editorial type only (“THE THINGS I BUILD”) |
| About | `#about` | Interactive identity (phase 7) |
| Stack playground | `#stack` | Draggable tech field (phase 8) |
| Experiments | `#experiments` | Teaser → `/experiments` |
| Experience | `#experience` | Short list (phase 10) |
| Contact | `#contact` | Distorted CTA (phase 11) |

## Routes

```text
/                      Home (all acts)
/work/:slug            Project detail (Flip from stack)
/experiments           Index
/experiments/:slug     Single experiment
/lab                   Redirect → /experiments (legacy)
```

## Data

- `projects.ts` — `visualType`, accents per project
- `experiments.ts` — magnetic type, liquid type, particle LP, AI viz
- `skills.ts` — hover links to project slugs (phase 8)

## Next build (visitor discovers **work**)

Implement `components/ProjectStack/` + `animations/projectStack.ts` with FitGuide + AI Studio only, then expand.
