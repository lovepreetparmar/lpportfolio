import { useRef } from 'react'
import { experience } from '@/data/experience'
import { useGsapReveal } from '@/hooks/useGsapReveal'

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  useGsapReveal(sectionRef, { selector: '[data-exp-item]', stagger: 0.1, y: 32 })

  return (
    <section ref={sectionRef} className="page-padding border-t border-ink/10 py-20" aria-label="Experience">
      <p className="label-mono text-ink/50" data-section-label>Experience</p>
      <h2
        className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold text-ink"
        data-section-title
      >
        Learning &amp; roles
      </h2>
      <ul className="mt-12 space-y-10">
        {experience.map((item) => (
          <li
            key={item.id}
            data-exp-item
            className="grid gap-2 border-l-2 border-accent/30 pl-6 md:grid-cols-[6rem_1fr] md:gap-8"
          >
            <p className="label-mono text-ink/50">{item.year}</p>
            <div>
              <p className="font-medium text-ink">{item.title}</p>
              {item.organization ? <p className="text-sm text-ink/60">{item.organization}</p> : null}
              <p className="mt-2 max-w-2xl text-ink/75">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-sm text-ink/50">
        Post-2019 project work is documented under Work; add employers here when you want them published.
      </p>
    </section>
  )
}
