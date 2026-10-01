import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type PageEnterProps = {
  children: ReactNode
  className?: string
}

export function PageEnter({ children, className }: PageEnterProps) {
  const reducedMotion = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || reducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out',
          clearProps: 'opacity,transform',
          onComplete: () => ScrollTrigger.refresh(),
        },
      )
    }, root)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  )
}
