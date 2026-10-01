import { AnimatedCharacter } from '@/components/AnimatedCharacter/AnimatedCharacter'
import { MagneticButton } from '@/components/Magnetic/MagneticButton'
import { useCharacterExpression } from '@/contexts/CharacterExpressionContext'

export function Hero() {
  const { expression } = useCharacterExpression()

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden bg-cream pt-28 pb-16"
      aria-label="Introduction"
    >
      <div className="page-padding grid min-h-[calc(100svh-7rem)] grid-cols-1 items-center gap-10 lg:grid-cols-12">
        <div className="relative z-10 lg:col-span-7" data-hero-parallax="copy">
          <p className="label-mono text-ink/60" data-hero-fade>Lovepreet Parmar</p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-ink">
            <span className="hero-headline-line block overflow-hidden text-[clamp(2.8rem,9vw,6.5rem)] leading-[0.95] tracking-[-0.03em]">
              <span className="hero-headline-inner block">I build</span>
            </span>
            <span className="hero-headline-line block overflow-hidden text-[clamp(2.8rem,9vw,6.5rem)] leading-[0.95] tracking-[-0.03em]">
              <span className="hero-headline-inner block">digital</span>
            </span>
            <span className="hero-headline-line block overflow-hidden text-[clamp(2.8rem,9vw,6.5rem)] leading-[0.95] tracking-[-0.03em] text-accent">
              <span className="hero-headline-inner block">things.</span>
            </span>
          </h1>
          <p className="mt-8 max-w-md text-lg text-ink/75" data-hero-fade>
            Software developer building web, mobile, and AI-powered experiences.
          </p>
          <p className="mt-2 label-mono text-ink/50" data-hero-fade>Web · Mobile · AI · Product</p>
          <div className="mt-10" data-hero-fade>
            <MagneticButton href="#work" className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-white px-6 py-3 text-sm font-medium text-ink shadow-sm">
              Explore my work →
            </MagneticButton>
          </div>
          <ul className="mt-16 flex flex-col gap-1">
            {['MOVE', 'DRAG', 'SCROLL'].map((hint) => (
              <li key={hint} data-hero-hint className="label-mono text-ink/40">
                {hint}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-character-wrap relative z-[5] flex justify-center lg:col-span-5 lg:justify-end">
          <AnimatedCharacter state="idle" followCursor expression={expression} />
        </div>
      </div>
      <div
        className="pointer-events-none absolute -right-20 top-32 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />
    </section>
  )
}
