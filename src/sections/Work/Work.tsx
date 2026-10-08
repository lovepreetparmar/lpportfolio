import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/data/projects'
import { ProjectRoom } from './ProjectRoom'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const featured = projects.filter((p) => p.featured)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || reducedMotion) return

    const ctx = gsap.context(() => {
      const rooms = gsap.utils.toArray<HTMLElement>('[data-project-room]')
      rooms.forEach((room) => {
        const editorial = room.querySelector('[data-room-editorial]')
        const visual = room.querySelector('[data-room-visual]')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: room,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })

        tl.fromTo(
          room,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        )

        if (editorial) {
          tl.fromTo(
            editorial,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
            '-=0.4',
          )
        }

        if (visual) {
          tl.fromTo(
            visual,
            { opacity: 0, y: 20, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' },
            '-=0.4',
          )
        }
      })
    }, section)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section
      id="work"
      ref={sectionRef}
      className="section-gap page-padding border-t border-ink/10 bg-white/30 py-24 md:py-32"
      aria-label="Work"
    >
      <header className="mb-16 max-w-2xl md:mb-24">
        <p className="label-mono text-ink/50">Work</p>
        <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-ink md:text-6xl">
          Selected projects
        </h2>
        <p className="mt-6 text-lg text-ink/70">
          Product stories across mobile, web, and AI — step inside each project room.
        </p>
      </header>

      <div className="space-y-16 md:space-y-24">
        {featured.map((project) => (
          <ProjectRoom key={project.slug} project={project} />
        ))}
      </div>
    </section>
  )
}
