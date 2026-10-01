import { useRef } from 'react'
import { skills } from '@/data/skills'
import { useCharacterExpression } from '@/contexts/CharacterExpressionContext'
import { useGsapReveal } from '@/hooks/useGsapReveal'

export function Stack() {
  const { setExpression, resetExpression } = useCharacterExpression()
  const sectionRef = useRef<HTMLElement>(null)
  useGsapReveal(sectionRef, { selector: '[data-stack-item]', stagger: 0.04, y: 24, start: 'top 90%' })

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="section-gap page-padding border-t border-ink/10 py-24"
      aria-label="Technologies"
    >
      <p className="label-mono text-ink/50" data-section-label>Stack</p>
      <h2
        className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold text-ink md:text-4xl"
        data-section-title
      >
        I work with
      </h2>
      <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-6 md:gap-x-12 md:gap-y-8">
        {skills.map((skill) => (
          <li key={skill.name} data-stack-item>
            <span
              className="font-[family-name:var(--font-display)] text-2xl text-ink transition-transform duration-200 hover:text-accent md:text-3xl"
              onPointerEnter={() => setExpression('thinking')}
              onPointerLeave={resetExpression}
            >
              {skill.name}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
