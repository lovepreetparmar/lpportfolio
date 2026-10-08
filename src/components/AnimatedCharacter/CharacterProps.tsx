import { cn } from '@/lib/utils'

interface PropProps {
  className?: string
}

/**
 * Illustrated steaming coffee mug resting on the floor beside Lovepreet's beanbag.
 */
export function CoffeeMug({ className }: PropProps) {
  return (
    <div
      className={cn('pointer-events-none absolute flex flex-col items-center', className)}
      aria-hidden="true"
    >
      {/* Animated steam curves */}
      <svg
        className="h-8 w-6 overflow-visible opacity-75"
        viewBox="0 0 24 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 22C5 17 11 12 8 7C5 2 11 0 8 0"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          className="text-ink/50 animate-[steam_2.8s_ease-in-out_infinite]"
        />
        <path
          d="M16 24C13 19 19 14 16 9C13 4 19 2 16 2"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          className="text-accent/60 animate-[steam_3.2s_ease-in-out_infinite_0.6s]"
        />
      </svg>

      {/* Ceramic mug with handle */}
      <div className="relative mt-0.5">
        <div className="h-5 w-5 rounded-b-md border border-ink/40 bg-cream shadow-sm">
          {/* Terracotta accent line */}
          <div className="mx-auto mt-1 h-0.5 w-3 rounded-full bg-accent" />
        </div>
        {/* Mug handle */}
        <div className="absolute top-1 -right-1.5 h-3 w-1.5 rounded-r-sm border-r-2 border-t border-b border-ink/40" />
        {/* Mug contact shadow */}
        <div className="absolute -bottom-1 -left-1 h-1.5 w-7 rounded-full bg-ink/20 blur-[0.5px]" />
      </div>
    </div>
  )
}

/**
 * Gentle warm screen light reflecting upward from Lovepreet's laptop.
 */
export function LaptopScreenGlow({ className }: PropProps) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute h-24 w-28 rounded-full bg-radial from-accent/20 via-cream/10 to-transparent blur-md mix-blend-screen opacity-70 animate-pulse',
        className,
      )}
      style={{ animationDuration: '4s' }}
      aria-hidden="true"
    />
  )
}

/**
 * Playful greeting letter or paper motif floating near the waving hand in Contact.
 */
export function GreetingSparkle({ className }: PropProps) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute flex items-center justify-center animate-[float_3s_ease-in-out_infinite]',
        className,
      )}
      aria-hidden="true"
    >
      <div className="flex h-6 w-6 items-center justify-center rounded-full border border-ink/15 bg-white/90 shadow-sm backdrop-blur-xs">
        <span className="text-xs">✉️</span>
      </div>
    </div>
  )
}
