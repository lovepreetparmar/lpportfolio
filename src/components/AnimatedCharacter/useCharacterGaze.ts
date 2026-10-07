import { useEffect, type RefObject } from 'react'
import type { CharacterGaze, CharacterInteraction } from './types'

export type GazeVector = { x: number; y: number }

const GAZE_VECTORS: Record<CharacterGaze, GazeVector> = {
  neutral: { x: 0, y: 0 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
}

export type UseCharacterGazeOptions = {
  /** Pointer reaction mode. `'resting'` keeps the figure neutral. */
  mode: CharacterInteraction
  /** When false the figure freezes — used for `prefers-reduced-motion`. */
  motion: boolean
  /** Fixed gaze override (from the `gaze` prop). Wins over pointer input. */
  gaze: CharacterGaze | 'auto'
}

/** Pointer input stops steering the figure after this long. */
const IDLE_MS = 3200
const DRIFT_MIN_MS = 3400
const DRIFT_MAX_MS = 6600
const SCROLL_RELAX_MS = 340

/** Values below this are treated as "already at rest" so the rAF loop can stop. */
const SETTLE = 0.004
const EASE = 0.075
const ENGAGED_EASE = 0.1

/** Maximum gaze deflection towards the pointer, in normalised units. */
const DIRECTION_RANGE = 0.85
/** Pointer within this multiple of the figure size counts as "close". */
const ATTENTION_DISTANCE = 1.6
const MAX_SCROLL_BIAS = 0.4

function clamp(value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value
}

function readVar(element: HTMLElement, name: string): number {
  const value = Number.parseFloat(element.style.getPropertyValue(name))
  return Number.isFinite(value) ? value : 0
}

/**
 * Pointer-driven gaze for the illustrated character.
 *
 * Direction, proximity and attention are read from pointer events and eased
 * towards the figure inside a rAF loop that writes three CSS custom properties
 * (`--gaze-x`, `--gaze-y`, `--attentive`). React is never re-rendered by
 * pointer input, and the loop parks itself as soon as the figure settles.
 *
 * Touch devices get the same behaviour while a finger is down, plus a small
 * bias from page scroll. Static states (fixed gaze, `resting`, reduced motion)
 * write one value and never start a loop.
 */
export function useCharacterGaze(
  root: RefObject<HTMLElement | null>,
  { mode, motion, gaze }: UseCharacterGazeOptions,
): void {
  useEffect(() => {
    const element = root.current
    if (!element) return

    const fixed = gaze === 'auto' ? null : GAZE_VECTORS[gaze]

    const freeze = () => {
      const x = fixed?.x ?? 0
      const y = fixed?.y ?? 0
      element.style.setProperty('--gaze-x', String(x))
      element.style.setProperty('--gaze-y', String(y))
      element.style.setProperty('--attentive', '0')
    }

    if (fixed || !motion || mode === 'resting') {
      freeze()
      return
    }

    const state = {
      x: readVar(element, '--gaze-x'),
      y: readVar(element, '--gaze-y'),
      a: readVar(element, '--attentive'),
      targetX: 0,
      targetY: 0,
      targetA: 0,
      pointerX: 0,
      pointerY: 0,
      pointerA: 0,
      driftX: 0,
      driftY: 0,
      driftA: 0,
      scrollBias: 0,
      lastPointer: Number.NEGATIVE_INFINITY,
      touching: false,
    }
    state.targetX = state.x
    state.targetY = state.y
    state.targetA = state.a

    let frame = 0
    let driftTimer = 0
    let scrollTimer = 0
    let idleTimer = 0
    let disposed = false
    let lastScrollY = window.scrollY

    const isIdle = () => performance.now() - state.lastPointer > IDLE_MS

    const retarget = () => {
      const idle = isIdle()
      const bias = state.scrollBias
      state.targetX = clamp(idle ? state.driftX : state.pointerX, -1, 1)
      state.targetY = clamp((idle ? state.driftY : state.pointerY) + bias, -1, 1)
      state.targetA = clamp(
        (idle ? state.driftA : state.pointerA) + (Math.abs(bias) > 0.01 ? 0.25 : 0),
        0,
        1,
      )
    }

    const atRest = () =>
      Math.abs(state.targetX - state.x) < SETTLE &&
      Math.abs(state.targetY - state.y) < SETTLE &&
      Math.abs(state.targetA - state.a) < SETTLE

    const tick = () => {
      const ease = mode === 'engaged' ? ENGAGED_EASE : EASE
      state.x += (state.targetX - state.x) * ease
      state.y += (state.targetY - state.y) * ease
      state.a += (state.targetA - state.a) * ease * 1.2
      element.style.setProperty('--gaze-x', state.x.toFixed(3))
      element.style.setProperty('--gaze-y', state.y.toFixed(3))
      element.style.setProperty('--attentive', state.a.toFixed(3))
      if (atRest()) {
        frame = 0
        return
      }
      frame = requestAnimationFrame(tick)
    }

    const wake = () => {
      if (frame || disposed) return
      frame = requestAnimationFrame(tick)
    }

    const update = () => {
      retarget()
      wake()
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' && !state.touching) return

      const box = element.getBoundingClientRect()
      const centerX = box.left + box.width / 2
      const centerY = box.top + box.height / 2
      const dx = event.clientX - centerX
      const dy = event.clientY - centerY
      const size = Math.max(box.width, box.height)
      const reach = size * 0.55
      const distance = Math.hypot(dx, dy)

      state.lastPointer = performance.now()
      state.pointerX = clamp(dx / reach, -1, 1) * DIRECTION_RANGE
      state.pointerY = clamp(dy / reach, -1, 1) * DIRECTION_RANGE
      state.pointerA =
        clamp(1 - distance / (size * ATTENTION_DISTANCE), 0, 1) * (mode === 'engaged' ? 1 : 0.85)
      update()

      // A pointer that stops moving is a pointer that has left: relax back to
      // idle instead of freezing in an attentive pose.
      window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(relax, IDLE_MS)
    }

    const relax = () => {
      window.clearTimeout(idleTimer)
      state.lastPointer = Number.NEGATIVE_INFINITY
      state.pointerX = 0
      state.pointerY = 0
      state.pointerA = 0
      update()
    }

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') return
      state.touching = true
      onPointerMove(event)
    }

    const onPointerUp = () => {
      if (!state.touching) return
      state.touching = false
      relax()
    }

    const onScroll = () => {
      const next = window.scrollY
      const delta = next - lastScrollY
      lastScrollY = next
      if (Math.abs(delta) < 1) return

      state.scrollBias = clamp(-delta * 0.03, -MAX_SCROLL_BIAS, MAX_SCROLL_BIAS)
      window.clearTimeout(scrollTimer)
      scrollTimer = window.setTimeout(() => {
        state.scrollBias = 0
        update()
      }, SCROLL_RELAX_MS)
      update()
    }

    // Slow, irregular look-around so the figure never reads as a still image.
    const scheduleDrift = () => {
      driftTimer = window.setTimeout(
        () => {
          if (isIdle()) {
            state.driftX = (Math.random() - 0.5) * 0.5
            state.driftY = (Math.random() - 0.5) * 0.34
            state.driftA = 0.08 + Math.random() * 0.1
            update()
          }
          scheduleDrift()
        },
        DRIFT_MIN_MS + Math.random() * (DRIFT_MAX_MS - DRIFT_MIN_MS),
      )
    }

    scheduleDrift()
    update()

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    window.addEventListener('pointerup', onPointerUp, { passive: true })
    window.addEventListener('pointercancel', onPointerUp, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('blur', relax)
    document.addEventListener('pointerleave', relax)

    return () => {
      disposed = true
      if (frame) cancelAnimationFrame(frame)
      window.clearTimeout(driftTimer)
      window.clearTimeout(scrollTimer)
      window.clearTimeout(idleTimer)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('blur', relax)
      document.removeEventListener('pointerleave', relax)
    }
  }, [root, mode, motion, gaze])
}
