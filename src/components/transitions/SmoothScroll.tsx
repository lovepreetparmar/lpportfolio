import Lenis from 'lenis'
import { useEffect, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ensureGsapPlugins } from '@/animations/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type SmoothScrollProps = {
  children: ReactNode
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    ensureGsapPlugins()

    if (reducedMotion) {
      ScrollTrigger.refresh()
      return
    }

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      touchMultiplier: 1.2,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [reducedMotion])

  return children
}
