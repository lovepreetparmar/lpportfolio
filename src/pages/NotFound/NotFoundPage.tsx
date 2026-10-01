import { Link } from 'react-router-dom'
import { SiteNavigation } from '@/components/navigation/Navigation'

export function NotFoundPage() {
  return (
    <>
      <SiteNavigation />
      <main className="flex min-h-[70vh] flex-col items-start justify-center page-padding">
        <p className="eyebrow">404</p>
        <h1 className="display-lg mt-4">Page not found</h1>
        <Link to="/" className="mt-8 eyebrow focus-ring">← Home</Link>
      </main>
    </>
  )
}
