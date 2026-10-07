import type { CharacterExpression, CharacterPose } from './types'

type CharacterPlaceholderProps = {
  expression: CharacterExpression
  pose: CharacterPose
}

/**
 * Invisible stand-in shown while no illustrated frame resolves.
 *
 * It occupies exactly the box the artwork will fill, so the figure keeps its
 * proportions, its contact shadow and its gaze transform — but it paints
 * nothing. No frame, no label, no dashed outline: the scene is meant to read
 * as a finished illustration with the character momentarily absent, never as
 * a slot waiting for art. The state stays on `data-*` for developers only.
 *
 * Register real transparent frames in `characterAssets` and this stops
 * rendering on its own.
 */
export function CharacterPlaceholder({ expression, pose }: CharacterPlaceholderProps) {
  return (
    <span
      className="character-placeholder"
      data-pose={pose}
      data-expression={expression}
      aria-hidden="true"
    />
  )
}
