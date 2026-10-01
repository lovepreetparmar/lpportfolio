import { useEffect, useState } from 'react'

export type MousePosition = {
  x: number
  y: number
  nx: number
  ny: number
}

export function useMousePosition(enabled = true): MousePosition {
  const [pos, setPos] = useState<MousePosition>({ x: 0, y: 0, nx: 0, ny: 0 })

  useEffect(() => {
    if (!enabled) return
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = -(e.clientY / window.innerHeight) * 2 + 1
      setPos({ x: e.clientX, y: e.clientY, nx, ny })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [enabled])

  return pos
}
