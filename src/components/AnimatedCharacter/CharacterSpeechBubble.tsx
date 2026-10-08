import { useState } from 'react'
import type { CharacterPose } from './types'
import { cn } from '@/lib/utils'

interface CharacterSpeechBubbleProps {
  pose: CharacterPose
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
  className?: string
}

const SECTION_THOUGHTS: Record<CharacterPose, string[]> = {
  idle: [
    "Hey there! I'm Lovepreet.",
    "Welcome to my digital workshop!",
    "Scroll down to explore my projects.",
  ],
  'sit-coding': [
    "FitGuide is built with React Native & Supabase. Super fun to build!",
    "Coffee counter: ☕ 3 cups and counting.",
    "Click 'Explore project' to step inside any project room!",
    "I focus on offline-first mobile apps and fluid interactions.",
  ],
  thinking: [
    "Studied IT in Chandigarh, blending design with code ever since.",
    "When I'm not coding, I'm testing custom Android ROMs or listening to music.",
    "Big believer in clean architecture and warm editorial design.",
    "Over 5 years building production web and mobile apps.",
  ],
  wave: [
    "Have an idea? Let's build it together!",
    "Click 'Email me' to drop a line directly to my inbox ✉️",
    "Always up for exciting collaborations and product builds!",
    "Thanks for stopping by my portfolio!",
  ],
  coding: [
    "Deep in flow state...",
    "Shipping clean code and smooth animations.",
  ],
  coffee: [
    "Coffee break ☕",
    "Fueling the next build.",
  ],
  phone: [
    "Checking the latest build notifications.",
    "Testing responsive layouts on real devices.",
  ],
  walk: [
    "Stepping into the next section...",
    "Exploring new ideas.",
  ],
}

export function CharacterSpeechBubble({
  pose,
  isOpen,
  onToggle,
  onClose,
  className,
}: CharacterSpeechBubbleProps) {
  const [thoughtIndex, setThoughtIndex] = useState(0)
  const [prevPose, setPrevPose] = useState(pose)

  if (pose !== prevPose) {
    setPrevPose(pose)
    setThoughtIndex(0)
  }

  const thoughts = SECTION_THOUGHTS[pose] ?? SECTION_THOUGHTS.idle
  const currentThought = thoughts[thoughtIndex % thoughts.length]

  const handleNextThought = (e: React.MouseEvent) => {
    e.stopPropagation()
    setThoughtIndex((prev) => (prev + 1) % thoughts.length)
  }

  return (
    <div className={cn('pointer-events-auto select-none', className)}>
      {isOpen ? (
        <div
          onClick={handleNextThought}
          className="relative max-w-[240px] cursor-pointer rounded-2xl border border-ink/15 bg-cream/95 p-3.5 shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-[1.02] hover:border-ink/25"
          role="dialog"
          aria-label="Character thought"
        >
          {/* Header with mini avatar indicator and close button */}
          <div className="flex items-center justify-between gap-2 border-b border-ink/10 pb-1.5">
            <span className="label-mono flex items-center gap-1.5 text-[10px] font-medium text-accent">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              LOVEPREET
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
              className="rounded-full p-0.5 text-ink/40 transition-colors hover:text-ink focus-ring"
              aria-label="Close message"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Thought content */}
          <p className="mt-2 text-xs leading-relaxed text-ink font-medium">
            {currentThought}
          </p>

          <div className="mt-2 flex items-center justify-between text-[10px] text-ink/40">
            <span>Tap for next thought</span>
            <span>{((thoughtIndex % thoughts.length) + 1)}/{thoughts.length}</span>
          </div>

          {/* Speech bubble tail pointer */}
          <div
            className="absolute -bottom-2 right-8 h-3 w-3 rotate-45 border-r border-b border-ink/15 bg-cream/95"
            aria-hidden="true"
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={onToggle}
          className="group flex items-center gap-1.5 rounded-full border border-ink/15 bg-cream/95 px-3 py-1 shadow-md backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-accent hover:bg-white focus-ring"
          aria-label="Chat with Lovepreet"
        >
          <span className="text-xs transition-transform duration-200 group-hover:scale-110" aria-hidden="true">
            💭
          </span>
          <span className="label-mono text-[10px] text-ink/75 group-hover:text-ink">
            Talk to me
          </span>
        </button>
      )}
    </div>
  )
}
