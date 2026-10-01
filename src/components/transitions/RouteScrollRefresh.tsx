import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ensureGsapPlugins } from '@/animations/utils'

/** Keeps ScrollTrigger in sync after client-side route changes. */
export function RouteScrollRefresh() {
  const location = useLocation()

  useEffect(() => {
    ensureGsapPlugins()
    window.scrollTo(0, 0)
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [location.pathname])

  return null
}
