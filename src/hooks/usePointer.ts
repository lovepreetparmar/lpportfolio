import { useEffect } from 'react'
import { updatePointer } from '@/experience/pointerStore'

export function usePointerTracking(): void {
  useEffect(() => {
    const onMove = (e: PointerEvent) => updatePointer(e.clientX, e.clientY)
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
}
