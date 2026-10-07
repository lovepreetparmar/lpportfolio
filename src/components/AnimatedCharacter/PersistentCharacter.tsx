import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useCharacterPose } from '@/contexts/CharacterPoseContext'
import { AnimatedCharacter } from './AnimatedCharacter'

gsap.registerPlugin(ScrollTrigger)

/**
 * A fixed-position character layer that becomes visible when the Work section
 * enters the viewport and disappears after the Contact section leaves.
 *
 * It consumes the same CharacterPoseContext as the Hero character, so the
 * scroll-driven pose changes (sit-coding → thinking → wave) are reflected here
 * without any additional state wiring.
 *
 * The layer is scoped under `.persistent-character` so it cannot accidentally
 * inherit or override any `.hero-*` or `.hero-character` styles.
 *
 * The Hero character remains completely unchanged — this component renders
 * outside #hero in a portal-like fixed layer.
 */
export function PersistentCharacter() {
  const { pose } = useCharacterPose()
  const rootRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const el = rootRef.current
    const workEl = document.getElementById('work')
    const contactEl = document.getElementById('contact')
    if (!el || !workEl || !contactEl) return

    // Start invisible
    gsap.set(el, { opacity: 0, pointerEvents: 'none' })

    if (reducedMotion) {
      // Instant show/hide via IntersectionObserver
      const showObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry) return
          if (entry.isIntersecting) {
            el.style.opacity = '1'
            el.style.pointerEvents = 'auto'
          }
        },
        { threshold: 0.1 },
      )
      const hideObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry) return
          if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
            // Contact scrolled past — hide
            el.style.opacity = '0'
            el.style.pointerEvents = 'none'
          }
        },
        { threshold: 0 },
      )
      showObserver.observe(workEl)
      hideObserver.observe(contactEl)
      return () => {
        showObserver.disconnect()
        hideObserver.disconnect()
      }
    }

    const ctx = gsap.context(() => {
      // Fade in when Work enters
      ScrollTrigger.create({
        trigger: workEl,
        start: 'top 70%',
        onEnter: () =>
          gsap.to(el, { opacity: 1, pointerEvents: 'auto', duration: 0.5, ease: 'power2.out' }),
        onLeaveBack: () =>
          gsap.to(el, { opacity: 0, pointerEvents: 'none', duration: 0.4, ease: 'power2.in' }),
      })

      // Fade out after Contact leaves
      ScrollTrigger.create({
        trigger: contactEl,
        start: 'bottom 30%',
        onEnter: () =>
          gsap.to(el, { opacity: 0, pointerEvents: 'none', duration: 0.4, ease: 'power2.in' }),
        onLeaveBack: () =>
          gsap.to(el, { opacity: 1, pointerEvents: 'auto', duration: 0.5, ease: 'power2.out' }),
      })
    })

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <div
      ref={rootRef}
      className="persistent-character pointer-events-none fixed bottom-0 right-0 z-20 hidden md:block"
      aria-hidden="true"
    >
      <AnimatedCharacter
        pose={pose}
        interaction="resting"
        motion="auto"
        alt=""
      />
    </div>
  )
}
