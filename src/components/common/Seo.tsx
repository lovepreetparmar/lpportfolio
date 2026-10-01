import { useEffect } from 'react'
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '@/lib/constants'

type SeoProps = {
  title?: string
  description?: string
  path?: string
}

export function Seo({ title, description, path = '' }: SeoProps) {
  const pageTitle = title ?? SITE_TITLE
  const pageDescription = description ?? SITE_DESCRIPTION
  const canonical = `${SITE_URL}${path}`

  useEffect(() => {
    document.title = pageTitle

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name'
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', pageDescription)
    setMeta('og:title', pageTitle, true)
    setMeta('og:description', pageDescription, true)
    setMeta('og:url', canonical, true)

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = canonical

    let jsonLd = document.getElementById('json-ld-person') as HTMLScriptElement | null
    if (!jsonLd) {
      jsonLd = document.createElement('script')
      jsonLd.id = 'json-ld-person'
      jsonLd.type = 'application/ld+json'
      document.head.appendChild(jsonLd)
    }
    jsonLd.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Lovepreet Parmar',
      jobTitle: 'Full Stack Developer',
      url: SITE_URL,
      sameAs: [
        'https://github.com/lovepreetparmar',
        'https://www.linkedin.com/in/lovepreetparmar/',
      ],
    })
  }, [pageTitle, pageDescription, canonical])

  return null
}
