import type { ExperienceSnapshot, ChapterId } from './types'

export const experienceState: ExperienceSnapshot = {
  progress: 0,
  chapter: 'boot',
  chapterProgress: 0,
  pointer: { x: 0, y: 0 },
}

type ChapterListener = (chapter: ChapterId, index: number) => void

const chapterListeners = new Set<ChapterListener>()

export function subscribeChapter(listener: ChapterListener): () => void {
  chapterListeners.add(listener)
  return () => chapterListeners.delete(listener)
}

export function notifyChapterChange(chapter: ChapterId, index: number): void {
  chapterListeners.forEach((listener) => listener(chapter, index))
}
