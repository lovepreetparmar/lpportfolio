import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { CharacterPose } from '@/components/AnimatedCharacter/types'

type CharacterPoseContextValue = {
  pose: CharacterPose
  setPose: (pose: CharacterPose) => void
  resetPose: () => void
}

const CharacterPoseContext = createContext<CharacterPoseContextValue | null>(null)

export function CharacterPoseProvider({ children }: { children: ReactNode }) {
  const [pose, setPose] = useState<CharacterPose>('idle')

  // Stable reference — does not change when pose changes, so useEffect deps
  // that include resetPose will not re-run on every pose transition.
  const resetPose = useCallback(() => setPose('idle'), [])

  const value = useMemo(
    () => ({ pose, setPose, resetPose }),
    [pose, resetPose],
  )

  return <CharacterPoseContext.Provider value={value}>{children}</CharacterPoseContext.Provider>
}

export function useCharacterPose() {
  const ctx = useContext(CharacterPoseContext)
  if (!ctx) {
    throw new Error('useCharacterPose must be used within CharacterPoseProvider')
  }
  return ctx
}
