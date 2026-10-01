export function getDevicePixelRatioCap(max = 1.5): number {
  if (typeof window === 'undefined') return 1
  return Math.min(window.devicePixelRatio, max)
}

export function getParticleTier(): 'high' | 'medium' | 'low' {
  if (typeof window === 'undefined') return 'medium'
  const w = window.innerWidth
  if (w < 640) return 'low'
  if (w < 1024) return 'medium'
  return 'high'
}
