import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import type { Project } from '@/types/portfolio'
import { ProjectVisual } from '@/components/ProjectVisual/ProjectVisual'
import { RoomEnvironment } from './RoomEnvironment'
import { useCharacterExpression } from '@/contexts/CharacterExpressionContext'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

interface ProjectRoomProps {
  project: Project
  className?: string
}

export function ProjectRoom({ project, className }: ProjectRoomProps) {
  const navigate = useNavigate()
  const reducedMotion = useReducedMotion()
  const { setExpression, resetExpression } = useCharacterExpression()
  const roomRef = useRef<HTMLElement>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const room = project.room ?? {
    roomType: 'fitness-lab',
    roomName: 'Project Room',
    accentToken: 'accent',
  }

  const handleExplore = (e: React.MouseEvent) => {
    // Let modifier clicks open natively in new tabs/windows
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()

    if (reducedMotion || !roomRef.current) {
      navigate(`/work/${project.slug}`)
      return
    }

    if (isTransitioning) return
    setIsTransitioning(true)

    const roomEl = roomRef.current
    const visualEl = roomEl.querySelector('[data-room-visual]')
    const envEl = roomEl.querySelector('[data-room-env]')
    const headerEl = roomEl.querySelector('header')
    const descEl = roomEl.querySelector('[data-room-desc]')
    const pillsEl = roomEl.querySelector('[data-room-pills]')
    const actionsEl = roomEl.querySelector('[data-room-actions]')

    const tl = gsap.timeline({
      onComplete: () => {
        navigate(`/work/${project.slug}`)
        // Clean up inline styles so returning to the room restores pristine state
        gsap.set(roomEl, { clearProps: 'all' })
        gsap.set(softeningElements, { clearProps: 'all' })
        if (visualEl) gsap.set(visualEl, { clearProps: 'all' })
        setIsTransitioning(false)
      },
    })

    // Surrounding elements soften/fade while the project title remains readable
    const softeningElements = [envEl, headerEl, descEl, pillsEl, actionsEl].filter(Boolean)
    tl.to(
      softeningElements,
      {
        opacity: 0.2,
        duration: 0.35,
        ease: 'power2.out',
      },
      0,
    )

    // ProjectRoom environment gently expands
    tl.to(
      roomEl,
      {
        scale: 1.012,
        duration: 0.4,
        ease: 'power2.inOut',
      },
      0,
    )

    // ProjectVisual becomes the visual anchor
    if (visualEl) {
      tl.to(
        visualEl,
        {
          scale: 1.03,
          y: -4,
          duration: 0.4,
          ease: 'power2.out',
        },
        0,
      )
    }
  }

  return (
    <article
      ref={roomRef}
      data-project-room
      data-room-type={room.roomType}
      className={cn(
        'project-room relative overflow-hidden rounded-2xl border border-ink/10 bg-cream/70 transition-colors duration-300 hover:border-ink/20',
        'p-6 sm:p-8 md:p-10 lg:py-12 lg:pl-10 lg:pr-6',
        isTransitioning && 'pointer-events-none',
        className,
      )}
      onPointerEnter={() => setExpression('curious')}
      onPointerLeave={resetExpression}
      aria-label={`Project Room: ${project.title}`}
    >
      {/* Background illustrated atmosphere */}
      <RoomEnvironment
        data-room-env
        roomType={room.roomType}
        accentToken={room.accentToken}
      />

      {/* Room header: kept on the left (max-w-2xl) so it never collides with the persistent character on the right */}
      <header className="relative z-10 mb-8 flex max-w-2xl flex-wrap items-center gap-3 border-b border-ink/10 pb-4">
        <span className="label-mono font-medium text-accent">ROOM {project.number}</span>
        <span className="text-ink/30" aria-hidden="true">/</span>
        <span className="label-mono text-ink/75">{room.roomName}</span>
        <span className="text-ink/30" aria-hidden="true">·</span>
        <span className="label-mono text-xs text-ink/50">{project.category}</span>
      </header>

      {/* Main room staging: 12-column grid providing 5 cols for Editorial, 4 cols for Visual, and 3 cols dedicated clearance for the persistent character */}
      <div className="relative z-10 grid gap-8 md:gap-10 lg:grid-cols-12 lg:items-center">
        {/* Editorial Content (Columns 1-5) */}
        <div data-room-editorial className="flex flex-col lg:col-span-5">
          <h3
            data-room-title
            className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
          >
            {project.title}
          </h3>

          <p
            data-room-desc
            className="mt-3 max-w-md text-sm leading-relaxed text-ink/75 sm:text-base"
          >
            {project.description}
          </p>

          {/* Technology pills */}
          <ul
            data-room-pills
            className="mt-5 flex flex-wrap gap-2"
            aria-label={`Technologies used in ${project.title}`}
          >
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-ink/10 bg-white/80 px-3 py-1 text-xs font-medium text-ink/80 shadow-xs"
              >
                {tech}
              </li>
            ))}
          </ul>

          {/* Actions & Links */}
          <div data-room-actions className="mt-6 flex flex-wrap items-center gap-4">
            <Link
              to={`/work/${project.slug}`}
              onClick={handleExplore}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-cream transition-transform duration-200 hover:scale-[1.02] focus-ring"
              data-cursor="VIEW"
              aria-label={`Explore project ${project.title}`}
            >
              Explore project →
            </Link>

            {project.github && (
              <a
                href={project.github}
                className="label-mono text-xs text-ink/70 hover:text-ink hover:underline underline-offset-4 focus-ring"
                target="_blank"
                rel="noreferrer"
                data-cursor="OPEN"
              >
                GitHub →
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                className="label-mono text-xs text-ink/70 hover:text-ink hover:underline underline-offset-4 focus-ring"
                target="_blank"
                rel="noreferrer"
                data-cursor="OPEN"
              >
                Live site →
              </a>
            )}
          </div>
        </div>

        {/* Project Visual Stage (Columns 6-9: center-stage focal point) */}
        <div data-room-visual className="w-full max-w-md lg:col-span-4">
          <Link
            to={`/work/${project.slug}`}
            onClick={handleExplore}
            className="group block rounded-lg focus-ring"
            data-cursor="VIEW"
            aria-label={`Inspect ${project.title} interface`}
          >
            <div className="transform transition-transform duration-300 group-hover:scale-[1.01]">
              <ProjectVisual visualType={project.visualType} title={project.title} />
            </div>
          </Link>
        </div>

        {/* Columns 10-12: Dedicated clearance on desktop where PersistentCharacter sits in sit-coding pose */}
        <div className="hidden lg:col-span-3 lg:block" aria-hidden="true" />
      </div>
    </article>
  )
}
