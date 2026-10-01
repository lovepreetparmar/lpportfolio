import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ensureGsapPlugins } from '@/animations/utils'
import { revealOnScroll, splitLineIntro } from '@/animations/reveal'
import { heroScrollStore } from '@/experience/heroScrollStore'
import { tweenSlabToPreset } from '@/experience/slab/tweenSlab'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Central GSAP scroll choreography for the homepage — hero parallax, section reveals, slab cues.
 */
export function HomeScrollMotion() {
  const reducedMotion = useReducedMotion()
  const mounted = useRef(false)

  useEffect(() => {
    if (reducedMotion) {
      heroScrollStore.exit = 0
      return
    }

    ensureGsapPlugins()

    const ctx = gsap.context(() => {
      const hero = document.querySelector('#hero')
      if (hero) {
        const intro = splitLineIntro(hero as HTMLElement, '.hero-headline-line', '.hero-headline-inner')
        intro.fromTo(
          '.hero-character-wrap',
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.15, ease: 'power3.out' },
          0.12,
        )
        intro.fromTo(
          '[data-hero-hint]',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 1.5, ease: 'power2.out' },
          0.75,
        )
        intro.fromTo(
          '[data-hero-fade]',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.06, ease: 'power2.out' },
          0.35,
        )

        ScrollTrigger.create({
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.65,
          onUpdate: (self) => {
            heroScrollStore.exit = self.progress
            gsap.set('[data-hero-parallax="copy"]', { y: self.progress * 72 })
            gsap.set('.hero-character-wrap', {
              y: self.progress * 36,
              scale: 1 - self.progress * 0.06,
            })
            gsap.set('[data-hero-hint]', { opacity: 1 - self.progress * 1.4 })
          },
        })
      }

      revealOnScroll('[data-section-label]', { start: 'top 88%', stagger: 0.05, y: 28 })
      revealOnScroll('[data-section-title]', { start: 'top 86%', stagger: 0.06, y: 48 })

      const work = document.querySelector('#work')
      if (work) {
        ScrollTrigger.create({
          trigger: work,
          start: 'top 70%',
          onEnter: () => tweenSlabToPreset('fitguide', { duration: 1.4, ease: 'power3.inOut' }),
          onLeaveBack: () => tweenSlabToPreset('hero', { duration: 1.1, ease: 'power3.inOut' }),
        })
      }

      const contact = document.querySelector('#contact')
      if (contact) {
        ScrollTrigger.create({
          trigger: contact,
          start: 'top 75%',
          onEnter: () => tweenSlabToPreset('contact', { duration: 1.2, ease: 'power3.inOut' }),
        })
      }
    })

    if (!mounted.current) {
      mounted.current = true
      requestAnimationFrame(() => ScrollTrigger.refresh())
    }

    return () => {
      ctx.revert()
      heroScrollStore.exit = 0
    }
  }, [reducedMotion])

  return null
}
