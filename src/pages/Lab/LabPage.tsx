import { Link } from 'react-router-dom'
import { SiteNavigation } from '@/components/navigation/Navigation'
import { experiments } from '@/data/experiments'

export function LabPage() {
  return (
    <>
      <SiteNavigation />
      <main className="page-padding section-gap min-h-screen bg-base text-paper">
        <h1 className="display-lg">Lab</h1>
        <p className="body-lg mt-6 max-w-xl">Experiments ship in phase 7. Index:</p>
        <ul className="mt-10 space-y-4">
          {experiments.map((exp) => (
            <li key={exp.slug}>
              <Link to={`/lab/${exp.slug}`} className="label-mono focus-ring" data-cursor="PLAY">
                {exp.title}
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/" className="mt-16 inline-block label-mono focus-ring">← Home</Link>
      </main>
    </>
  )
}
