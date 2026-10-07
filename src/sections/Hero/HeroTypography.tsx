import { MagneticButton } from '@/components/Magnetic/MagneticButton'
import { heroContent } from '@/data/hero'

/**
 * Editorial type block of the hero: masthead, statement, supporting copy,
 * call to action and the interaction hints. Entrance targets are marked with
 * `data-hero-*` and animated by `heroEntrance`.
 */
export function HeroTypography() {
  const { eyebrow, nameLines, statementLines, support, focus, cta, hints } = heroContent

  return (
    <div className="hero-typography">
      <p className="hero-eyebrow label-mono" data-hero-eyebrow>
        {eyebrow}
      </p>

      <h1 className="hero-name">
        {nameLines.map((line) => (
          <span className="hero-name-mask" key={line}>
            <span className="hero-name-line" data-hero-line>
              {line}
            </span>
          </span>
        ))}
      </h1>

      <p className="hero-statement" data-hero-statement>
        {statementLines.map((line, index) => (
          <span className="hero-statement-line" key={`statement-${index}`}>
            {line.map((segment) => (
              <span key={segment.text} className={segment.accent ? 'hero-accent' : undefined}>
                {segment.text}
              </span>
            ))}
          </span>
        ))}
      </p>

      <p className="hero-support" data-hero-support>
        {support}
      </p>

      <p className="hero-focus label-mono" data-hero-meta>
        {focus}
      </p>

      <div className="hero-cta" data-hero-cta>
        <MagneticButton href={cta.href} className="hero-cta-button" data-cursor="VIEW">
          {cta.label}
          <span aria-hidden="true">→</span>
        </MagneticButton>
      </div>

      <ul className="hero-hints">
        {hints.map((hint) => (
          <li
            key={hint.id}
            data-hero-hint
            className={hint.id === 'move' ? 'hidden md:flex' : undefined}
          >
            <span className="hero-hint-label">{hint.label}</span>
            <span className="hero-hint-note">{hint.note}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
