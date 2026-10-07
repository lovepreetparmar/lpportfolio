# CHARACTER MASTER SPECIFICATION

The exact contract used to generate the real Lovepreet character artwork.
Every rule below is binding for the master and, by extension, for every frame
derived from it.

Related documents:

- `public/character/README.md` — file naming, registration, runtime behaviour
- `src/components/AnimatedCharacter/characterAssets.ts` — the typed filename
  table (`CHARACTER_FILES`) and the registry

---

## 0. One-paragraph summary (for the image generator)

> A full-body editorial illustration of Lovepreet Parmar — an adult South
> Asian man in his early thirties with short dark hair and a neatly groomed
> short beard — standing in a relaxed, neutral contrapposto, body turned
> about 25° in a three-quarter view with his face and eyes returning to the
> camera. He wears a sage-green overshirt left open over a charcoal
> crew-neck t-shirt, straight-leg slate trousers and off-white low-top
> sneakers, with one small coral accent. The style is premium editorial
> illustration: hand-drawn contours in warm ink, cel shading in three or four
> flat value steps per material, restrained colour, mature proportions at
> roughly 7.5 heads, slightly stylised but never cartoonish and never
> photorealistic. Transparent background, no shadow, no text, on a 1600 ×
> 2000 px canvas with the soles of the shoes touching the bottom edge.

---

## 1. Character appearance

- **Subject:** Lovepreet Parmar, adult male, reads as late twenties to early
  thirties. This is a portrait of a specific person, not a generic avatar.
- **Likeness authority:** the supplied reference photographs. They are the
  sole source of truth for bone structure, complexion, hairline, beard shape,
  nose, eye shape and any distinguishing marks. Everything in this document
  is art direction around those photographs; where the two disagree, the
  photographs win.
- **Read:** calm, present, quietly confident, approachable. Not heroic, not
  comical, not posed for a gym poster.
- **Silhouette test:** at 100 px tall, the figure must still be recognisable
  as the same person — the shape is carried by the hair mass, the short
  beard's jaw line, and a clean relaxed shoulder-to-hip line.
- **Maturity:** adult facial structure, adult body, adult styling. The
  character must never read as a child, an anime mascot or a brand mascot.

## 2. Face / hair / beard

**Face**

- Three-quarter turn of the head, but the eyes are aimed at the viewer —
  the face reads as roughly 15–20° off frontal.
- Expression: neutral with warmth — mouth closed, corners very slightly
  raised, brows relaxed and level, no furrow, no grin, no raised brows.
- Eyes: almond-shaped, dark brown iris, upper lash line drawn heavier than
  the lower, one small catchlight placed consistently at the upper-left of
  each iris.
- Nose, cheekbone width, jaw angle, ear shape and eye spacing: from the
  reference photographs. Do not beautify, narrow or westernise the features.
- Skin reads as a warm medium-to-deep brown. Exact tones from the
  photographs (see §8 for the tonal plan).

**Hair**

- Dark, near-black, short: roughly 4–6 cm of volume on top, shorter through
  the sides and back, with a soft side part and a slight forward sweep at
  the fringe.
- Drawn as overlapping clumps with 3–5 deliberate breaks in the outer
  contour — not one solid helmet shape, not individual strands.
- Hairline follows the reference photographs. Keep the top-of-head contour
  clean so it never touches the top of the canvas (§12).

**Beard and moustache**

- Short, full, groomed: beard reads at about 3–5 mm of length, even density,
  no patches.
- Moustache connects to the beard at the mouth corners and follows the upper
  lip without overhanging it.
- Cheek line sits just below the cheekbone; neck line sits about two
  finger-widths above the Adam's apple. Both lines are clean, not shaved
  sharp.
- Same near-black as the head hair, one value darker in shadow only.

**Eyebrows**

- Dark, natural, medium density; shape from the photographs. Not blocked out,
  not razor-arched.

## 3. Clothing

One canonical outfit for the master. Every derived frame re-draws exactly
these garments — no wardrobe changes between frames.

