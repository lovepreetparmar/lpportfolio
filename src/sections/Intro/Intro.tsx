const lines = ["I'M A", 'DEVELOPER', 'WHO LIKES', 'BUILDING', 'THINGS THAT', 'FEEL', 'IMPOSSIBLE.']

export function Intro() {
  return (
    <section className="section-gap page-padding" aria-labelledby="intro-heading">
      <h2 id="intro-heading" className="sr-only">Introduction</h2>
      <div className="max-w-5xl">
        {lines.map((line) => (
          <p key={line} className="display-lg text-balance">
            {line}
          </p>
        ))}
      </div>
    </section>
  )
}
