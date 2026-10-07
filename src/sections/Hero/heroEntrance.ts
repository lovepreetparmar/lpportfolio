import gsap from 'gsap'
import { ensureGsapPlugins } from '@/animations/utils'

export type HeroEntranceOptions = {
  /** Skip motion entirely (`prefers-reduced-motion`). */
  reduced: boolean
  /** Fired as soon as the character may start reacting to the pointer. */
  onSettled: () => void
}

/**
 * Hero entrance.
 *
 * Environment → typography → figure → hints, compressed into ~1.1s so the page
 * becomes interactive immediately instead of playing a cinematic intro.
 * Everything is visible by default in the markup; this runs in a layout effect
 * and simply pulls elements in, so a reduced-motion visitor (or a failed
 * animation) never sees hidden content.
 *
 * Also wires a single, light ScrollTrigger scrub for two decorative shapes.
 */
export function playHeroEntrance(
  root: HTMLElement,
  { reduced, onSettled }: HeroEntranceOptions,
): () => void {
  if (reduced) {
    onSettled()
    return () => undefined
  }

  ensureGsapPlugins()

  const context = gsap.context(() => {
    gsap
      .timeline({ defaults: { ease: 'power3.out' } })
      .from('[data-hero-env]', { opacity: 0, duration: 0.6, stagger: 0.06 }, 0)
      .from('[data-hero-eyebrow]', { opacity: 0, y: 12, duration: 0.5 }, 0.05)
      .from('[data-hero-line]', { yPercent: 118, duration: 0.85, stagger: 0.08 }, 0.1)
      .from('[data-hero-statement]', { opacity: 0, y: 20, duration: 0.7 }, 0.5)
      .from('[data-hero-support]', { opacity: 0, y: 14, duration: 0.55 }, 0.62)
      .from('[data-hero-meta]', { opacity: 0, y: 10, duration: 0.5 }, 0.7)
      .from('[data-hero-cta]', { opacity: 0, y: 14, duration: 0.5 }, 0.76)
      .from('[data-hero-stage]', { opacity: 0, y: 36, scale: 0.955, duration: 0.95 }, 0.28)
      .from(
        '[data-hero-ground]',
        { scaleX: 0, transformOrigin: 'right center', duration: 1, ease: 'power2.out' },
        0.5,
      )
      .from('[data-hero-hint]', { opacity: 0, y: 8, duration: 0.45, stagger: 0.1 }, 0.95)
      .call(onSettled, undefined, 1.05)

    gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((element) => {
      const depth = Number(element.dataset.parallax ?? 0)
      if (!depth) return
      gsap.to(element, {
        yPercent: depth * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      })
    })
  }, root)

  return () => context.revert()
}
