import { useEffect, useRef, type AnchorHTMLAttributes, type ReactNode } from 'react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type MagneticButtonProps = {
  href: string
  children: ReactNode
  className?: string
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children' | 'className'>

export function MagneticButton({ href, children, className, ...rest }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const isMobile = useIsMobile()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || isMobile || reducedMotion) return

    gsap.set(el, { x: 0, y: 0 })
    const xTo = gsap.quickTo(el, 'x', { duration: 0.42, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.42, ease: 'power3.out' })

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      xTo(x * 0.18)
      yTo(y * 0.18)
    }

    const onLeave = () => {
      xTo(0)
      yTo(0)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)

    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      gsap.set(el, { clearProps: 'x,y' })
    }
  }, [isMobile, reducedMotion])

  return (
    <a
      ref={ref}
      href={href}
      className={cn('focus-ring will-change-transform', className)}
      {...rest}
    >
      {children}
    </a>
  )
}
