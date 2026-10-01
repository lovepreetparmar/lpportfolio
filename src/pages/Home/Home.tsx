import { Hero } from '@/sections/Hero/Hero'
import { Work } from '@/sections/Work/Work'
import { About } from '@/sections/About/About'
import { ExperienceSection } from '@/sections/Experience/Experience'
import { Stack } from '@/sections/Stack/Stack'
import { Contact } from '@/sections/Contact/Contact'
import { SiteNavigation } from '@/components/navigation/Navigation'
import { Footer } from '@/components/common/Footer'
import { CharacterExpressionProvider } from '@/contexts/CharacterExpressionContext'
import { GlobalCanvas } from '@/experience/GlobalCanvas/GlobalCanvas'
import { HomeScrollMotion } from '@/components/motion/HomeScrollMotion'
import { PageEnter } from '@/components/transitions/PageEnter'

export function HomePage() {
  return (
    <CharacterExpressionProvider>
      <GlobalCanvas />
      <HomeScrollMotion />
      <PageEnter className="bg-cream text-ink">
        <SiteNavigation />
        <main>
          <Hero />
          <Work />
          <About />
          <ExperienceSection />
          <Stack />
          <Contact />
          <Footer />
        </main>
      </PageEnter>
    </CharacterExpressionProvider>
  )
}
