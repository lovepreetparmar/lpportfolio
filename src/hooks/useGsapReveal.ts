import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { revealOnScroll } from '@/animations/reveal'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type UseGsapRevealOptions = {
  selector?: string
  start?: string
  stagger?: number
  y?: number
}

export function useGsapReveal(
  sectionRef: RefObject<HTMLElement | null>,
  { selector = '[data-reveal]', start, stagger, y }: UseGsapRevealOptions = {},
): void {
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const section = sectionRef.current
    if (!section || reducedMotion) return

    const ctx = gsap.context(() => {
      const targets = section.querySelectorAll(selector)
      if (!targets.length) return
      revealOnScroll(targets, { trigger: section, start, stagger, y })
    }, section)

    return () => ctx.revert()
  }, [sectionRef, reducedMotion, selector, start, stagger, y])
}
