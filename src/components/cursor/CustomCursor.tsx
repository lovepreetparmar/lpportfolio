import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type CursorLabel = 'VIEW' | 'OPEN' | 'PLAY' | 'DRAG' | 'MAIL' | ''

export function CustomCursor() {
  const isMobile = useIsMobile()
  const reducedMotion = useReducedMotion()
  const dotRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState<CursorLabel>('')

  useEffect(() => {
    if (isMobile || reducedMotion) return

    const dot = dotRef.current
    const labelEl = labelRef.current
    const ring = ringRef.current
    if (!dot || !labelEl || !ring) return

    const xTo = gsap.quickTo(dot, 'x', { duration: 0.28, ease: 'power3.out' })
    const yTo = gsap.quickTo(dot, 'y', { duration: 0.28, ease: 'power3.out' })
    const lxTo = gsap.quickTo(labelEl, 'x', { duration: 0.32, ease: 'power3.out' })
    const lyTo = gsap.quickTo(labelEl, 'y', { duration: 0.32, ease: 'power3.out' })
    const rxTo = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' })
    const ryTo = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' })

    gsap.set([dot, labelEl, ring], { xPercent: -50, yPercent: -50, x: 0, y: 0 })

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
      lxTo(e.clientX)
      lyTo(e.clientY)
      rxTo(e.clientX)
      ryTo(e.clientY)
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const cursor = target.closest('[data-cursor]') as HTMLElement | null
      const next = (cursor?.dataset.cursor ?? '') as CursorLabel
      setLabel(next)
      const active = Boolean(cursor)
      dot.dataset.active = active ? 'true' : 'false'
      ring.dataset.active = active ? 'true' : 'false'
      gsap.to(labelEl, { opacity: next ? 1 : 0, duration: 0.2, ease: 'power2.out' })
      gsap.to(ring, { scale: active ? 1 : 0.6, opacity: active ? 0.35 : 0, duration: 0.25 })
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
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[89] h-10 w-10 rounded-full border border-ink/25 opacity-0 transition-[border-color] duration-200 data-[active=true]:border-accent/50 data-[active=true]:opacity-35"
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[90] h-2 w-2 rounded-full bg-ink transition-[transform,background-color] duration-200 data-[active=true]:scale-[2.5] data-[active=true]:bg-accent"
        aria-hidden="true"
      />
      <span
        ref={labelRef}
        className="pointer-events-none fixed left-0 top-0 z-[90] font-mono text-[10px] tracking-[0.2em] text-ink opacity-0"
        aria-hidden="true"
      >
        {label}
      </span>
    </>
  )
}
