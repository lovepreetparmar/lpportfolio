import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import gsap from 'gsap'
import { SiteNavigation } from '@/components/navigation/Navigation'
import { Footer } from '@/components/common/Footer'
import { Seo } from '@/components/common/Seo'
import { ProjectVisual } from '@/components/ProjectVisual/ProjectVisual'
import { RoomEnvironment } from '@/sections/Work/RoomEnvironment'
import { getProjectBySlug, projects } from '@/data/projects'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined
  const contentRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    window.scrollTo(0, 0)
    if (reducedMotion || !contentRef.current) return

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
    )
  }, [reducedMotion, slug])

  if (!project) {
    return (
      <div className="min-h-screen bg-cream text-ink">
        <SiteNavigation />
        <main className="page-padding section-gap pt-28">
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold">
            Project not found
          </h1>
          <Link to="/#work" className="mt-8 inline-block label-mono focus-ring">
            ← Back to projects
          </Link>
        </main>
      </div>
    )
  }

  const room = project.room ?? {
    roomType: 'fitness-lab',
    roomName: 'Project Room',
    accentToken: 'accent',
  }

  const index = projects.findIndex((p) => p.slug === project.slug)
  const prev = index > 0 ? projects[index - 1] : undefined
  const next = index < projects.length - 1 ? projects[index + 1] : undefined

  return (
    <div className="relative min-h-screen bg-cream text-ink">
      <Seo
        title={`${project.title} — Lovepreet Parmar`}
        description={project.description}
        path={`/work/${project.slug}`}
      />
      <SiteNavigation />

      {/* Atmospheric room backdrop echoing the illustrated world */}
      <RoomEnvironment
        roomType={room.roomType}
        accentToken={room.accentToken}
        className="opacity-50"
      />

      <main className="relative z-10 page-padding section-gap pt-28 pb-16">
        <div ref={contentRef} className="mx-auto max-w-4xl">
          {/* Top navigation & room indicator */}
          <nav
            className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-4"
            aria-label="Project breadcrumb"
          >
            <Link
              to="/#work"
              className="group inline-flex items-center gap-2 label-mono text-sm text-ink/75 hover:text-ink focus-ring"
              data-cursor="BACK"
            >
              <span
                className="transition-transform duration-200 group-hover:-translate-x-1"
                aria-hidden="true"
              >
                ←
              </span>
              Back to projects
            </Link>

            <div className="flex items-center gap-2 label-mono text-xs text-ink/50">
              <span className="font-medium text-accent">ROOM {project.number}</span>
              <span aria-hidden="true">/</span>
              <span>{room.roomName}</span>
            </div>
          </nav>

          {/* Project Header */}
          <header>
            <p className="label-mono text-xs uppercase tracking-wider text-accent">
              PROJECT {project.number} · {project.category}
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-6xl">
              {project.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/80 sm:text-xl">
              {project.description}
            </p>
          </header>

          {/* Project Visual Stage: Main physical/artifact object */}
          <div className="mt-12 overflow-hidden rounded-xl border border-ink/10 bg-white/60 p-3 sm:p-5 shadow-[0_24px_50px_-24px_rgba(20,18,16,0.12)]">
            <ProjectVisual visualType={project.visualType} title={project.title} />
          </div>

          {/* Technology Stack */}
          <section className="mt-14" aria-labelledby="tech-stack-heading">
            <h2 id="tech-stack-heading" className="label-mono text-xs uppercase tracking-wider text-ink/50">
              Technology stack
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2.5" aria-label="Technologies used">
              {project.technologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-ink/15 bg-white/80 px-4 py-1.5 text-sm font-medium text-ink/80 shadow-xs"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </section>

          {/* Factual Case-Study Fields when present */}
          {project.overview && (
            <section className="mt-12" aria-labelledby="overview-heading">
              <h2 id="overview-heading" className="label-mono text-xs uppercase tracking-wider text-ink/50">
                Overview
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink/80 sm:text-lg">
                {project.overview}
              </p>
            </section>
          )}

          {project.problem && (
            <section className="mt-12" aria-labelledby="problem-heading">
              <h2 id="problem-heading" className="label-mono text-xs uppercase tracking-wider text-ink/50">
                Problem
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink/80 sm:text-lg">
                {project.problem}
              </p>
            </section>
          )}

          {project.solution && (
            <section className="mt-12" aria-labelledby="solution-heading">
              <h2 id="solution-heading" className="label-mono text-xs uppercase tracking-wider text-ink/50">
                Solution
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink/80 sm:text-lg">
                {project.solution}
              </p>
            </section>
          )}

          {project.architecture && (
            <section className="mt-12" aria-labelledby="arch-heading">
              <h2 id="arch-heading" className="label-mono text-xs uppercase tracking-wider text-ink/50">
                Architecture
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink/80 sm:text-lg">
                {project.architecture}
              </p>
            </section>
          )}

          {project.challenges && (
            <section className="mt-12" aria-labelledby="challenges-heading">
              <h2 id="challenges-heading" className="label-mono text-xs uppercase tracking-wider text-ink/50">
                Challenges
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink/80 sm:text-lg">
                {project.challenges}
              </p>
            </section>
          )}

          {project.lessons && (
            <section className="mt-12" aria-labelledby="lessons-heading">
              <h2 id="lessons-heading" className="label-mono text-xs uppercase tracking-wider text-ink/50">
                Lessons
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink/80 sm:text-lg">
                {project.lessons}
              </p>
            </section>
          )}

          {/* GitHub / Live Project Actions when available */}
          {(project.github || project.liveUrl) && (
            <section className="mt-12 flex flex-wrap gap-4" aria-label="Project external links">
              {project.github && (
                <a
                  href={project.github}
                  className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-white/80 px-6 py-2.5 text-sm font-medium text-ink hover:border-ink focus-ring"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="OPEN"
                >
                  GitHub repository →
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-cream hover:bg-accent focus-ring"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="OPEN"
                >
                  Visit live project →
                </a>
              )}
            </section>
          )}

          {/* Bottom navigation: return to Work and sibling projects */}
          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-ink/10 pt-8">
            <Link
              to="/#work"
              className="group inline-flex items-center gap-2 label-mono text-sm text-ink/75 hover:text-ink focus-ring"
            >
              <span
                className="transition-transform duration-200 group-hover:-translate-x-1"
                aria-hidden="true"
              >
                ←
              </span>
              Back to projects
            </Link>

            <div className="flex items-center gap-6">
              {prev && (
                <Link
                  to={`/work/${prev.slug}`}
                  className="label-mono text-xs text-ink/60 hover:text-ink focus-ring"
                >
                  ← {prev.title}
                </Link>
              )}
              {next && (
                <Link
                  to={`/work/${next.slug}`}
                  className="label-mono text-xs text-ink/60 hover:text-ink focus-ring"
                >
                  {next.title} →
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
