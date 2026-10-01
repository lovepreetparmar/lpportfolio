import type { SocialLink } from '@/types/portfolio'

export const EMAIL = 'lplovepreetparmar@gmail.com'

export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/lovepreetparmar',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/lovepreetparmar/',
  },
  {
    id: 'email',
    label: 'Email',
    href: `mailto:${EMAIL}`,
  },
]
