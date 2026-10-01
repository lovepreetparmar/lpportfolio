import { CHAPTERS } from './chapters'
import type { ChapterId } from './types'

export function resolveChapter(progress: number): {
  chapter: ChapterId
  chapterProgress: number
  index: number
} {
  const clamped = Math.min(1, Math.max(0, progress))
  const active =
    CHAPTERS.find((c) => clamped >= c.start && clamped < c.end) ?? CHAPTERS[CHAPTERS.length - 1]!

  const span = active.end - active.start
  const chapterProgress = span > 0 ? (clamped - active.start) / span : 0

  return {
    chapter: active.id,
    chapterProgress: Math.min(1, Math.max(0, chapterProgress)),
    index: active.index,
  }
}

export function progressForChapter(id: ChapterId): number {
  const chapter = CHAPTERS.find((c) => c.id === id)
  if (!chapter) return 0
  return (chapter.start + chapter.end) / 2
}
