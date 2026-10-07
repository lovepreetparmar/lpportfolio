import { useEffect, useState } from 'react'

export type UseBlinkOptions = {
  /** Disable blinking entirely (reduced motion, static placements). */
  enabled: boolean
  /** Longest gap between blinks, in ms. */
  maxDelay?: number
  /** Shortest gap between blinks, in ms. */
  minDelay?: number
  /** How long the eyes stay closed, in ms. */
  duration?: number
}

/**
 * Occasional, irregular blinking.
 *
 * The cadence is randomised so the figure never falls into a visible loop —
 * the goal is "alive", not "animated GIF". Returns true while the eyes are
 * closed; the `blink` character layer is drawn for that window.
 */
export function useBlink({
  enabled,
  minDelay = 2600,
  maxDelay = 6800,
  duration = 110,
}: UseBlinkOptions): boolean {
  const [blinking, setBlinking] = useState(false)

  useEffect(() => {
    if (!enabled) return

    let closedTimer = 0
    let openTimer = 0
    let cancelled = false

    const schedule = () => {
      closedTimer = window.setTimeout(
        () => {
          if (cancelled) return
          setBlinking(true)
          openTimer = window.setTimeout(() => {
            if (cancelled) return
            setBlinking(false)
            schedule()
          }, duration)
        },
        minDelay + Math.random() * (maxDelay - minDelay),
      )
    }

    schedule()

    return () => {
      cancelled = true
      window.clearTimeout(closedTimer)
      window.clearTimeout(openTimer)
      setBlinking(false)
    }
  }, [enabled, minDelay, maxDelay, duration])

  // Masked rather than cleared when disabled, so the effect never has to
  // synchronously re-render to switch blinking off.
  return enabled && blinking
}
