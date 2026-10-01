import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ensureGsapPlugins } from './utils'

export type RevealOptions = {
  trigger?: Element | string
  start?: string
  stagger?: number
  y?: number
  duration?: number
  scrub?: boolean | number
  markers?: boolean
}

export function revealOnScroll(
  targets: gsap.TweenTarget,
  options: RevealOptions = {},
): ScrollTrigger | undefined {
  ensureGsapPlugins()

  const els = gsap.utils.toArray(targets) as Element[]
  if (!els.length) return undefined

  const trigger = options.trigger ?? els[0]
  const start = options.start ?? 'top 85%'
  const stagger = options.stagger ?? 0.08
  const y = options.y ?? 44
  const duration = options.duration ?? 0.9

  if (options.scrub) {
    return ScrollTrigger.create({
      trigger,
      start,
      end: 'bottom 60%',
      scrub: options.scrub === true ? 0.45 : options.scrub,
      markers: options.markers,
      animation: gsap.fromTo(els, { y, opacity: 0 }, { y: 0, opacity: 1, ease: 'none', stagger }),
    })
  }

  return ScrollTrigger.create({
    trigger,
    start,
    markers: options.markers,
    onEnter: () => {
      gsap.fromTo(
        els,
        { y, opacity: 0 },
        { y: 0, opacity: 1, duration, stagger, ease: 'power3.out', overwrite: 'auto' },
      )
    },
    onLeaveBack: () => {
      gsap.to(els, { y, opacity: 0, duration: duration * 0.65, stagger: stagger * 0.5, ease: 'power2.in' })
    },
  })
}

export function splitLineIntro(
  root: HTMLElement,
  lineSelector: string,
  innerSelector: string,
): gsap.core.Timeline {
  const lines = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(lineSelector))
  const inners = lines.map((line) => line.querySelector(innerSelector)).filter(Boolean)

  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
  tl.fromTo(inners, { yPercent: 108, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.05, stagger: 0.11 })
  return tl
}
