import gsap from 'gsap'
import { prefersReducedMotion } from './utils'

export function runHeroIntro(root: HTMLElement): gsap.Context {
  const reduced = prefersReducedMotion()

  return gsap.context(() => {
    const lovepreet = root.querySelector('.hero-lovepreet')
    const parmar = root.querySelector('.hero-parmar')
    const hints = root.querySelectorAll('[data-hero-hint]')

    if (!lovepreet || !parmar) return

    gsap.set([lovepreet, parmar], { opacity: 1, y: 0, x: 0 })

    if (reduced) {
      gsap.set(hints, { opacity: 1 })
      return
    }

    gsap.fromTo(
      lovepreet,
      { y: 48, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
    )
    gsap.fromTo(
      parmar,
      { y: 64, opacity: 0 },
      { y: 0, opacity: 0.35, duration: 1.1, ease: 'power3.out', delay: 0.08 },
    )

    if (hints.length) {
      gsap.set(hints, { opacity: 0, y: 8 })
      gsap.to(hints, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 1.8,
        ease: 'power2.out',
        delay: 0.9,
      })
    }
  }, root)
}
