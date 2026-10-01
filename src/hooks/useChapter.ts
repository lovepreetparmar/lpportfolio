import { useSyncExternalStore } from 'react'
import { CHAPTERS } from '@/experience/chapters'
import { subscribeChapter } from '@/experience/experienceState'
import type { ChapterId } from '@/experience/types'

type ChapterSnapshot = {
  chapter: ChapterId
  index: number
  label: string
  menuLabel: string
}

const bootChapter = CHAPTERS[0]!

let snapshot: ChapterSnapshot = {
  chapter: 'boot',
  index: 0,
  label: bootChapter.label,
  menuLabel: bootChapter.menuLabel,
}

function buildSnapshot(chapter: ChapterId, index: number): ChapterSnapshot {
  const def = CHAPTERS[index] ?? bootChapter
  return {
    chapter,
    index,
    label: def.label,
    menuLabel: def.menuLabel,
  }
}

function subscribe(onStoreChange: () => void): () => void {
  return subscribeChapter((chapter, index) => {
    snapshot = buildSnapshot(chapter, index)
    onStoreChange()
  })
}

function getSnapshot(): ChapterSnapshot {
  return snapshot
}

function getServerSnapshot(): ChapterSnapshot {
  return buildSnapshot('boot', 0)
}

export function useChapter(): ChapterSnapshot {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
