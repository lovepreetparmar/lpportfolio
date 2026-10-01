import { CHAPTER_COUNT } from '@/experience/chapters'
import { useChapter } from '@/hooks/useChapter'

type ChapterIndicatorProps = {
  onOpenMenu: () => void
}

export function ChapterIndicator({ onOpenMenu }: ChapterIndicatorProps) {
  const { label, index } = useChapter()
  const displayIndex = String(index + 1).padStart(2, '0')
  const total = String(CHAPTER_COUNT).padStart(2, '0')

  return (
    <button
      type="button"
      className="eyebrow focus-ring"
      onClick={onOpenMenu}
      aria-label={`Chapter ${displayIndex} of ${total}. Open navigation.`}
    >
      {label} / {total}
    </button>
  )
}
