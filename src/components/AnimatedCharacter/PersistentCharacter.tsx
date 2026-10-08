import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useCharacterPose } from '@/contexts/CharacterPoseContext'
import { useCharacterExpression } from '@/contexts/CharacterExpressionContext'
import { AnimatedCharacter } from './AnimatedCharacter'
import { CharacterSpeechBubble } from './CharacterSpeechBubble'
import { CoffeeMug, LaptopScreenGlow, GreetingSparkle } from './CharacterProps'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

/**
 * Stage offsets per pose so the character physically moves across sections
 * rather than staying pinned to the identical pixel coordinates.
 */
const DEFAULT_TRANSFORM = { x: 0, y: 0, scale: 1 }

const POSE_TRANSFORMS: Partial<Record<string, { x: number; y: number; scale: number }>> = {
  'sit-coding': { x: 0, y: 0, scale: 1 },
  thinking: { x: -26, y: -8, scale: 0.98 },
  wave: { x: -60, y: 0, scale: 1.04 },
  idle: { x: 0, y: 0, scale: 1 },
}

/**
 * A dynamic character companion that travels with the visitor from Work
 * through Contact. Rather than a static frozen sticker:
 *  - Moves between sections with spatial transitions (x, y, scale)
 *  - Actively tracks cursor gaze and attentive postures
 *  - Interactive: clicking opens a dialogue bubble with authentic thoughts
 *  - Contextual illustrated props (steaming coffee, laptop glow, greeting particle)
 */
export function PersistentCharacter() {
  const { pose } = useCharacterPose()
  const { setExpression, resetExpression } = useCharacterExpression()
  const rootRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [isBubbleOpen, setIsBubbleOpen] = useState(false)

  // Section entrance / exit visibility
  useEffect(() => {
    const el = rootRef.current
    const workEl = document.getElementById('work')
    const contactEl = document.getElementById('contact')
    if (!el || !workEl || !contactEl) return

    // Start invisible
    gsap.set(el, { opacity: 0, pointerEvents: 'none' })

    if (reducedMotion) {
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
        onLeaveBack: () => {
          gsap.to(el, { opacity: 0, pointerEvents: 'none', duration: 0.4, ease: 'power2.in' })
          setIsBubbleOpen(false)
        },
      })

      // Fade out after Contact leaves
      ScrollTrigger.create({
        trigger: contactEl,
        start: 'bottom 30%',
        onEnter: () => {
          gsap.to(el, { opacity: 0, pointerEvents: 'none', duration: 0.4, ease: 'power2.in' })
          setIsBubbleOpen(false)
        },
        onLeaveBack: () =>
          gsap.to(el, { opacity: 1, pointerEvents: 'auto', duration: 0.5, ease: 'power2.out' }),
      })
    })

    return () => ctx.revert()
  }, [reducedMotion])

  // Dynamic spatial staging transition across sections
  useEffect(() => {
    if (reducedMotion || !stageRef.current) return

    const target = POSE_TRANSFORMS[pose] ?? DEFAULT_TRANSFORM
    gsap.to(stageRef.current, {
      x: target.x,
      y: target.y,
      scale: target.scale,
      duration: 0.65,
      ease: 'power2.out',
    })
  }, [pose, reducedMotion])

  const handleCharacterClick = () => {
    setIsBubbleOpen((prev) => !prev)
    setExpression('happy')
    setTimeout(() => resetExpression(), 2500)

    if (!reducedMotion && stageRef.current) {
      gsap.timeline()
        .to(stageRef.current, { y: '-=12', duration: 0.16, ease: 'power2.out' })
        .to(stageRef.current, { y: '+=12', duration: 0.22, ease: 'bounce.out' })
    }
  }

  return (
    <div
      ref={rootRef}
      className="persistent-character pointer-events-none fixed bottom-0 right-0 z-20 hidden md:block"
      aria-label="Interactive character companion"
    >
      <div ref={stageRef} className="relative">
        {/* Character container with pointer interactions */}
        <div
          className="group relative cursor-pointer pointer-events-auto select-none transition-transform duration-200"
          onClick={handleCharacterClick}
          onPointerEnter={() => setExpression('curious')}
          onPointerLeave={resetExpression}
          data-cursor="CHAT"
          title="Click to talk with Lovepreet"
        >
          {/* Thought / speech bubble floating dynamically above character's head */}
          <div
            className={cn(
              'absolute z-30 transition-all duration-300',
              pose === 'sit-coding'
                ? 'bottom-[75%] right-8 sm:right-14'
                : 'bottom-[102%] right-8 sm:right-14',
            )}
          >
            <CharacterSpeechBubble
              pose={pose}
              isOpen={isBubbleOpen}
              onToggle={() => setIsBubbleOpen((prev) => !prev)}
              onClose={() => setIsBubbleOpen(false)}
            />
          </div>

          {/* Section-specific contextual props */}
          {pose === 'sit-coding' && (
            <>
              <CoffeeMug className="-left-4 bottom-3 z-10" />
              <LaptopScreenGlow className="left-12 bottom-28" />
            </>
          )}

          {pose === 'wave' && (
            <GreetingSparkle className="right-4 top-14 z-10" />
          )}

          {/* Core AnimatedCharacter with gaze tracking enabled */}
          <AnimatedCharacter
            pose={pose}
            interaction="auto"
            motion="auto"
            priority="high"
            alt="Illustrated character of Lovepreet Parmar"
          />
        </div>
      </div>
    </div>
  )
}
