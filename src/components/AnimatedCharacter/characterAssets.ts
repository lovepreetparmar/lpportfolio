import type {
  CharacterExpression,
  CharacterGaze,
  CharacterInteraction,
  CharacterPose,
} from './types'

/** Root of the published character artwork (`public/character/`). */
export const CHARACTER_ASSET_ROOT = '/character'

/**
 * Addressable character frames.
 *
 * One key = one file. A new state in `types.ts` cannot be added without also
 * deciding its filename in `CHARACTER_FILES` below, so the artwork contract
 * and the code can never drift apart.
 */
export type CharacterLayerKey =
  | 'base'
  | `pose:${CharacterPose}`
  | `gaze:${CharacterGaze}`
  | `expression:${CharacterExpression}`
  | `interaction:${CharacterInteraction}`
  | 'blink'

export type CharacterLayer = {
  key: CharacterLayerKey
  src: string
  /** Parallax strength of this plane, relative to the figure (0 = still, 1 = full gaze). */
  depth: number
}

/**
 * The source of visual truth. Never rendered directly — every other frame is
 * derived from it (see `CHARACTER_MASTER_SPEC.md`).
 */
export const CHARACTER_MASTER_FILE = `${CHARACTER_ASSET_ROOT}/master/lovepreet-master-b.webp`

/**
 * Canonical path of every frame described in `public/character/README.md`.
 *
 * `null` means "this state deliberately has no file of its own": it is either
 * the default (`pose:idle`, `gaze:neutral`) or it falls back to `base`.
 * Nothing here is fetched — this is the filename contract only.
 */
export const CHARACTER_FILES = {
  master: CHARACTER_MASTER_FILE,

  // hero/
  base: `${CHARACTER_ASSET_ROOT}/hero/lovepreet-b-idle.webp`,
  blink: `${CHARACTER_ASSET_ROOT}/hero/blink.webp`,
  'gaze:neutral': null,
  'gaze:left': `${CHARACTER_ASSET_ROOT}/hero/look-left.webp`,
  'gaze:right': `${CHARACTER_ASSET_ROOT}/hero/look-right.webp`,
  'gaze:up': `${CHARACTER_ASSET_ROOT}/hero/look-up.webp`,
  'gaze:down': `${CHARACTER_ASSET_ROOT}/hero/look-down.webp`,

  // activities/
  'pose:idle': null,
  'pose:coding': `${CHARACTER_ASSET_ROOT}/activities/coding.webp`,
  'pose:sit-coding': `${CHARACTER_ASSET_ROOT}/poses/lovepreet-sit-coding.webp`,
  'pose:coffee': `${CHARACTER_ASSET_ROOT}/activities/coffee.webp`,
  'pose:phone': `${CHARACTER_ASSET_ROOT}/activities/phone.webp`,
  'pose:wave': `${CHARACTER_ASSET_ROOT}/poses/lovepreet-wave.webp`,
  'pose:thinking': `${CHARACTER_ASSET_ROOT}/poses/lovepreet-thinking.webp`,
  'pose:walk': `${CHARACTER_ASSET_ROOT}/poses/lovepreet-walk.webp`,

  // expressions/
  'expression:neutral': `${CHARACTER_ASSET_ROOT}/expressions/neutral.webp`,
  'expression:happy': `${CHARACTER_ASSET_ROOT}/expressions/happy.webp`,
  'expression:curious': `${CHARACTER_ASSET_ROOT}/expressions/curious.webp`,
  'expression:thinking': `${CHARACTER_ASSET_ROOT}/expressions/thinking.webp`,
  'expression:surprised': `${CHARACTER_ASSET_ROOT}/expressions/surprised.webp`,
  'expression:excited': `${CHARACTER_ASSET_ROOT}/expressions/excited.webp`,
  'expression:confident': `${CHARACTER_ASSET_ROOT}/expressions/confident.webp`,
  'expression:focused': `${CHARACTER_ASSET_ROOT}/expressions/focused.webp`,

  // interactions/
  'interaction:auto': `${CHARACTER_ASSET_ROOT}/interactions/auto.webp`,
  'interaction:resting': `${CHARACTER_ASSET_ROOT}/interactions/resting.webp`,
  'interaction:engaged': `${CHARACTER_ASSET_ROOT}/interactions/engaged.webp`,
} as const satisfies Record<CharacterLayerKey | 'master', string | null>

/**
 * Registry of the frames actually published.
 *
 * Empty until the illustrated artwork lands — register real transparent
 * frames here and nothing else in the component API has to change:
 *
 * ```ts
 * export const characterAssets: Partial<Record<CharacterLayerKey, string>> = {
 *   base: CHARACTER_FILES.base,
 *   'expression:happy': CHARACTER_FILES['expression:happy'],
 *   'pose:coffee': CHARACTER_FILES['pose:coffee'],
 *   blink: CHARACTER_FILES.blink,
 * }
 * ```
 *
 * Only ship what exists: an unregistered key is simply skipped, and when no
 * key resolves at all the component shows an invisible placeholder frame.
 * Until the derived frames exist, the master can be registered as `base` to
 * put the real character on screen immediately.
 */
export const characterAssets: Partial<Record<CharacterLayerKey, string>> = {
  base: CHARACTER_FILES.base,
  'pose:sit-coding': CHARACTER_FILES['pose:sit-coding'],
  'pose:wave': CHARACTER_FILES['pose:wave'],
  'pose:thinking': CHARACTER_FILES['pose:thinking'],
  'pose:walk': CHARACTER_FILES['pose:walk'],
}

/**
 * Every frame is the whole figure on one shared canvas, so every frame is
 * one plane moving at one rate — mixing depths would make the figure slide by
 * a different amount depending on which state is showing.
 */
const FRAME_DEPTH = 0.5

export type CharacterSelection = {
  pose: CharacterPose
  expression: CharacterExpression
  gaze: CharacterGaze
  interaction: CharacterInteraction
  blink: boolean
}

/**
 * Frames in descending priority: a standing body state outranks the face,
 * the face outranks an explicit gaze, and `base` catches everything else.
 * The idle pose and the neutral gaze are not overrides, so they never
 * displace a more specific frame.
 */
function frameCandidates(selection: CharacterSelection): CharacterLayerKey[] {
  const candidates: CharacterLayerKey[] = []

  if (selection.pose !== 'idle') candidates.push(`pose:${selection.pose}`)
  candidates.push(`expression:${selection.expression}`)
  if (selection.gaze !== 'neutral') candidates.push(`gaze:${selection.gaze}`)
  candidates.push(`interaction:${selection.interaction}`)
  candidates.push('base')

  return candidates
}

/**
 * Resolve the current state to the one frame to paint.
 *
 * Frames are switched, never stacked: they are complete figures sharing one
 * canvas and one baseline, so drawing two at once would ghost. The first
 * registered candidate wins, which lets artwork arrive in any order — an
 * unregistered state falls back to the nearest frame that does exist.
 *
 * The blink frame is derived from the neutral standing figure, so it only
 * replaces `base`; blinking through any other state would swap the whole body
 * for a moment.
 */
export function resolveCharacterLayers(selection: CharacterSelection): CharacterLayer[] {
  const selected =
    frameCandidates(selection).find((key) => Boolean(characterAssets[key])) ?? null

  const key =
    selection.blink && selected === 'base' && characterAssets.blink ? 'blink' : selected
  if (!key) return []

  const src = characterAssets[key]
  if (!src) return []

  return [{ key, src, depth: FRAME_DEPTH }]
}
