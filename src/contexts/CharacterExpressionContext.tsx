import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { CharacterExpression } from '@/components/AnimatedCharacter/types'

type CharacterExpressionContextValue = {
  expression: CharacterExpression
  setExpression: (expression: CharacterExpression) => void
  resetExpression: () => void
}

const CharacterExpressionContext = createContext<CharacterExpressionContextValue | null>(null)

export function CharacterExpressionProvider({ children }: { children: ReactNode }) {
  const [expression, setExpression] = useState<CharacterExpression>('neutral')

  const value = useMemo(
    () => ({
      expression,
      setExpression,
      resetExpression: () => setExpression('neutral'),
    }),
    [expression],
  )

  return <CharacterExpressionContext.Provider value={value}>{children}</CharacterExpressionContext.Provider>
}

export function useCharacterExpression() {
  const ctx = useContext(CharacterExpressionContext)
  if (!ctx) {
    throw new Error('useCharacterExpression must be used within CharacterExpressionProvider')
  }
  return ctx
}
