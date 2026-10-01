export type ChapterId =
  | 'boot'
  | 'identity'
  | 'developer'
  | 'system'
  | 'work'
  | 'ai'
  | 'journey'
  | 'contact'

export type ChapterDefinition = {
  id: ChapterId
  index: number
  label: string
  menuLabel: string
  start: number
  end: number
}

export type ExperienceSnapshot = {
  progress: number
  chapter: ChapterId
  chapterProgress: number
  pointer: { x: number; y: number }
}
