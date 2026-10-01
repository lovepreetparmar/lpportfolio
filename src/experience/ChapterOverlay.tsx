import { useChapter } from '@/hooks/useChapter'
import { projects } from '@/data/projects'
import { EMAIL, socialLinks } from '@/data/social'
import { experience } from '@/data/experience'
import { Link } from 'react-router-dom'

export function ChapterOverlay() {
  const { chapter } = useChapter()

  return (
    <div className="pointer-events-none fixed inset-0 z-20 flex items-center page-padding">
      <div className="max-w-4xl">
        {chapter === 'boot' && (
          <>
            <p className="eyebrow">00</p>
            <p className="display-lg mt-4">Lovepreet</p>
            <p className="display-lg text-[var(--muted)]">Digital system</p>
          </>
        )}

        {chapter === 'identity' && (
          <>
            <p className="eyebrow">01</p>
            <p className="display-xl mt-4">Lovepreet</p>
            <p className="display-xl text-[var(--muted)]">Parmar</p>
            <p className="mt-10 display-lg">I build digital things.</p>
            <p className="mt-6 eyebrow">Web · Mobile · AI · 3D</p>
          </>
        )}

        {chapter === 'developer' && (
          <>
            <p className="eyebrow">02</p>
            <p className="display-lg mt-4">The developer</p>
            <p className="mt-6 body-lg">Digital workspace — web, mobile, backend, AI.</p>
          </>
        )}

        {chapter === 'system' && (
          <>
            <p className="eyebrow">03</p>
            <p className="display-lg mt-4">The system</p>
            <p className="mt-8 font-mono text-sm text-[var(--muted)]">
              PHP → Laravel → JavaScript → React → TypeScript → Python → AI
            </p>
          </>
        )}

        {chapter === 'work' && (
          <>
            <p className="eyebrow">04</p>
            <p className="display-lg mt-4">The work</p>
            <ul className="mt-8 space-y-3 pointer-events-auto">
              {projects.filter((p) => p.featured).slice(0, 3).map((project) => (
                <li key={project.slug}>
                  <Link
                    to={`/work/${project.slug}`}
                    className="text-lg uppercase tracking-[0.2em] focus-ring"
                    data-cursor="VIEW"
                  >
                    {project.title}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}

        {chapter === 'ai' && (
          <>
            <p className="eyebrow">05</p>
            <p className="display-lg mt-4">AI</p>
            <p className="mt-6 eyebrow">LLM · Vision · Agents · Automation</p>
          </>
        )}

        {chapter === 'journey' && (
          <>
            <p className="eyebrow">06</p>
            <p className="display-lg mt-4">The journey</p>
            <ul className="mt-8 space-y-4">
              {experience.slice(0, 3).map((item) => (
                <li key={item.id}>
                  <p className="eyebrow">{item.year}</p>
                  <p className="text-lg uppercase tracking-wide">{item.title}</p>
                </li>
              ))}
            </ul>
          </>
        )}

        {chapter === 'contact' && (
          <>
            <p className="eyebrow">07</p>
            <p className="display-lg mt-4">Let&apos;s build something.</p>
            <p className="mt-8 pointer-events-auto">
              <a href={`mailto:${EMAIL}`} className="eyebrow focus-ring" data-cursor="MAIL">
                {EMAIL}
              </a>
            </p>
            <ul className="mt-6 flex gap-6 pointer-events-auto">
              {socialLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.href} className="eyebrow focus-ring" data-cursor="OPEN">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}
