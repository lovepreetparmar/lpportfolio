import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { SITE_NAME } from '@/lib/constants'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type PreloaderProps = {
  onComplete: () => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  const reducedMotion = useReducedMotion()
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    if (reducedMotion) {
      onComplete()
      return
    }

    const duration = 1.1
    const obj = { value: 0 }
    const tween = gsap.to(obj, {
      value: 100,
      duration,
      ease: 'power2.inOut',
      onUpdate: () => setPercent(Math.round(obj.value)),
      onComplete: () => {
        gsap.to('.preloader-shell', {
          opacity: 0,
          duration: 0.5,
          onComplete,
        })
      },
    })

    return () => {
      tween.kill()
    }
  }, [onComplete, reducedMotion])

  if (reducedMotion) return null

  return (
    <div
      className="preloader-shell fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--color-bg)]"
      aria-hidden="true"
    >
      <p className="eyebrow mb-4">{SITE_NAME}</p>
      <p className="text-sm tracking-[0.3em] text-[var(--color-muted)]">LOADING EXPERIENCE</p>
      <p className="mt-8 font-[family-name:var(--font-display)] text-4xl tabular-nums">
        {String(percent).padStart(2, '0')}%
      </p>
    </div>
  )
}
