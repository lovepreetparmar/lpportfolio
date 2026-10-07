# Character assets

Transparent illustration frames for the `AnimatedCharacter` system. The site
renders whatever is registered in `src/components/AnimatedCharacter/characterAssets.ts`
and falls back to an invisible placeholder frame for everything that is
missing — so artwork can be added one frame at a time, with no component
changes.

The specification for the artwork itself lives at
[`CHARACTER_MASTER_SPEC.md`](../../CHARACTER_MASTER_SPEC.md).

## Structure and naming

```text
public/character/
  master/                       # source of visual truth — never rendered directly
    lovepreet-master.webp
  hero/                         # the standing figure for the hero scene
    idle.webp                   # registry key: `base`
    blink.webp                  # registry key: `blink`
    look-left.webp              # registry key: `gaze:left`
    look-right.webp             # registry key: `gaze:right`
    look-up.webp                # registry key: `gaze:up`
    look-down.webp              # registry key: `gaze:down`
  expressions/                  # face states on the standing body
    neutral.webp                # `expression:neutral`
    happy.webp                  # `expression:happy`
    curious.webp                # `expression:curious`
    thinking.webp               # `expression:thinking`
    surprised.webp              # `expression:surprised`
    excited.webp                # `expression:excited`
    confident.webp              # `expression:confident`
    focused.webp                # `expression:focused`
  activities/                   # full-body poses
    coding.webp                 # `pose:coding`
    coffee.webp                 # `pose:coffee`
    phone.webp                  # `pose:phone`
    wave.webp                   # `pose:wave`
  interactions/                 # pointer-reaction states (named after the `interaction` prop)
    auto.webp                   # `interaction:auto`
    resting.webp                # `interaction:resting`
    engaged.webp                # `interaction:engaged`
```

Rules:

- **Lowercase kebab-case, `.webp`, no `@2x` suffix, no dimensions in the
  name.** One file per state; retina density is handled by shipping the file
  at 2× its rendered size.
- Every path above is mirrored in `CHARACTER_FILES` in
  `src/components/AnimatedCharacter/characterAssets.ts`. That table is the
  machine-checked contract: a new state in `types.ts` cannot compile without
  a filename decision.
- `pose:idle` and `gaze:neutral` deliberately have **no file** — they are the
  defaults and fall through to `base`.
- **Do not invent placeholder artwork.** Until a real file exists, the folder
  keeps its `.gitkeep` and the component draws nothing.

## Registering a frame

```ts
// src/components/AnimatedCharacter/characterAssets.ts
import { CHARACTER_FILES } from '@/components/AnimatedCharacter/characterAssets'

export const characterAssets: Partial<Record<CharacterLayerKey, string>> = {
  base: CHARACTER_FILES.base,
  blink: CHARACTER_FILES.blink,
  'expression:happy': CHARACTER_FILES['expression:happy'],
  'pose:coffee': CHARACTER_FILES['pose:coffee'],
}
```

Layer keys are typed: `base`, `pose:*`, `gaze:*`, `expression:*`,
`interaction:*`, `blink`.

### One frame at a time

**Exactly one frame is painted.** Frames are switched, never stacked: each
file is a complete figure on the same canvas, so drawing two at once would
ghost. Priority, highest first:

```text
blink  →  pose (non-idle)  →  expression  →  gaze (non-neutral)  →  interaction  →  base
```

An unregistered key is skipped, so artwork can land in any order and every
gap falls back to the nearest frame that exists. `blink` only ever replaces
`base`, because the blink artwork is derived from the neutral standing
figure.

Because only one frame shows, you never need to register two files that are
the same picture — `hero/idle.webp` and `expressions/neutral.webp` are the
same drawing by contract; ship `base` first and add the rest as they differ.

## Canvas and safe area

| Property   | Value                                                     |
| ---------- | --------------------------------------------------------- |
| Aspect     | **4 : 5** (portrait)                                      |
| Canvas     | **1600 × 2000 px** (2×) — see below                       |
| Baseline   | Sole line sits at **exactly y = 100%** (bottom edge)       |
| Figure     | ~94% of canvas height, head top at ~6%                     |
| Centre     | Visual mass centred on the vertical axis (50% ± 2%)        |
| Opaque box | All pixels inside x ∈ [3%, 97%], y ∈ [4%, 100%]            |

The component renders frames with `object-fit: contain` and
`object-position: 50% 100%` inside a `4 / 5` box, and the hero places that
box flush with the horizon — so **the bottom edge of the canvas *is* the
ground the character stands on**. Feet drawn above the bottom edge make the
figure float; feet drawn past it get clipped.

Positioning, scale, grounding, gaze and animation are all CSS/component
concerns. **Never bake them into the artwork.**

## Consistency requirements

All frames must be interchangeable without a visible jump:

- transparent background, no baked-in backdrop
- identical canvas dimensions
- identical character scale and identical feet position
- identical proportions, silhouette logic, palette, line weight and shading
  treatment
- **one design.** Every frame is derived from `master/lovepreet-master.webp`
  — same head, same hair, same beard, same face, same clothing, same body,
  same style. Never draw a second character.

See `CHARACTER_MASTER_SPEC.md` for the full contract.

## Image quality

- **Format:** WebP with alpha (`image/webp`), sRGB. PNG-24 accepted only as
  the archival master.
- **Master resolution:** 1600 × 2000 px. The hero renders the figure at up to
  ~450 px wide (≈900 px at 2× DPR), so 1600 px leaves comfortable headroom
  for larger placements and future sections.
- **Compression:** WebP quality 82–88 with alpha. Prefer `method 6`. Check
  the silhouette for fringing on a cream (`#f6f1e8`) background before
  shipping — a white or dark halo around the alpha edge is the usual defect.
- **No baked-in effects:** no text, no border, no frame, no watermark, no
  drop shadow or ground shadow (the component paints its own contact shadow),
  no background, no gradient wash.
- **Retina:** ship the file at 2× its expected rendered width and let the
  browser downscale; do not ship a 1× file and upscale in CSS.

## Loading

- The hero frame is above the fold: it is registered as `base` and loaded
  eagerly (`priority="high"`).
- Frames used further down the page stay unregistered until needed and are
  lazy-loaded by default.
- A frame that 404s or fails to decode is dropped at runtime and the figure
  falls back to the placeholder — a broken file never breaks the scene.

## Reference

Use the personal reference photos as **illustration reference only**. Raw
photos are never published as the hero.
