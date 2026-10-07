import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useCharacterPose } from '@/contexts/CharacterPoseContext'
import type { CharacterPose } from '@/components/AnimatedCharacter/types'

gsap.registerPlugin(ScrollTrigger)

/**
 * Maps section IDs to the character pose that should show while that section
 * is in the viewport. Data-driven: add a row to switch on a new section.
 */
const SECTION_POSES: Array<{ sectionId: string; pose: CharacterPose }> = [
  { sectionId: 'work', pose: 'sit-coding' },
  { sectionId: 'about', pose: 'thinking' },
  { sectionId: 'experience', pose: 'thinking' },
  { sectionId: 'contact', pose: 'wave' },
]

/**
 * Watches scroll position and updates the global character pose whenever a
 * mapped section enters or leaves the viewport.
 *
 * `setPose` and `resetPose` are held in refs so the ScrollTriggers are only
 * created once (on mount) and never torn down due to identity changes in the
 * context callbacks. This prevents the destroy/recreate cycle that would
 * otherwise fire on every pose transition.
 */
export function useScrollPose() {
  const { setPose, resetPose } = useCharacterPose()
  const reducedMotion = useReducedMotion()

  // Keep stable refs so ScrollTrigger callbacks always call the latest version
  // without needing to be in the useEffect dependency array.
  const setPoseRef = useRef(setPose)
  const resetPoseRef = useRef(resetPose)
  useEffect(() => { setPoseRef.current = setPose }, [setPose])
  useEffect(() => { resetPoseRef.current = resetPose }, [resetPose])

  useEffect(() => {
    if (reducedMotion) {
      // Lightweight fallback — IntersectionObserver, no GSAP overhead.
      const observers: IntersectionObserver[] = []

      for (const { sectionId, pose } of SECTION_POSES) {
        const el = document.getElementById(sectionId)
        if (!el) continue

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (!entry) return
            if (entry.isIntersecting) {
              setPoseRef.current(pose)
            }
          },
          { threshold: 0.3 },
        )
        observer.observe(el)
        observers.push(observer)
      }

      return () => observers.forEach((o) => o.disconnect())
    }

    // GSAP ScrollTrigger path — created once, never recreated on pose changes.
    const ctx = gsap.context(() => {
      for (const { sectionId, pose } of SECTION_POSES) {
        const el = document.getElementById(sectionId)
        if (!el) continue

        ScrollTrigger.create({
          trigger: el,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => setPoseRef.current(pose),
          onEnterBack: () => setPoseRef.current(pose),
          onLeaveBack: () => resetPoseRef.current(),
        })
      }
    })

    return () => ctx.revert()
  }, [reducedMotion]) // stable — callbacks accessed via refs, not deps
}
