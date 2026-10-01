import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type MonogramLoaderProps = {
  onComplete: () => void
}

export function MonogramLoader({ onComplete }: MonogramLoaderProps) {
  const reducedMotion = useReducedMotion()
  const [progress, setProgress] = useState(0)
  const finished = useRef(false)

  const finish = () => {
    if (finished.current) return
    finished.current = true
    onComplete()
  }

  useEffect(() => {
    if (reducedMotion) {
      finish()
      return
    }

    const timeout = window.setTimeout(() => {
      setProgress(100)
      gsap.to('.mono-loader', {
        opacity: 0,
        duration: 0.35,
        onComplete: finish,
      })
    }, 2800)

    let loaded = 0
    const fontsReady = document.fonts?.ready ?? Promise.resolve()
    const minTime = new Promise<void>((r) => setTimeout(r, 450))

    const tick = () => {
      loaded = Math.min(100, loaded + 8)
      setProgress(loaded)
      if (loaded < 100) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)

    Promise.all([fontsReady, minTime])
      .then(() => {
        window.clearTimeout(timeout)
        setProgress(100)
        gsap.to('.mono-loader', {
          opacity: 0,
          duration: 0.45,
          delay: 0.12,
          onComplete: finish,
        })
      })
      .catch(() => {
        window.clearTimeout(timeout)
        finish()
      })

    return () => {
      window.clearTimeout(timeout)
    }
  }, [onComplete, reducedMotion])

  if (reducedMotion) return null

  return (
    <div className="mono-loader fixed inset-0 z-[100] flex items-center justify-center bg-cream">
      <div className="relative flex h-24 w-24 items-center justify-center">
        <span className="mono-piece absolute left-2 top-2 h-8 w-8 border-l-2 border-t-2 border-paper opacity-0" />
        <span className="mono-piece absolute right-2 top-2 h-8 w-8 border-r-2 border-t-2 border-paper opacity-0" />
        <span className="mono-piece absolute bottom-2 left-2 h-8 w-8 border-b-2 border-l-2 border-paper opacity-0" />
        <span className="mono-piece absolute bottom-2 right-2 h-8 w-8 border-b-2 border-r-2 border-paper opacity-0" />
        <span className="font-[family-name:var(--font-display)] text-xl tracking-[0.4em] text-ink">LP</span>
      </div>
      <div className="absolute bottom-12 h-px w-40 overflow-hidden bg-line">
        <div className="h-full bg-paper transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>
      <style>{`
        .mono-piece { animation: monoIn 0.35s ease forwards; }
        @keyframes monoIn { to { opacity: 1; } }
      `}</style>
    </div>
  )
}
