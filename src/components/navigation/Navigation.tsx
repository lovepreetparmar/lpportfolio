import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EMAIL } from '@/data/social'
import { cn } from '@/lib/utils'
import { ensureGsapPlugins } from '@/animations/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const links = [
  { label: 'Work', href: '#work', route: false },
  { label: 'About', href: '#about', route: false },
  { label: 'Experiments', href: '/experiments', route: true },
  { label: 'Contact', href: '#contact', route: false },
]

export function SiteNavigation() {
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const header = headerRef.current
    if (!header || reducedMotion) return

    ensureGsapPlugins()
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const hidden = self.scroll() > 120 && self.direction === 1
          gsap.to(header, {
            y: hidden ? -96 : 0,
            duration: 0.45,
            ease: 'power3.out',
            overwrite: true,
          })
        },
      })
    })

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <>
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-50 border-b border-ink/5 bg-cream/80 backdrop-blur-md will-change-transform"
      >
        <div className="page-padding flex items-center justify-between py-4">
          <Link
            to="/"
            className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-wide text-ink focus-ring"
          >
            Lovepreet
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {links.map((link) =>
              link.route ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm text-ink/70 transition-colors hover:text-ink focus-ring"
                  data-cursor="VIEW"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-ink/70 transition-colors hover:text-ink focus-ring"
                >
                  {link.label}
                </a>
              ),
            )}
            <a
              href={`mailto:${EMAIL}`}
              className="rounded-full bg-ink px-4 py-2 text-sm text-cream transition-opacity hover:opacity-90 focus-ring"
              data-cursor="MAIL"
            >
              Let&apos;s talk →
            </a>
          </nav>

          <button
            type="button"
            className="label-mono text-ink focus-ring md:hidden"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            Menu
          </button>
        </div>
      </header>

      <div
        className={cn(
          'fixed inset-0 z-40 bg-cream pt-24 transition-opacity md:hidden',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden={!open}
      >
        <nav className="flex flex-col gap-8 page-padding" aria-label="Mobile">
          {links.map((link) =>
            link.route ? (
              <Link
                key={link.label}
                to={link.href}
                className="font-[family-name:var(--font-display)] text-4xl text-ink focus-ring"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="font-[family-name:var(--font-display)] text-4xl text-ink focus-ring"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ),
          )}
        </nav>
      </div>
    </>
  )
}
