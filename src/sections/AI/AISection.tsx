const topics = [
  'LLM integration',
  'Prompt engineering',
  'AI agents',
  'Computer vision',
  'Automation',
  'API integration',
]

export function AISection() {
  return (
    <section className="section-gap page-padding border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="max-w-4xl">
        <p className="display-lg">AI</p>
        <p className="display-lg text-[var(--color-muted)]">is not</p>
        <p className="display-lg">just a feature.</p>
      </div>
      <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <li key={topic} className="border-t border-[var(--color-border)] pt-4 text-sm uppercase tracking-[0.2em]">
            {topic}
          </li>
        ))}
      </ul>
    </section>
  )
}
