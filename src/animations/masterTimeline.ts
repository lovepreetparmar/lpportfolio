import { CHAPTERS } from '@/experience/chapters'

/** Exported for documentation and future GSAP master timeline wiring. */
export const MASTER_CHAPTER_BREAKPOINTS = CHAPTERS.map((chapter) => ({
  id: chapter.id,
  start: chapter.start,
  end: chapter.end,
  label: chapter.label,
}))
