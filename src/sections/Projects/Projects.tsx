import { Link } from 'react-router-dom'
import { projects } from '@/data/projects'

export function Projects() {
  const featured = projects.filter((p) => p.featured)

  return (
    <section id="work" className="section-gap page-padding border-t border-[var(--color-border)]">
      <h2 className="display-lg mb-16">Selected work</h2>
      <ul className="space-y-24">
        {featured.map((project) => (
          <li key={project.slug} className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-4">
              <p className="eyebrow">{project.number}</p>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-4xl uppercase md:text-5xl">
                {project.title}
              </h3>
              <p className="mt-2 eyebrow">{project.category}</p>
            </div>
            <div className="lg:col-span-8">
              <div className="aspect-[16/10] w-full border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
                <p className="body-lg">{project.description}</p>
                <p className="mt-6 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                  {project.technologies.join(' · ')}
                </p>
              </div>
              <Link
                to={`/work/${project.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] focus-ring"
                data-cursor="VIEW"
              >
                View project →
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
