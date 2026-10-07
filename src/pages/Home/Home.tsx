import { Hero } from '@/sections/Hero/Hero'
import { Work } from '@/sections/Work/Work'
import { About } from '@/sections/About/About'
import { ExperienceSection } from '@/sections/Experience/Experience'
import { Stack } from '@/sections/Stack/Stack'
import { Contact } from '@/sections/Contact/Contact'
import { SiteNavigation } from '@/components/navigation/Navigation'
import { Footer } from '@/components/common/Footer'
import { CharacterExpressionProvider } from '@/contexts/CharacterExpressionContext'
import { CharacterPoseProvider } from '@/contexts/CharacterPoseContext'
import { ScrollPoseWatcher } from '@/components/AnimatedCharacter/ScrollPoseWatcher'
import { PersistentCharacter } from '@/components/AnimatedCharacter/PersistentCharacter'

export function HomePage() {
  return (
    <CharacterExpressionProvider>
      <CharacterPoseProvider>
        <ScrollPoseWatcher />
        <PersistentCharacter />
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
      </CharacterPoseProvider>
    </CharacterExpressionProvider>
  )
}
