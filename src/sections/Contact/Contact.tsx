import { MagneticButton } from '@/components/Magnetic/MagneticButton'
import { EMAIL, socialLinks } from '@/data/social'
import { useCharacterExpression } from '@/contexts/CharacterExpressionContext'

export function Contact() {
  const { setExpression, resetExpression } = useCharacterExpression()

  return (
    <section
      id="contact"
      className="section-gap page-padding border-t border-ink/10 bg-gradient-to-b from-cream to-white/50 py-24 md:py-32"
      aria-label="Contact"
    >
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight text-ink md:text-6xl">
            Have an idea?
            <br />
            <span className="text-accent">Let&apos;s build it.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg text-ink/70">
            Reach out for collaborations, product builds, or a friendly hello.
          </p>
          <div
            className="mt-10 inline-block"
            onPointerEnter={() => setExpression('happy')}
            onPointerLeave={resetExpression}
          >
            <MagneticButton
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-medium text-cream"
              data-cursor="MAIL"
            >
              Email me →
            </MagneticButton>
          </div>
          <p className="mt-4 label-mono text-ink/50">{EMAIL}</p>
          <ul className="mt-10 flex flex-wrap gap-6">
            {socialLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className="label-mono text-ink/70 hover:text-ink focus-ring"
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto') ? undefined : 'noreferrer'}
                  data-cursor={link.href.startsWith('mailto') ? 'MAIL' : 'OPEN'}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
