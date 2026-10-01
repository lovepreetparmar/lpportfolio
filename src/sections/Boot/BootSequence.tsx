import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const lines = [
  { label: 'WEB', status: 'READY' },
  { label: 'MOBILE', status: 'READY' },
  { label: 'AI', status: 'READY' },
  { label: 'BACKEND', status: 'READY' },
  { label: '3D', status: 'READY' },
]

type BootSequenceProps = {
  onComplete: () => void
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const reducedMotion = useReducedMotion()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (reducedMotion) {
      onComplete()
      setVisible(false)
      return
    }

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to('.boot-shell', {
          opacity: 0,
          duration: 0.45,
          onComplete: () => {
            setVisible(false)
            onComplete()
          },
        })
      },
    })

    tl.from('.boot-line', { opacity: 0, y: 8, stagger: 0.08, duration: 0.35 })
      .to('.boot-status', { opacity: 1, duration: 0.25 })
      .from('.boot-ready', { opacity: 0, duration: 0.4 })

    return () => {
      tl.kill()
    }
  }, [onComplete, reducedMotion])

  if (!visible) return null

  return (
    <div className="boot-shell fixed inset-0 z-[100] flex items-center justify-center bg-[var(--black)]">
      <div className="page-padding w-full max-w-xl">
        <p className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-[0.35em]">Lovepreet</p>
        <p className="mt-2 eyebrow">Digital system</p>
        <p className="mt-10 text-xs uppercase tracking-[0.28em] text-[var(--muted)]">Initializing experience</p>
        <ul className="mt-6 space-y-2 font-mono text-xs text-[var(--muted)]">
          {lines.map((line) => (
            <li key={line.label} className="boot-line flex justify-between gap-4">
              <span>{line.label}</span>
              <span className="boot-status opacity-0">{line.status}</span>
            </li>
          ))}
        </ul>
        <p className="boot-ready mt-10 text-sm uppercase tracking-[0.3em]">System online</p>
      </div>
    </div>
  )
}
