import { useMemo, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'
import { characterAssets, resolveCharacterLayers } from './characterAssets'
import { CharacterFrame } from './CharacterFrame'
import { useBlink } from './useBlink'
import { useCharacterGaze } from './useCharacterGaze'
import type {
  AnimatedCharacterProps,
  CharacterExpression,
  CharacterPose,
  CharacterState,
} from './types'

/** Folding table for the deprecated `state` prop. */
const LEGACY_STATE: Record<CharacterState, { pose: CharacterPose; expression: CharacterExpression }> = {
  idle: { pose: 'idle', expression: 'neutral' },
  looking: { pose: 'idle', expression: 'curious' },
  happy: { pose: 'idle', expression: 'happy' },
  curious: { pose: 'idle', expression: 'curious' },
  thinking: { pose: 'idle', expression: 'thinking' },
  excited: { pose: 'idle', expression: 'excited' },
  working: { pose: 'coding', expression: 'focused' },
}

function toLength(value: number | string | undefined): string {
  if (value === undefined) return '0px'
  return typeof value === 'number' ? `${value}px` : value
}

/**
 * The reusable illustrated character.
 *
 * Renders whatever frames are registered in `characterAssets` (a neutral
 * placeholder until real artwork lands) and keeps them alive with pointer
 * gaze, attention, breathing and irregular blinks. Motion is a self-parking
 * rAF loop that only ever writes CSS custom properties, so pointer input never
 * re-renders React, and everything goes still under `prefers-reduced-motion`.
 *
 * The component is layout-agnostic: size and placement come from `className`,
 * so the same system can be reused by every section.
 */
export function AnimatedCharacter({
  expression,
  pose,
  gaze = 'auto',
  interaction,
  motion = 'auto',
  followCursor,
  scale = 1,
  offset,
  priority = 'auto',
  state,
  alt = 'Illustrated character of Lovepreet Parmar',
  className,
}: AnimatedCharacterProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const legacy = state ? LEGACY_STATE[state] : null
  const resolvedExpression: CharacterExpression = expression ?? legacy?.expression ?? 'neutral'
  const resolvedPose: CharacterPose = pose ?? legacy?.pose ?? 'idle'
  const resolvedInteraction = interaction ?? (followCursor === false ? 'resting' : 'auto')
  const motionEnabled = motion === 'auto' ? !prefersReducedMotion : motion === 'on'
  // Blinking only re-renders the figure once a blink frame actually exists.
  const blink = useBlink({ enabled: motionEnabled && Boolean(characterAssets.blink) })

  useCharacterGaze(rootRef, {
    mode: resolvedInteraction,
    motion: motionEnabled,
    gaze,
  })

  const layers = useMemo(
    () =>
      resolveCharacterLayers({
        pose: resolvedPose,
        expression: resolvedExpression,
        gaze: gaze === 'auto' ? 'neutral' : gaze,
        interaction: resolvedInteraction,
        blink,
      }),
    [resolvedPose, resolvedExpression, gaze, resolvedInteraction, blink],
  )

  return (
    <div
      ref={rootRef}
      className={cn('character-root', className)}
      style={{ transform: `translate(${toLength(offset?.x)}, ${toLength(offset?.y)}) scale(${scale})` }}
      role="img"
      aria-label={alt}
      data-character-state={`${resolvedPose}/${resolvedExpression}`}
      data-character-pose={resolvedPose}
    >
      <div
        className={cn(
          'character-stage',
          resolvedPose === 'idle' && motionEnabled && 'character-breathe',
        )}
      >
        <div className="character-figure">
          <CharacterFrame
            layers={layers}
            expression={resolvedExpression}
            pose={resolvedPose}
            priority={priority}
          />
          <span className="character-shadow" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
