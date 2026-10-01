import { SITE_NAME } from '@/lib/constants'
import { EMAIL, socialLinks } from '@/data/social'

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-cream page-padding py-12">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-[family-name:var(--font-display)] text-xl font-semibold text-ink">{SITE_NAME}</p>
          <p className="mt-2 text-sm text-ink/60">Software developer</p>
          <p className="mt-6 text-sm text-ink/50">© {new Date().getFullYear()} Lovepreet Parmar</p>
        </div>
        <ul className="flex flex-wrap gap-4">
          {socialLinks.map((link) => (
            <li key={link.id}>
              <a href={link.href} className="label-mono text-ink/70 hover:text-ink focus-ring">
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${EMAIL}`} className="label-mono text-ink/70 hover:text-ink focus-ring">{EMAIL}</a>
          </li>
        </ul>
      </div>
      <a href="#hero" className="mt-10 inline-block label-mono text-ink/60 hover:text-ink focus-ring">
        Back to top ↑
      </a>
    </footer>
  )
}