| #    | Garment                            | Detail                                                                                     | Colour                 |
| ---- | ---------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------- |
| 1    | Overshirt, worn open               | Long sleeve rolled to mid-forearm, soft collar, straight hem, falls to mid-hip              | Sage `#3d6b5a`         |
| 2    | Crew-neck t-shirt                  | Mid-weight cotton, relaxed fit, sleeves ending mid-bicep, hem just below the overshirt      | Warm charcoal `#2b2825` |
| 3    | Trousers                           | Straight leg, slight taper, one soft break at the ankle, plain waistband                    | Slate `#3a4550`        |
| 4    | Low-top sneakers                   | Clean and simple, flat sole, no branding or panel logos                                     | Off-white `#ece5d8`    |
| 5    | Sole accent (the only coral in the figure) | A single thin coral line along the heel/sole edge                                   | Coral `#e85d4c`        |
| 6    | Watch (optional, keep if used)     | Slim, plain face, on the left wrist; same watch in every frame                              | Ink `#141210`          |

- Fabric is matte. Two value steps per garment (lit plane, shadow plane) plus
  one darker accent inside major folds only.
- Folds are selective: 4–8 per garment, placed where the pose actually
  bunches fabric (inside elbow, waist, knee, rolled cuff). No wrinkle noise.
- **No logos, no text, no brand marks, no patterns, no headphones, no
  glasses, no cap** unless the reference photographs make any of these part
  of how Lovepreet actually presents.
- Skin, hair and the sage overshirt must remain clearly distinguishable from
  the cream page background at a glance.

## 4. Body proportions

- **Height: 7.5 heads.** Head unit = crown to chin.
- **Stylisation allowance:** up to +4% head size and marginally broader
  shoulders than photographic realism, purely so the face stays legible at
  hero scale. Beyond that it becomes cartoonish.
- Landmarks, measured from the ground in head units:

  | Landmark                    | Height (head units) |
  | --------------------------- | ------------------- |
  | Sole line                   | 0.00                |
  | Ankle                       | 0.35                |
  | Knee                        | 2.00                |
  | Crotch / hip                | 3.75                |
  | Waist                       | 4.40                |
  | Shoulder line               | 5.95                |
  | Chin                        | 6.50                |
  | Eye line                    | 7.00                |
  | Crown                       | 7.50                |

- **Shoulders** ≈ 2.2 head-widths wide (≈ 1.6 head-heights).
- **Hands:** length ≈ 0.75 head-heights; fingers drawn simplified and
  confident, not detailed.
- **Arms:** elbows at roughly waist height, wrists at roughly crotch height.
- Weight is distributed believably — the planted leg carries the torso, the
  ribcage sits over the hips, the head sits over the sternum. No broken or
  rubber spine.

## 5. Pose

Neutral / relaxed standing, derived from the master pose:

