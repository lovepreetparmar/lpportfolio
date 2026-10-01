import { lazy, Suspense, type ReactNode } from 'react'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import { HomePage } from '@/pages/Home/Home'
import { PageEnter } from '@/components/transitions/PageEnter'
import { RouteScrollRefresh } from '@/components/transitions/RouteScrollRefresh'

const ProjectPage = lazy(() =>
  import('@/pages/Project/ProjectPage').then((m) => ({ default: m.ProjectPage })),
)
const NotFoundPage = lazy(() =>
  import('@/pages/NotFound/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
)
const ExperimentsPage = lazy(() =>
  import('@/pages/Experiments/ExperimentsPage').then((m) => ({ default: m.ExperimentsPage })),
)
const ExperimentDetailPage = lazy(() =>
  import('@/pages/Experiments/ExperimentDetailPage').then((m) => ({ default: m.ExperimentDetailPage })),
)
const LabRedirect = lazy(() => import('@/pages/Lab/LabRedirect').then((m) => ({ default: m.LabRedirect })))

function LazyPage({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div className="page-padding py-24 label-mono">Loading…</div>}>
      <PageEnter>{children}</PageEnter>
    </Suspense>
  )
}

function AppShell() {
  return (
    <>
      <RouteScrollRefresh />
      <Outlet />
    </>
  )
}

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/experiments',
        element: (
          <LazyPage>
            <ExperimentsPage />
          </LazyPage>
        ),
      },
      {
        path: '/experiments/:slug',
        element: (
          <LazyPage>
            <ExperimentDetailPage />
          </LazyPage>
        ),
      },
      {
        path: '/lab',
        element: (
          <LazyPage>
            <LabRedirect />
          </LazyPage>
        ),
      },
      {
        path: '/work/:slug',
        element: (
          <LazyPage>
            <ProjectPage />
          </LazyPage>
        ),
      },
      {
        path: '*',
        element: (
          <LazyPage>
            <NotFoundPage />
          </LazyPage>
        ),
      },
    ],
  },
])
