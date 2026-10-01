# LOVEPREET / DIGITAL SYSTEM — scene architecture

## Runtime flow

```text
Lenis (smooth scroll)
    ↓
ScrollTrigger scrubs #experience-scroll-track (800vh)
    ↓
ScrollController → experienceState (refs, no per-frame React)
    ↓
ChapterManager.resolveChapter(progress)
    ↓
├─ GlobalCanvas / SceneManager (Three.js, useFrame)
└─ ChapterOverlay + ChapterIndicator (React, chapter change only)
```

## Modules

| Module | Path | Role |
|--------|------|------|
| ExperienceController | `src/experience/ExperienceController.tsx` | Shell: canvas + scroll + DOM |
| ScrollController | `src/experience/ScrollController.tsx` | Maps scroll → `experienceState` |
| ChapterManager | `src/experience/ChapterManager.ts` | Chapter index + local progress |
| SceneManager | `src/experience/SceneManager.tsx` | Camera rig + scene mounting |
| GlobalCanvas | `src/experience/GlobalCanvas.tsx` | Single R3F canvas |
| DOMInterface | `src/experience/DOMInterface.tsx` | Nav, overlay, scroll track |

## Chapters (master timeline starting points)

| Chapter | Progress |
|---------|----------|
| boot | 0.00 – 0.08 |
| identity | 0.08 – 0.20 |
| developer | 0.20 – 0.35 |
| system | 0.35 – 0.50 |
| work | 0.50 – 0.68 |
| ai | 0.68 – 0.82 |
| journey | 0.82 – 0.94 |
| contact | 0.94 – 1.00 |

## Scenes (stub → polish per phase)

| Scene | File | Phase |
|-------|------|-------|
| BootScene | `scenes/BootScene/` | 4 |
| IdentityScene | `scenes/IdentityScene/` | 4 |
| DeveloperScene | `scenes/DeveloperScene/` | 5 |
| CodeScene | `scenes/CodeScene/` | 6 |
| WorkScene | `scenes/WorkScene/` | 7 |
| AIScene | `scenes/AIScene/` | 8 |
| JourneyScene | `scenes/JourneyScene/` | 9 |
| ContactScene | `scenes/ContactScene/` | 10 |

## Next implementation prompts

1. **Identity** — cinematic typography scrub tied to `chapterProgress` via GSAP (DOM), not React state.
2. **Work** — FitGuide phone + AI Studio browser with screenshot textures and transition.
3. **AI** — instanced neural network + typography sequence.
