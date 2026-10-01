import { Link } from 'react-router-dom'
import { SiteNavigation } from '@/components/navigation/Navigation'
import { Footer } from '@/components/common/Footer'
import { experiments } from '@/data/experiments'

export function ExperimentsPage() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SiteNavigation />
      <main className="page-padding section-gap pt-28 pb-16">
        <h1 className="font-[family-name:var(--font-display)] text-5xl font-semibold">Experiments</h1>
        <p className="mt-6 max-w-xl text-lg text-ink/70">
          Small playgrounds for motion, type, and interaction — more demos landing soon.
        </p>
        <ul className="mt-12 space-y-6">
          {experiments.map((exp) => (
            <li key={exp.slug}>
              <Link
                to={`/experiments/${exp.slug}`}
                className="group block border-t border-ink/10 pt-6 focus-ring"
                data-cursor="PLAY"
              >
                <span className="label-mono text-ink/50">{exp.category}</span>
                <span className="mt-2 block font-[family-name:var(--font-display)] text-3xl font-semibold transition-all group-hover:text-accent md:text-4xl">
                  {exp.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/" className="mt-16 inline-block label-mono focus-ring">← Home</Link>
      </main>
      <Footer />
    </div>
  )
}
