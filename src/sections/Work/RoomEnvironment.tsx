import type { RoomEnvironmentType } from '@/types/portfolio'
import { cn } from '@/lib/utils'

interface RoomEnvironmentProps {
  roomType: RoomEnvironmentType
  accentToken: 'accent' | 'sage' | 'haze'
  className?: string
}

/**
 * Architectural room atmosphere layer for each ProjectRoom.
 *
 * Echoes the illustrated world established in Hero:
 * - Warm paper/cream foundation with faint grain
 * - Architectural horizon/floor plane grounding the space
 * - One or two understated environmental motifs specific to the discipline
 * - Purely decorative, aria-hidden, zero layout impact
 */
export function RoomEnvironment({ roomType, accentToken, className }: RoomEnvironmentProps) {
  return (
    <div
      className={cn('room-environment pointer-events-none absolute inset-0 overflow-hidden', className)}
      aria-hidden="true"
    >
      {/* Ambient discipline wash */}
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-700',
          accentToken === 'accent' &&
            'bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgba(232,93,76,0.06),transparent_70%)]',
          accentToken === 'sage' &&
            'bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgba(61,107,90,0.07),transparent_70%)]',
          accentToken === 'haze' &&
            'bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgba(109,143,166,0.08),transparent_70%)]',
        )}
      />

      {/* Room-specific architectural motif */}
      {roomType === 'fitness-lab' && <FitnessLabMotif />}
      {roomType === 'ai-studio' && <AiStudioMotif />}
      {roomType === 'digital-workshop' && <DigitalWorkshopMotif />}
      {roomType === 'workstation' && <WorkstationMotif />}
      {roomType === 'terminal-bay' && <TerminalBayMotif />}

      {/* Ground horizon line: runs across the room to ground the visual and character */}
      <div className="absolute bottom-6 left-0 right-0 h-px bg-ink/10 lg:bottom-10">
        <span className="absolute right-12 top-[-2px] h-1 w-1 rounded-full bg-ink/20" />
      </div>
    </div>
  )
}

/**
 * Fitness Lab motif: subtle pulse/rhythm line and measurement ticks.
 */
function FitnessLabMotif() {
  return (
    <svg
      className="absolute right-[4%] top-[12%] h-48 w-80 text-ink/10"
      viewBox="0 0 320 180"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      {/* Metric horizon grid lines */}
      <line x1="0" y1="40" x2="320" y2="40" strokeDasharray="3 6" opacity="0.5" />
      <line x1="0" y1="90" x2="320" y2="90" strokeDasharray="3 6" opacity="0.3" />
      <line x1="0" y1="140" x2="320" y2="140" strokeDasharray="3 6" opacity="0.5" />
      {/* Restrained pulse trace */}
      <path
        d="M 20 90 L 90 90 L 105 50 L 120 120 L 135 75 L 145 90 L 300 90"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.35"
      />
      {/* Corner calibration tick */}
      <circle cx="20" cy="90" r="2.5" fill="var(--accent)" opacity="0.4" />
      <circle cx="300" cy="90" r="2.5" fill="var(--accent)" opacity="0.4" />
    </svg>
  )
}

/**
 * AI Studio motif: layered drafting canvas borders with a subtle lens marker.
 */
function AiStudioMotif() {
  return (
    <svg
      className="absolute right-[6%] top-[10%] h-52 w-84 text-ink/10"
      viewBox="0 0 340 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      {/* Layered paper canvas frame */}
      <rect x="40" y="20" width="260" height="150" rx="3" strokeDasharray="4 4" opacity="0.4" />
      <rect x="25" y="35" width="260" height="150" rx="3" opacity="0.35" stroke="var(--haze)" />
      {/* Alignment crosshairs */}
      <line x1="155" y1="25" x2="155" y2="35" opacity="0.6" />
      <line x1="150" y1="30" x2="160" y2="30" opacity="0.6" />
      <circle cx="155" cy="110" r="28" stroke="var(--haze)" strokeDasharray="2 4" opacity="0.3" />
    </svg>
  )
}

/**
 * Digital Workshop motif: isometric guides and structural alignment ticks.
 */
function DigitalWorkshopMotif() {
  return (
    <svg
      className="absolute right-[5%] top-[14%] h-48 w-80 text-ink/10"
      viewBox="0 0 320 180"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      {/* Architectural construction lines */}
      <line x1="30" y1="30" x2="290" y2="30" opacity="0.3" />
      <line x1="30" y1="30" x2="30" y2="150" opacity="0.3" />
      <line x1="30" y1="150" x2="290" y2="150" opacity="0.3" />
      {/* Diagonal flow guide */}
      <line x1="30" y1="30" x2="150" y2="150" stroke="var(--sage)" strokeDasharray="4 6" opacity="0.4" />
      <line x1="150" y1="30" x2="270" y2="150" stroke="var(--sage)" strokeDasharray="4 6" opacity="0.4" />
      {/* Drafting corner squares */}
      <rect x="26" y="26" width="8" height="8" fill="var(--sage)" opacity="0.25" />
      <rect x="286" y="146" width="8" height="8" fill="var(--sage)" opacity="0.25" />
    </svg>
  )
}

/**
 * Workstation motif: structured horizon geometry and desk perspective plane.
 */
function WorkstationMotif() {
  return (
    <svg
      className="absolute right-[4%] top-[16%] h-44 w-80 text-ink/10"
      viewBox="0 0 320 160"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      {/* Horizontal workstation datum lines */}
      <line x1="20" y1="45" x2="300" y2="45" opacity="0.4" />
      <line x1="50" y1="95" x2="270" y2="95" strokeDasharray="6 6" opacity="0.3" stroke="var(--haze)" />
      {/* Window framing corners */}
      <path d="M 40 30 L 20 30 L 20 50" opacity="0.5" />
      <path d="M 280 30 L 300 30 L 300 50" opacity="0.5" />
      <path d="M 20 110 L 20 130 L 40 130" opacity="0.5" />
      <path d="M 300 110 L 300 130 L 280 130" opacity="0.5" />
    </svg>
  )
}

/**
 * Terminal Bay motif: backend infrastructure datum grid and node connections.
 */
function TerminalBayMotif() {
  return (
    <svg
      className="absolute right-[5%] top-[12%] h-48 w-80 text-ink/10"
      viewBox="0 0 320 180"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      {/* System routing bus lines */}
      <path
        d="M 40 40 L 140 40 L 170 70 L 280 70"
        stroke="var(--sage)"
        strokeDasharray="4 4"
        opacity="0.4"
      />
      <path
        d="M 40 130 L 110 130 L 150 90 L 280 90"
        stroke="var(--sage)"
        strokeDasharray="4 4"
        opacity="0.4"
      />
      {/* Bus nodes */}
      <circle cx="40" cy="40" r="3" fill="var(--sage)" opacity="0.4" />
      <circle cx="170" cy="70" r="2.5" fill="var(--sage)" opacity="0.5" />
      <circle cx="280" cy="70" r="3" fill="var(--sage)" opacity="0.4" />
      <circle cx="40" cy="130" r="3" fill="var(--sage)" opacity="0.4" />
      <circle cx="150" cy="90" r="2.5" fill="var(--sage)" opacity="0.5" />
      <circle cx="280" cy="90" r="3" fill="var(--sage)" opacity="0.4" />
    </svg>
  )
}