- **Weight on his right leg** (the viewer's left), planted straight.
- **Left leg relaxed:** knee slightly bent, foot set a little forward and
  turned out about 15°, heel fully on the ground.
- **Hips** drop very slightly on the relaxed (left) side; the shoulders
  counter-tilt by a smaller amount so the line never looks broken.
- **Arms** hang ~10–15° away from the torso. Hands open with fingers softly
  curled — never clenched, never hidden behind the back, never both in
  pockets (hands must stay readable and consistent).
- **Head** turned back to the camera, chin level or a hair below.
- **Feet both fully visible** and both soles resting on the baseline (§12).
- The pose must work as a *resting* pose: nothing about it should imply an
  action that is about to happen. It is the frame the character lives in
  between all other frames.

## 6. Camera / view

- **Camera height:** at the figure's sternum, roughly 75–80% of figure
  height. No low-angle hero shot, no bird's-eye.
- **Camera tilt:** none. Vertical lines stay vertical; no convergence.
- **Lens read:** long — an 85–135 mm equivalent, i.e. near-orthographic with
  almost no perspective distortion. A foot must not look larger than it is.
- **Framing:** the entire figure in frame, crown to sole, centred on the
  canvas (§12). Nothing cropped, no tight head crop on the master.
- **Turn:** the body is rotated about 25° so that **his right shoulder (the
  viewer's left) is the near shoulder** and his left shoulder recedes. The
  head counter-rotates toward the camera so the face reads as 15–20° off
  frontal with both eyes visible.
- **Gaze:** straight at the viewer, level, confident, not staring.

## 7. Illustration style

- **Genre:** premium editorial illustration for a design/engineering
  portfolio. The register is a good magazine portrait, not a game asset, not
  a sticker pack.
- **Construction:** hand-drawn contour + flat colour fields + cel shading.
- **Maturity:** adult proportions, restrained palette, controlled detail.
- **Not childish:** no oversized head, no oversized eyes, no chibi
  proportions, no thick uniform outlines, no mascot face, no blush marks, no
  sparkle marks, no exaggerated gummy smile.
- **Not photorealistic:** no rendered skin pores, no photographic texture
  overlays, no painterly impasto, no gradient-mesh rendering, no lens
  effects, no depth of field.
- **Slightly stylised:** simplified forms, confident shape design, selective
  detail — the face and hands carry the detail, the clothing stays quiet.
- **Consistency of medium:** everything in the figure is drawn the same way.
  No mixed media, no photographic elements, no 3D-rendered parts.

## 8. Color direction

Palette drawn from the site tokens so the figure belongs to the page it
stands on.

| Role                     | Value        | Notes                                                     |
| ------------------------ | ------------ | --------------------------------------------------------- |
| Page / paper (reference) | `#f6f1e8`    | The cream the figure is composited onto — never exported   |
| Line, hair, darkest dark | `#141210`    | Warm ink, never pure `#000000`                            |
| Hair & beard             | `#17140f`    | One step off the ink so line and hair separate             |
| Skin — light             | from photos  | Warm, yellow-red undertone                                 |
| Skin — base              | from photos  | The recognisable complexion                                |
| Skin — shadow            | from photos  | Same hue, deeper and warmer — **never grey or blue-grey**  |
| Overshirt                | `#3d6b5a`    | Sage; the figure's main colour mass                        |
| T-shirt                  | `#2b2825`    | Warm charcoal                                               |
| Trousers                 | `#3a4550`    | Slate                                                       |
| Sneakers                 | `#ece5d8`    | Off-white, warm enough to separate from the cream page     |
| Accent                   | `#e85d4c`    | Coral, exactly one small appearance (§3, item 5)            |
| Ambient / cool fill      | `#6d8fa6`    | Haze, at very low strength in the shadow side only          |

Rules:

- **Total palette ≤ 12 colours** including skin tones.
- No pure white, no pure black anywhere in the figure.
- The figure must hold contrast against `#f6f1e8`: check the silhouette by
  squinting — the outline must stay readable on cream.
- Saturated colour appears once (the coral accent). Everything else is
  muted.

## 9. Line / shading style

**Line**

- Contour in warm ink `#141210` at 88–100% opacity.
- Weight: **3–5 px at the 2000 px canvas height**, with hand variation —
  slightly heavier where forms overlap or occlude (under the chin, armpit,
  inside elbow, crotch, hem, shoe sole), tapering to nothing at the ends of
  open strokes.
- Interior/descriptive lines at 60–70% of contour weight (fabric folds,
  collar, pocket, knuckle).
- On edges facing the key light, the line may lighten to ~55% opacity or
  break entirely ("line-light").
- Contours carry a slight hand-drawn wobble. Perfect Bézier smoothness reads
  as vector clip art and is wrong for this piece.

**Shading**

- One key light from the **upper-left, slightly in front** of the figure.
- **Three value steps per material maximum:** base, one core shadow (12–18%
  darker than base, hue-shifted toward red, not a grey multiply), and one
  optional reflected-light sliver on the far edge of a shadow shape.
- Shadow shapes are **hard-edged cel shapes**, not gradients. A single soft
  ambient-occlusion transition is permitted only under the jaw and at the
  rolled cuffs.
- **Faint warm rim light along the viewer's right silhouette edge**, 2–4 px
  at 2000 px height, low opacity — the hero's sun sits low on the right of
  the scene, so the figure must look lit by it.
- **No cast shadow on the ground.** The website paints its own contact
  shadow in CSS; a baked one would double up and would look wrong everywhere
  the figure is reused.
- No drop shadow behind the figure, no glow, no bloom, no colour bleed
  outside the silhouette.

## 10. Background requirements

- **There is no background.** Not a rectangle, not a gradient, not a shape,
  not a vignette, not a colour swatch, not a horizon line, not a floor.
- No scenery, no props, no objects touching the ground, no ambient particles.
- Anything that is not the character must be fully transparent.

## 11. Transparency requirements

- Alpha channel present; alpha = 0 across the entire background.
- The figure itself is **fully opaque** — no glass, no translucent fabric, no
  motion trails, no semi-transparent hair strands dissolving into the page.
- **Clean alpha edge.** Anti-aliasing is expected, but there must be no
  coloured fringe from the original background. Always re-check the export
  composited over `#f6f1e8` *and* over `#141210`; a light halo or a dark
  halo is a defect.
- No premultiplied-alpha residue, no jagged stair-stepped cut-out, no
  leftover pixels from a selection.
- Do not export on a checkerboard pattern, and do not leave a 1 px
  transparent border that shifts the figure's baseline.

## 12. Canvas requirements

| Property            | Requirement                                                  |
| ------------------- | ------------------------------------------------------------ |
| Dimensions          | **1600 × 2000 px** (exactly)                                 |
| Aspect ratio        | **4 : 5** portrait — matches the component's `aspect-ratio`  |
| Colour mode         | sRGB, 8-bit per channel + alpha                              |
| Baseline            | Sole line at **y = 2000 px (exactly the bottom edge)**       |
| Figure height       | ≈ 1880 px (94% of canvas height), crown at y ≈ 120 px        |
| Horizontal centre   | Visual mass centred on x = 800 px, within ±32 px (±2%)       |
| Safe area           | All opaque pixels inside x ∈ [48, 1552], y ∈ [80, 2000]      |
| Bleed               | **None.** Nothing touches the top or side edges.             |

Why these numbers:

- The component renders frames with `object-fit: contain` and
  `object-position: 50% 100%` inside a **4 : 5** box, and the hero aligns
  that box flush with the horizon line. **The bottom edge of the canvas *is*
  the ground.** Soles above it make the character float; past it they get
  clipped.
- 1600 px wide is ~1.8× the largest rendered size today (the hero figure
  tops out near 450 CSS px, ≈ 900 px at 2× DPR), so the same file stays
  sharp for retina displays and for larger future placements.
- Every frame — master, expression, pose, gaze, interaction, blink — must be
  **exactly** this canvas, with the figure at exactly this scale and this
  baseline. That is what stops the character from jumping when the renderer
  switches frames.

## 13. Consistency rules

**Master first.** `master/lovepreet-master.webp` is the single source of
visual truth. It is never a "roughly similar" drawing — every other frame is
derived from it, by re-posing the same character or by redrawing only the
part that changes on top of the same construction.

There is no second character design. Never generate a fresh character for a
new pose.

Every derived frame must preserve:

- the same head proportions (7.5 heads, +4% allowance)
- the same hairstyle, hairline and hair volume
- the same beard and moustache shape
- the same face — bone structure, eye shape, nose, brow
- the same clothing language — the identical five garments, unchanged
- the same body proportions and limb lengths
- the same illustration style — same line weight, same shading count, same
  material treatment
- the same palette, the same key light direction, the same rim light side
- the same canvas, the same figure scale, the same baseline

**Derivation rules for future frames (documentation only — not built now):**

- An **expression** frame changes only the face (brows, eyes, mouth) and
  nothing else — same body, same pose, same everything.
- A **pose/activity** frame re-poses the body but redraws the head in the
  neutral expression unless the activity implies otherwise, keeping the
  outfit identical.
- A **gaze** frame moves the eyes only; the head stays put.
- **Never mirror a frame.** Flipping reverses the hair parting, the beard
  line, the watch wrist and the light direction, which the eye catches
  immediately.
- When in doubt, overlay the new frame on the master at 50% opacity: the
  baseline, the crown and the silhouette should line up.

**Acceptance test for any new frame:** flip between master and the new frame
rapidly. If the character appears to move, resize, jump, or change identity,
the frame fails.

## 14. Things the artwork generator must NOT do

1. Do not add a background, backdrop, gradient, shape, ground plane, floor or
   horizon.
2. Do not add a cast shadow, drop shadow, glow, bloom or halo.
3. Do not add text, a name label, a signature, a watermark, a logo or a
   border/frame.
4. Do not crop the figure, crop the head, or cut off the feet.
5. Do not change the canvas size, aspect ratio, figure scale or baseline
   between frames.
6. Do not redraw a different character for a new pose — derive from the
   master.
7. Do not mirror the figure.
8. Do not switch the light direction between frames.
9. Do not change the outfit, hairstyle, beard or accessories between frames.
10. Do not stylise toward a child, a mascot, an anime/chibi style, or a
    generic "developer avatar".
11. Do not render photorealistically — no skin texture, no photographic
    grain, no lens or blur effects.
12. Do not use pure black or pure white.
13. Do not draw both hands in pockets or hide the hands behind the body.
14. Do not bake in CSS-owned concerns: positioning, scale, grounding offset,
    gaze offsets, breathing or any animation state.
15. Do not attach a `@2x` suffix, dimensions, or uppercase to the filename.
16. Do not publish the reference photographs as artwork.
17. Do not fabricate detail that contradicts the reference photographs
    (birthmarks, tattoos, jewellery, eyewear).

## 15. Required export format

- **Shipping format:** WebP with alpha (`image/webp`), lossy, **quality
  82–88** (85 recommended), encoder method 6, sRGB.
- **Archival master:** PNG-24 with alpha, lossless, kept alongside or
  outside the published tree — regenerate WebP from it when the art changes.
- One file per state, lower-case kebab-case, e.g.
  `public/character/master/lovepreet-master.webp`. Full list in
  `public/character/README.md`.
- Target size per frame: **≤ 400 KB**, ideally 150–300 KB at q85.
- Filenames carry no `@2x`, no dimensions, no version suffix.
- Verify each export over both `#f6f1e8` and `#141210` before shipping (§11).

## 16. Required resolution

- Master: **1600 × 2000 px**, 4 : 5.
- Every derived frame: **1600 × 2000 px** — identical, no exceptions.
- Rendered size today: the hero figure box is `min(36vw, 28rem)` wide
  (≈ 448 px, ≈ 900 px at 2× DPR) with a 4 : 5 height, so 1600 × 2000 gives
  ≈ 1.8× headroom for the current hero and plenty for any larger placement.
- Do not ship a 1× asset and scale it up in CSS, and do not ship an 8000 px
  file — both cost more than they gain.

## 17. How the asset will be integrated into the website

1. **Files land** in `public/character/` under the folder that matches their
   state (`master/`, `hero/`, `expressions/`, `activities/`,
   `interactions/`), using the exact names in
   `public/character/README.md`.
2. **Registration** is one line per frame in
   `src/components/AnimatedCharacter/characterAssets.ts`:

   ```ts
   export const characterAssets: Partial<Record<CharacterLayerKey, string>> = {
     base: CHARACTER_FILES.base,
     blink: CHARACTER_FILES.blink,
   }
   ```

   `CHARACTER_FILES` already holds every canonical path, so no component, no
   prop and no stylesheet changes when the artwork arrives.
3. **Frame selection** — `resolveCharacterLayers()` resolves the current
   `{ pose, expression, gaze, interaction, blink }` to **exactly one**
   frame, in priority order
   `blink → pose → expression → gaze → interaction → base`, skipping any
   frame that is not registered so artwork can land in any order. Frames are
   switched, never stacked, so the shared canvas and baseline keep the
   figure perfectly still between states.
4. **The master is never rendered directly.** It is the reference every
   other frame is checked against. For a first integration the master may be
   registered as `base` so the real character appears immediately, then
   replaced by `hero/idle.webp` once the hero frame exists.
5. **All positioning lives in CSS**, never in the artwork:
   - scale and placement — `.hero-character` width steps and
     `.character-root`'s `aspect-ratio: 4 / 5`
   - grounding — the figure box sits flush with `.hero-ground` (the horizon)
     and the CSS contact shadow sits under the soles
   - gaze — `useCharacterGaze` writes `--gaze-x`, `--gaze-y` and
     `--attentive`; `.character-layer` translates by `--layer-depth`
   - breathing — `.character-breathe` while the pose is `idle`
   - responsiveness — width clamps per breakpoint, no artwork changes
6. **Hero behaviour it must support:** the figure overlaps the sun and the
   hill (it paints after `.hero-scene` in DOM order), stands on the horizon
   (box bottom = ground line), extends past the scenic shapes (nothing
   clips it inside `.hero-stage`), receives gaze transforms and breathing,
   and stays responsive. Because the artwork is transparent and
   position-free, the identical file can be reused in any other section.

---

## Delivery checklist

- [ ] 1600 × 2000 px, 4 : 5, sRGB + alpha
- [ ] Soles exactly on the bottom edge; figure centred; nothing touching the
      other three edges
- [ ] Transparent background; no shadow, no text, no border, no frame
- [ ] Clean alpha edge verified over `#f6f1e8` and `#141210`
- [ ] WebP q85 ≤ 400 KB, plus a lossless PNG-24 archive
- [ ] Likeness checked against the reference photographs
- [ ] Style checked against §7 (editorial, cel-shaded, mature, not
      childish, not photorealistic)
- [ ] Flicker test against the master passes (§13)
