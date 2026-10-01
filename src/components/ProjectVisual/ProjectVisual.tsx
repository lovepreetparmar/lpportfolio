import { useRef } from 'react'
import type { ProjectVisualType } from '@/types/portfolio'
import { useIsMobile } from '@/hooks/useIsMobile'
import { cn } from '@/lib/utils'

type ProjectVisualProps = {
  visualType: ProjectVisualType
  title: string
  className?: string
}

export function ProjectVisual({ visualType, title, className }: ProjectVisualProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  return (
    <div
      ref={ref}
      className={cn(
        'project-visual relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-ink/10 bg-gradient-to-br from-white to-cream shadow-[0_24px_60px_-24px_rgba(20,18,16,0.15)]',
        className,
      )}
      onPointerMove={(e) => {
        if (isMobile || !ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        ref.current.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg)`
      }}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.transform = ''
      }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(232,93,76,0.12),transparent_55%)]" />
      {visualType === 'phone' && <PhoneMock title={title} />}
      {visualType === 'browser' && <BrowserMock title={title} />}
      {visualType === 'desktop' && <DesktopMock title={title} />}
      {visualType === 'custom' && <CustomMock title={title} />}
    </div>
  )
}

function PhoneMock({ title }: { title: string }) {
  return (
    <div className="flex h-full items-center justify-center p-8">
      <div className="h-[88%] w-[42%] max-w-[11rem] rounded-[1.75rem] border-[3px] border-ink/80 bg-ink p-2 shadow-xl">
        <div className="flex h-full flex-col overflow-hidden rounded-[1.35rem] bg-cream">
          <div className="h-8 bg-accent/20" />
          <div className="flex flex-1 flex-col gap-2 p-3">
            <p className="label-mono text-[0.55rem] text-ink/50">{title}</p>
            <div className="flex-1 rounded bg-white/80" />
            <div className="h-2 w-2/3 rounded bg-accent-muted/30" />
          </div>
        </div>
      </div>
    </div>
  )
}

function BrowserMock({ title }: { title: string }) {
  return (
    <div className="flex h-full items-end justify-center p-6 md:p-10">
      <div className="w-full max-w-lg overflow-hidden rounded-t-lg border border-ink/15 bg-white shadow-lg">
        <div className="flex items-center gap-2 border-b border-ink/10 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-accent/60" />
          <span className="h-2 w-2 rounded-full bg-ink/20" />
          <span className="h-2 w-2 rounded-full bg-ink/20" />
          <span className="ml-2 flex-1 truncate label-mono text-[0.6rem] text-ink/40">{title}</span>
        </div>
        <div className="grid gap-3 p-4 md:p-6">
          <div className="h-3 w-1/3 rounded bg-ink/10" />
          <div className="h-24 rounded bg-gradient-to-r from-accent/15 to-accent-muted/15" />
          <div className="grid grid-cols-3 gap-2">
            <div className="h-10 rounded bg-ink/5" />
            <div className="h-10 rounded bg-ink/5" />
            <div className="h-10 rounded bg-ink/5" />
          </div>
        </div>
      </div>
    </div>
  )
}

function DesktopMock({ title }: { title: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-8">
      <div className="w-full max-w-md rounded border border-ink/15 bg-ink p-1">
        <div className="rounded-sm bg-cream p-4">
          <p className="label-mono text-[0.65rem] text-ink/50">{title}</p>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-sm bg-white" />
            ))}
          </div>
        </div>
      </div>
      <div className="h-2 w-32 rounded-full bg-ink/20" />
    </div>
  )
}

function CustomMock({ title }: { title: string }) {
  return (
    <div className="flex h-full flex-col justify-center gap-3 p-8 font-mono text-xs text-ink/70">
      <p className="label-mono text-ink/40">{title}</p>
      <pre className="overflow-hidden rounded border border-ink/10 bg-white/90 p-4 leading-relaxed">
        {`GET /api/v1/health\n→ 200 OK\n\n# service layer\npython -m uvicorn main:app`}
      </pre>
    </div>
  )
}
