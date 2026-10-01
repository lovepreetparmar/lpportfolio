import { Link, useParams } from 'react-router-dom'
import { SiteNavigation } from '@/components/navigation/Navigation'
import { Footer } from '@/components/common/Footer'
import { Seo } from '@/components/common/Seo'
import { ProjectVisual } from '@/components/ProjectVisual/ProjectVisual'
import { getProjectBySlug, projects } from '@/data/projects'

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined

  if (!project) {
    return (
      <div className="min-h-screen bg-cream text-ink">
        <SiteNavigation />
        <main className="page-padding section-gap pt-28">
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold">Project not found</h1>
          <Link to="/" className="mt-8 inline-block label-mono focus-ring">← Home</Link>
        </main>
      </div>
    )
  }

  const index = projects.findIndex((p) => p.slug === project.slug)
  const prev = index > 0 ? projects[index - 1] : undefined
  const next = index < projects.length - 1 ? projects[index + 1] : undefined

  return (
    <div className="min-h-screen bg-cream text-ink">
      <Seo title={`${project.title} — Lovepreet Parmar`} description={project.description} path={`/work/${project.slug}`} />
      <SiteNavigation />
      <main className="page-padding section-gap pt-28 pb-16">
        <p className="label-mono text-ink/50">{project.number} / {project.category}</p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl font-semibold md:text-6xl">{project.title}</h1>
        <p className="mt-6 max-w-2xl text-lg text-ink/75">{project.description}</p>

        <div className="mt-12">
          <ProjectVisual visualType={project.visualType} title={project.title} />
        </div>

        <section className="mt-16 max-w-3xl">
          <h2 className="label-mono text-ink/50">What it is</h2>
          <p className="mt-4 text-lg text-ink/80">{project.overview ?? project.description}</p>
        </section>

        <section className="mt-12">
          <h2 className="label-mono text-ink/50">Technology</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {project.technologies.map((tech) => (
              <li key={tech} className="rounded-full border border-ink/15 px-4 py-1.5 text-sm text-ink/80">
                {tech}
              </li>
            ))}
          </ul>
        </section>

        {(project.github || project.liveUrl) && (
          <section className="mt-12 flex flex-wrap gap-6">
            {project.github ? (
              <a href={project.github} className="label-mono text-ink focus-ring" target="_blank" rel="noreferrer" data-cursor="OPEN">
                GitHub →
              </a>
            ) : null}
            {project.liveUrl ? (
              <a href={project.liveUrl} className="label-mono text-ink focus-ring" target="_blank" rel="noreferrer" data-cursor="OPEN">
                Live site →
              </a>
            ) : null}
          </section>
        )}

        <div className="mt-16 flex flex-wrap justify-between gap-4 border-t border-ink/10 pt-8">
          {prev ? (
            <Link to={`/work/${prev.slug}`} className="label-mono focus-ring">← {prev.title}</Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link to={`/work/${next.slug}`} className="label-mono focus-ring">{next.title} →</Link>
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  )
}
