import type { ChapterDefinition, ChapterId } from './types'

/** Starting breakpoints — tune visually during scene implementation. */
export const CHAPTERS: ChapterDefinition[] = [
  { id: 'boot', index: 0, label: '00', menuLabel: 'Boot', start: 0, end: 0.08 },
  { id: 'identity', index: 1, label: '01', menuLabel: 'Identity', start: 0.08, end: 0.2 },
  { id: 'developer', index: 2, label: '02', menuLabel: 'Developer', start: 0.2, end: 0.35 },
  { id: 'system', index: 3, label: '03', menuLabel: 'System', start: 0.35, end: 0.5 },
  { id: 'work', index: 4, label: '04', menuLabel: 'Work', start: 0.5, end: 0.68 },
  { id: 'ai', index: 5, label: '05', menuLabel: 'AI', start: 0.68, end: 0.82 },
  { id: 'journey', index: 6, label: '06', menuLabel: 'Journey', start: 0.82, end: 0.94 },
  { id: 'contact', index: 7, label: '07', menuLabel: 'Contact', start: 0.94, end: 1 },
]

export const CHAPTER_COUNT = CHAPTERS.length

export function getChapterById(id: ChapterId): ChapterDefinition {
  const chapter = CHAPTERS.find((c) => c.id === id)
  if (!chapter) throw new Error(`Unknown chapter: ${id}`)
  return chapter
}
