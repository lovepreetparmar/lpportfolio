import { SITE_NAME } from '@/lib/constants'

export type HeroTextSegment = {
  text: string
  /** Painted in the coral accent with a short underline. */
  accent?: boolean
}

export type HeroHint = {
  id: string
  label: string
  note: string
}

/** Statement breaks: one entry per displayed line. */
const statementLines: HeroTextSegment[][] = [
  [{ text: 'I build' }],
  [{ text: 'digital' }],
  [{ text: 'things.', accent: true }],
]

/** Masthead breaks the site name onto one line per word. */
const nameLines: string[] = SITE_NAME.split(' ')

/** Copy for the hero scene. Existing, truthful portfolio content only. */
export const heroContent = {
  eyebrow: 'Software Developer',
  nameLines,
  statementLines,
  support: 'Software developer building web, mobile, and AI-powered experiences.',
  focus: 'Web · Mobile · AI · Product',
  cta: { label: 'Explore my work', href: '#work' },
  hints: [
    { id: 'move', label: 'Move', note: 'the character notices' },
    { id: 'scroll', label: 'Scroll', note: 'there is more below' },
  ] satisfies HeroHint[],
  characterAlt: 'Illustrated character of Lovepreet Parmar',
}
