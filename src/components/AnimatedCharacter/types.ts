/**
 * Character system types.
 *
 * Every state maps to an optional illustration frame living in
 * `public/character/` (see `characterAssets.ts`). Missing frames fall back to
 * the nearest available one, so the artwork can land in any order.
 */

/** Facial expressions the character can hold. */
export const CHARACTER_EXPRESSIONS = [
  'neutral',
  'happy',
  'curious',
  'thinking',
  'surprised',
  'excited',
  'confident',
  'focused',
] as const
export type CharacterExpression = (typeof CHARACTER_EXPRESSIONS)[number]

/** Full-body activities / poses. */
export const CHARACTER_POSES = [
  'idle',
  'coding',
  'sit-coding',
  'coffee',
  'phone',
  'wave',
  'thinking',
  'walk',
] as const
export type CharacterPose = (typeof CHARACTER_POSES)[number]

/** Discrete gaze directions. `'auto'` is the pointer-driven mode (see props). */
export const CHARACTER_GAZES = ['neutral', 'left', 'right', 'up', 'down'] as const
export type CharacterGaze = (typeof CHARACTER_GAZES)[number]

/**
 * How the figure reacts to the visitor.
 * - `auto` — pointer (desktop) / touch + scroll (mobile) driven attention
 * - `resting` — neutral and still; for background or decorative placements
 * - `engaged` — like `auto`, with heightened amplitude and faster easing
 */
export const CHARACTER_INTERACTIONS = ['auto', 'resting', 'engaged'] as const
export type CharacterInteraction = (typeof CHARACTER_INTERACTIONS)[number]

/**
 * Motion switch.
 * - `auto` — honours `prefers-reduced-motion`
 * - `on` / `off` — explicit override
 */
export type CharacterMotionMode = 'auto' | 'on' | 'off'

export type CharacterOffset = {
  /** Horizontal offset from the layout slot (`number` = px). */
  x?: number | string
  /** Vertical offset from the layout slot (`number` = px). */
  y?: number | string
}

export type AnimatedCharacterProps = {
  /** Expression frame to display. Falls back to `neutral`. */
  expression?: CharacterExpression
  /** Activity / pose frame to display. Falls back to `idle`. */
  pose?: CharacterPose
  /**
   * Fixed gaze direction, or `'auto'` (default) to follow the pointer.
   * On touch devices `'auto'` reacts to an active touch and to page scroll.
   */
  gaze?: CharacterGaze | 'auto'
  /** Pointer reaction mode. */
  interaction?: CharacterInteraction
  /** Motion behaviour. `'auto'` respects `prefers-reduced-motion`. */
  motion?: CharacterMotionMode
  /** Uniform scale applied to the figure (visual only — layout box is unchanged). */
  scale?: number
  /** Position offset from the layout slot. */
  offset?: CharacterOffset
  /** Image loading strategy — the above-the-fold hero character should be `high`. */
  priority?: 'high' | 'auto'
  /** Accessible description of the artwork. */
  alt?: string
  /** Layout classes: size and placement. */
  className?: string
  /** @deprecated Use `pose` and `expression`. Kept for existing call sites. */
  state?: CharacterState
  /** @deprecated Use `interaction="resting"`. Kept for existing call sites. */
  followCursor?: boolean
}

/**
 * Legacy v1 state prop, folded into `{ pose, expression }` by the component.
 *
 * @deprecated Use `pose` + `expression`.
 */
export type CharacterState =
  | 'idle'
  | 'looking'
  | 'happy'
  | 'curious'
  | 'thinking'
  | 'excited'
  | 'working'
