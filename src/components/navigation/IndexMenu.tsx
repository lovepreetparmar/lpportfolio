import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

type IndexMenuProps = {
  open: boolean
  onClose: () => void
}

const items = [
  { num: '01', label: 'Work', href: '#work' },
  { num: '02', label: 'About', href: '#about' },
  { num: '03', label: 'Experiments', href: '/experiments' },
  { num: '04', label: 'Contact', href: '#contact' },
]

export function IndexMenu({ open, onClose }: IndexMenuProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-base/95 backdrop-blur-sm transition-opacity duration-500',
        open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
      )}
      aria-hidden={!open}
    >
      <button type="button" className="absolute right-6 top-6 label-mono focus-ring" onClick={onClose}>
        Close
      </button>
      <nav aria-label="Site index" className="index-nav">
        <ul className="space-y-6 text-center">
          {items.map((item) => {
            const className =
              'index-nav-item group inline-block font-[family-name:var(--font-display)] text-5xl uppercase tracking-tight transition-[transform,letter-spacing] duration-300 hover:scale-[1.03] hover:tracking-[0.08em] focus-ring md:text-7xl'
            return (
              <li key={item.label}>
                <span className="label-mono mr-4 text-muted">{item.num}</span>
                {item.href.startsWith('/') ? (
                  <Link to={item.href} className={className} onClick={onClose}>
                    {item.label}
                  </Link>
                ) : (
                  <a href={item.href} className={className} onClick={onClose}>
                    {item.label}
                  </a>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
