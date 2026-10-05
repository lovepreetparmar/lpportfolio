import { Hero } from '@/sections/Hero/Hero'
import { Work } from '@/sections/Work/Work'
import { About } from '@/sections/About/About'
import { ExperienceSection } from '@/sections/Experience/Experience'
import { Stack } from '@/sections/Stack/Stack'
import { Contact } from '@/sections/Contact/Contact'
import { SiteNavigation } from '@/components/navigation/Navigation'
import { Footer } from '@/components/common/Footer'
import { CharacterExpressionProvider } from '@/contexts/CharacterExpressionContext'

export function HomePage() {
  return (
    <CharacterExpressionProvider>
      <div className="bg-cream text-ink">
        <SiteNavigation />
        <main id="home">
          <Hero />
          <Work />
          <About />
          <ExperienceSection />
          <Stack />
          <Contact />
          <Footer />
        </main>
      </div>
    </CharacterExpressionProvider>
  )
}
