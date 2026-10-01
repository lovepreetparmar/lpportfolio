import { skills } from '@/data/skills'

export function Skills() {
  return (
    <section className="section-gap page-padding border-t border-[var(--color-border)]" aria-labelledby="skills-heading">
      <p className="eyebrow mb-4">Technology</p>
      <h2 id="skills-heading" className="display-lg mb-12">Stack</h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => (
          <li
            key={skill.name}
            className="rounded-sm border border-[var(--color-border)] p-6 transition-colors hover:border-white/30"
          >
            <p className="font-[family-name:var(--font-display)] text-lg uppercase">{skill.name}</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-[var(--color-muted)]">{skill.category}</p>
            <p className="mt-3 text-sm text-[var(--color-muted)]">{skill.description}</p>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-[var(--color-muted)]">
        Interactive technology network — Phase 6.
      </p>
    </section>
  )
}
