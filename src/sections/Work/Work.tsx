import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/data/projects'
import { ProjectVisual } from '@/components/ProjectVisual/ProjectVisual'
import { useCharacterExpression } from '@/contexts/CharacterExpressionContext'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const { setExpression, resetExpression } = useCharacterExpression()
  const reducedMotion = useReducedMotion()
  const featured = projects.filter((p) => p.featured)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || reducedMotion) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-work-item]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          },
        )
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
      <header className="mb-20 max-w-2xl">
        <p className="label-mono text-ink/50">Work</p>
        <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-ink md:text-6xl">
          Selected projects
        </h2>
        <p className="mt-6 text-lg text-ink/70">
          Product stories across mobile, web, and AI — hover to peek; open for case notes.
        </p>
      </header>

      <ul className="space-y-28 md:space-y-36">
        {featured.map((project) => (
          <li
            key={project.slug}
            data-work-item
            className="grid gap-10 lg:grid-cols-12 lg:items-end"
            onPointerEnter={() => setExpression('curious')}
            onPointerLeave={resetExpression}
          >
            <div className="lg:col-span-4 lg:pb-4">
              <p className="label-mono text-accent">{project.number}</p>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold text-ink md:text-5xl">
                {project.title}
              </h3>
              <p className="mt-3 label-mono text-ink/50">{project.category}</p>
              <p className="mt-6 max-w-sm text-ink/75">{project.description}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-ink/10 bg-cream px-3 py-1 text-xs text-ink/80"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
              <Link
                to={`/work/${project.slug}`}
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink underline-offset-4 hover:underline focus-ring"
                data-cursor="VIEW"
              >
                View project →
              </Link>
            </div>
            <div className="lg:col-span-8">
              <Link to={`/work/${project.slug}`} className="block focus-ring" data-cursor="VIEW">
                <ProjectVisual visualType={project.visualType} title={project.title} />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
