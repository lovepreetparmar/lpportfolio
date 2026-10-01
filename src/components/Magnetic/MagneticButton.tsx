import { useRef, type AnchorHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/hooks/useIsMobile'

type MagneticButtonProps = {
  href: string
  children: ReactNode
  className?: string
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children' | 'className'>

export function MagneticButton({ href, children, className, ...rest }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const isMobile = useIsMobile()

  return (
    <a
      ref={ref}
      href={href}
      className={cn('focus-ring transition-transform duration-200', className)}
      onPointerMove={(e) => {
        if (isMobile || !ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        ref.current.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`
      }}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.transform = ''
      }}
      {...rest}
    >
      {children}
    </a>
  )
}
