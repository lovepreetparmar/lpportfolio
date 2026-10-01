import { useEffect, useRef, type RefObject } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ensureGsapPlugins } from '@/animations/utils'
import { resolveChapter } from './ChapterManager'
import { experienceState, notifyChapterChange } from './experienceState'

type ScrollControllerProps = {
  trackRef: RefObject<HTMLElement | null>
  enabled: boolean
}

function applyProgress(progress: number, lastChapter: { current: typeof experienceState.chapter }) {
  const { chapter, chapterProgress, index } = resolveChapter(progress)
  experienceState.progress = progress
  experienceState.chapter = chapter
  experienceState.chapterProgress = chapterProgress

  if (chapter !== lastChapter.current) {
    lastChapter.current = chapter
    notifyChapterChange(chapter, index)
  }
}

export function ScrollController({ trackRef, enabled }: ScrollControllerProps) {
  const lastChapter = useRef(experienceState.chapter)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    if (!enabled) {
      const onScroll = () => {
        const max = track.scrollHeight - window.innerHeight
        const progress = max > 0 ? window.scrollY / max : 0
        applyProgress(progress, lastChapter)
      }
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }

    ensureGsapPlugins()

    const trigger = ScrollTrigger.create({
      trigger: track,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        applyProgress(self.progress, lastChapter)
      },
    })

    return () => {
      trigger.kill()
    }
  }, [trackRef, enabled])

  return null
}
