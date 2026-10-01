import { useEffect, useState } from 'react'
import { CharacterCanvas } from '@/components/CharacterCanvas/CharacterCanvas'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useMousePosition } from '@/hooks/useMousePosition'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'
import type { AnimatedCharacterProps, CharacterExpression } from './types'

export function AnimatedCharacter({
  state = 'idle',
  followCursor = true,
  expression = 'neutral',
  className,
}: AnimatedCharacterProps) {
  const isMobile = useIsMobile()
  const reducedMotion = useReducedMotion()
  const mouse = useMousePosition(followCursor && !isMobile && !reducedMotion)
  const [blink, setBlink] = useState(false)
  const [activeExpression, setActiveExpression] = useState<CharacterExpression>(expression)

  useEffect(() => {
    setActiveExpression(expression)
  }, [expression])

  useEffect(() => {
    if (reducedMotion) return
    let timeout = 0
    const schedule = () => {
      const delay = 2500 + Math.random() * 4000
      timeout = window.setTimeout(() => {
        setBlink(true)
        window.setTimeout(() => {
          setBlink(false)
          schedule()
        }, 120)
      }, delay)
    }
    schedule()
    return () => window.clearTimeout(timeout)
  }, [reducedMotion])

  const lookX = followCursor && !isMobile ? mouse.nx : 0
  const lookY = followCursor && !isMobile ? mouse.ny : 0

  return (
    <div
      className={cn(
        'character-root relative aspect-square w-[min(72vw,22rem)] md:w-[min(40vw,28rem)]',
        state === 'idle' && !reducedMotion && 'animate-[character-breathe_4s_ease-in-out_infinite]',
        className,
      )}
    >
      <CharacterCanvas
        lookX={lookX}
        lookY={lookY}
        expression={activeExpression}
        blink={blink}
      />
    </div>
  )
}
