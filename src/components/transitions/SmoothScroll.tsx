import Lenis from 'lenis'
import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ensureGsapPlugins } from '@/animations/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type SmoothScrollProps = {
  children: ReactNode
}

/** Anchors are hash-only and always same-page (e.g. `#work`). */
const HASH_SELECTOR = /^#[\w-]+$/

export function SmoothScroll({ children }: SmoothScrollProps) {
  const reducedMotion = useReducedMotion()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    ensureGsapPlugins()

    let tick: ((time: number) => void) | undefined

    if (reducedMotion) {
      ScrollTrigger.refresh()
    } else {
      const lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
        touchMultiplier: 1.2,
      })

      lenisRef.current = lenis
      lenis.on('scroll', ScrollTrigger.update)

      tick = (time: number) => {
        lenis.raf(time * 1000)
      }
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
    }

    const headerOffset = () => {
      const header = document.querySelector('header')
      return header instanceof HTMLElement ? header.offsetHeight : 0
    }

    /**
     * Route in-page anchors through Lenis so smooth scrolling and the fixed
     * header offset are respected. Falls back to an instant native jump when
     * Lenis is inactive (prefers-reduced-motion). Targets that do not exist on
     * the current page are left to native browser behaviour.
     */
    const onAnchorClick = (event: MouseEvent) => {
      const element = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null
      if (!(element instanceof HTMLAnchorElement)) return

      const hash = element.getAttribute('href')
      if (!hash || !HASH_SELECTOR.test(hash)) return

      const target = document.querySelector(hash)
      if (!target) return

      event.preventDefault()

      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset()

      if (lenisRef.current) {
        lenisRef.current.scrollTo(top, { duration: 1.1 })
      } else {
        window.scrollTo({ top, behavior: 'auto' })
      }

      if (window.location.hash !== hash) {
        window.history.pushState(null, '', hash)
      }
    }

    document.addEventListener('click', onAnchorClick)

    return () => {
      document.removeEventListener('click', onAnchorClick)
      if (tick) gsap.ticker.remove(tick)
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
      }
    }
  }, [reducedMotion])

  return children
}
