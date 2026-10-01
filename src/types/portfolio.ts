export type ProjectVisualType = 'phone' | 'browser' | 'desktop' | 'custom'

export interface Project {
  slug: string
  number: string
  title: string
  category: string
  description: string
  technologies: string[]
  visualType: ProjectVisualType
  image?: string
  video?: string
  github?: string
  liveUrl?: string
  featured: boolean
  overview?: string
  problem?: string
  solution?: string
  architecture?: string
  challenges?: string
  lessons?: string
}

export interface Experience {
  id: string
  year: string
  title: string
  organization?: string
  description: string
}

export interface Skill {
  name: string
  category: string
  description: string
}

export interface SocialLink {
  id: string
  label: string
  href: string
}

export interface NavigationItem {
  id: string
  label: string
  href: string
}
