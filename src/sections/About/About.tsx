import { AnimatedCharacter } from '@/components/AnimatedCharacter/AnimatedCharacter'

export function About() {
  return (
    <section id="about" className="section-gap page-padding border-t border-ink/10 py-24 md:py-32" aria-label="About">
      <div className="grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="flex justify-center lg:justify-start">
            <AnimatedCharacter state="working" followCursor={false} expression="happy" />
          </div>
        </div>
        <div className="lg:col-span-7">
          <p className="label-mono text-ink/50">About</p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold text-ink md:text-5xl">
            A little about the person behind the code.
          </h2>
          <div className="mt-8 space-y-6 text-lg text-ink/75">
            <p>
              I&apos;m Lovepreet Parmar — an illustrator and developer familiar with programming and design tools. I
              build modern digital products across web, mobile, AI, and interactive experiences.
            </p>
            <p>
              Originally from New Delhi, based in Chandigarh, India. I studied Information Technology at Chandigarh
              Engineering College (B.Tech, 2015–2019) and have kept designing and shipping software since.
            </p>
          </div>
          <dl className="mt-12 grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="label-mono text-ink/45">Role</dt>
              <dd className="mt-1 font-medium text-ink">Software developer</dd>
            </div>
            <div>
              <dt className="label-mono text-ink/45">Location</dt>
              <dd className="mt-1 font-medium text-ink">Chandigarh, India</dd>
            </div>
            <div>
              <dt className="label-mono text-ink/45">Interests</dt>
              <dd className="mt-1 text-ink/80">Music, travel, Android ROM testing, coding</dd>
            </div>
            <div>
              <dt className="label-mono text-ink/45">Background</dt>
              <dd className="mt-1 text-ink/80">Design + development</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
