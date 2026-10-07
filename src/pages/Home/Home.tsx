import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        // Scroll target into view and sync ScrollTrigger
        requestAnimationFrame(() => {
          el.scrollIntoView({ block: 'start' })
          ScrollTrigger.refresh()
          ScrollTrigger.update()
        })
      }
    }
  }, [location.hash])

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
