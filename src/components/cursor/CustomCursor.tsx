import { useEffect, useRef, useState } from 'react'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type CursorLabel = 'VIEW' | 'OPEN' | 'PLAY' | 'DRAG' | 'MAIL' | ''

export function CustomCursor() {
  const isMobile = useIsMobile()
  const reducedMotion = useReducedMotion()
  const dotRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const [label, setLabel] = useState<CursorLabel>('')

  useEffect(() => {
    if (isMobile || reducedMotion) return

    const dot = dotRef.current
    const labelEl = labelRef.current
    if (!dot || !labelEl) return

    let x = 0
    let y = 0
    let tx = 0
    let ty = 0

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
    }

    const tick = () => {
      x += (tx - x) * 0.18
      y += (ty - y) * 0.18
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      labelEl.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const cursor = target.closest('[data-cursor]') as HTMLElement | null
      const next = (cursor?.dataset.cursor ?? '') as CursorLabel
      setLabel(next)
      dot.dataset.active = cursor ? 'true' : 'false'
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [isMobile, reducedMotion])

  if (isMobile || reducedMotion) return null

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[90] h-2 w-2 rounded-full bg-ink transition-transform duration-150 data-[active=true]:scale-[3]"
        aria-hidden="true"
      />
      <span
        ref={labelRef}
        className="pointer-events-none fixed left-0 top-0 z-[90] text-[10px] tracking-[0.2em]"
        aria-hidden="true"
      >
        {label}
      </span>
    </>
  )
}
