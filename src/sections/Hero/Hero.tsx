import { useLayoutEffect, useRef, useState } from 'react'
import { AnimatedCharacter } from '@/components/AnimatedCharacter/AnimatedCharacter'
import { useCharacterExpression } from '@/contexts/CharacterExpressionContext'
import { useCharacterPose } from '@/contexts/CharacterPoseContext'
import { heroContent } from '@/data/hero'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { HeroEnvironment } from './HeroEnvironment'
import { HeroTypography } from './HeroTypography'
import { playHeroEntrance } from './heroEntrance'

/**
 * The hero as an illustrated scene rather than text beside a picture:
 * editorial type on the left, and on the right a small world — a low sun, a
 * distant hill, a horizon, a strip of ground — built so the character can
 * stand in it, overlap the shapes and reach past them.
 *
 * Everything in `.hero-scene` hangs off the stage's bottom edge, which is
 * also where the ground line sits, so the scenery and the horizon always
 * agree. The scene is decorative and hidden from assistive tech; the figure
 * is the subject.
 *
 * The character stays `resting` until the entrance settles, then switches to
 * pointer-driven interaction — sequence step 4 of the entrance.
 */
export function Hero() {
  const { expression } = useCharacterExpression()
  const { pose } = useCharacterPose()
  const rootRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const [settled, setSettled] = useState(false)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return undefined
    return playHeroEntrance(root, { reduced: reducedMotion, onSettled: () => setSettled(true) })
  }, [reducedMotion])

  return (
    <section
      id="hero"
      ref={rootRef}
      className="hero hero--grain relative isolate min-h-[100svh] overflow-hidden bg-cream"
      aria-label="Introduction"
    >
      <HeroEnvironment />

      <div className="page-padding relative z-10 grid min-h-[100svh] grid-cols-1 content-end gap-x-8 gap-y-8 pt-24 pb-12 md:grid-cols-12 md:items-end md:gap-y-0 md:pb-20">
        <div className="relative z-10 md:col-span-7 md:pb-5">
          <HeroTypography />
        </div>

        <div className="hero-stage relative z-[5] md:col-span-5" data-hero-stage>
          <div className="hero-scene" aria-hidden="true">
            <span className="hero-scene__sun" data-parallax="0.05" />
            <span className="hero-scene__hill" data-parallax="-0.02" />
            <span className="hero-scene__ground" />
            <span className="hero-scene__tuft" />
            <span className="hero-scene__stone" />
            <span className="hero-ground" data-hero-ground />
          </div>

          <AnimatedCharacter
            expression={expression}
            pose={pose}
            interaction={settled ? 'auto' : 'resting'}
            priority="high"
            alt={heroContent.characterAlt}
            className="hero-character"
          />
        </div>
      </div>
    </section>
  )
}
