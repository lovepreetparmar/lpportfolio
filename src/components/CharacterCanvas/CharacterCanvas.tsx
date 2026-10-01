import { useMemo } from 'react'
import type { CharacterExpression } from '@/components/AnimatedCharacter/types'

type CharacterCanvasProps = {
  lookX: number
  lookY: number
  expression: CharacterExpression
  blink: boolean
}

/** Placeholder SVG until illustrated frames land in `public/character/`. */
export function CharacterCanvas({ lookX, lookY, expression, blink }: CharacterCanvasProps) {
  const pupilOffset = useMemo(() => {
    const max = 6
    return {
      x: Math.max(-max, Math.min(max, lookX * max)),
      y: Math.max(-max, Math.min(max, lookY * max)),
    }
  }, [lookX, lookY])

  const mouth =
    expression === 'happy'
      ? 'M 88 118 Q 100 128 112 118'
      : expression === 'curious'
        ? 'M 92 120 Q 100 116 108 120'
        : 'M 90 120 Q 100 124 110 120'

  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full"
      role="img"
      aria-label="Illustrated character placeholder for Lovepreet Parmar"
    >
      <ellipse cx="100" cy="175" rx="52" ry="8" fill="#1a1a1a" opacity="0.08" />
      <rect x="55" y="130" width="90" height="50" rx="18" fill="#E8E4DC" stroke="#1a1a1a" strokeWidth="2" />
      <circle cx="100" cy="78" r="42" fill="#F3D2C1" stroke="#1a1a1a" strokeWidth="2.5" />
      <path
        d="M 62 52 Q 100 28 138 52 Q 130 38 100 34 Q 70 38 62 52"
        fill="#1a1a1a"
      />
      <path d="M 68 58 Q 100 48 132 58" fill="#2a2a2a" />
      <ellipse cx="82" cy="76" rx="10" ry={blink ? 1.5 : 8} fill="#fff" stroke="#1a1a1a" strokeWidth="1.5" />
      <ellipse cx="118" cy="76" rx="10" ry={blink ? 1.5 : 8} fill="#fff" stroke="#1a1a1a" strokeWidth="1.5" />
      {!blink && (
        <>
          <circle cx={82 + pupilOffset.x} cy={76 + pupilOffset.y} r="3.5" fill="#1a1a1a" />
          <circle cx={118 + pupilOffset.x} cy={76 + pupilOffset.y} r="3.5" fill="#1a1a1a" />
        </>
      )}
      <path d="M 78 92 Q 100 98 122 92" fill="none" stroke="#1a1a1a" strokeWidth="2" opacity="0.35" />
      <path d={mouth} fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
      <rect x="118" y="138" width="36" height="24" rx="4" fill="#fff" stroke="#1a1a1a" strokeWidth="1.5" />
      <path d="M 124 146 h 24 M 124 152 h 16" stroke="#E85D4C" strokeWidth="1.5" />
    </svg>
  )
}
