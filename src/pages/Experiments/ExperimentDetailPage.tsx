import { Link, useParams } from 'react-router-dom'
import { SiteNavigation } from '@/components/navigation/Navigation'
import { Footer } from '@/components/common/Footer'
import { experiments } from '@/data/experiments'

export function ExperimentDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const experiment = experiments.find((e) => e.slug === slug)

  if (!experiment) {
    return (
      <div className="min-h-screen bg-cream text-ink">
        <SiteNavigation />
        <main className="page-padding section-gap pt-28">
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold">Experiment not found</h1>
          <Link to="/experiments" className="mt-8 label-mono focus-ring">← Experiments</Link>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream text-ink">
      <SiteNavigation />
      <main className="page-padding section-gap min-h-[70vh] pt-28 pb-16">
        <p className="label-mono text-ink/50">{experiment.category}</p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl font-semibold">{experiment.title}</h1>
        <p className="mt-8 max-w-2xl text-lg text-ink/75">{experiment.description}</p>
        <p className="mt-12 label-mono text-ink/50">Interactive build — coming in a later phase.</p>
        <Link to="/experiments" className="mt-16 inline-block label-mono focus-ring">← Experiments</Link>
      </main>
      <Footer />
    </div>
  )
}
