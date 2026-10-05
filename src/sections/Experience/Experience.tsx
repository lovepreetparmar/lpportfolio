import { experience } from '@/data/experience'

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="page-padding border-t border-ink/10 py-20"
      aria-label="Experience"
    >
      <p className="label-mono text-ink/50">Experience</p>
      <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold text-ink">
        Learning &amp; roles
      </h2>
      <ul className="mt-12 space-y-10">
        {experience.map((item) => (
          <li key={item.id} className="grid gap-2 border-l-2 border-accent/30 pl-6 md:grid-cols-[6rem_1fr] md:gap-8">
            <p className="label-mono text-ink/50">{item.year}</p>
            <div>
              <p className="font-medium text-ink">{item.title}</p>
              {item.organization ? <p className="text-sm text-ink/60">{item.organization}</p> : null}
              <p className="mt-2 max-w-2xl text-ink/75">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
