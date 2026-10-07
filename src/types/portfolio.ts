export type ProjectVisualType = 'phone' | 'browser' | 'desktop' | 'custom'

export type RoomEnvironmentType =
  | 'fitness-lab'
  | 'ai-studio'
  | 'digital-workshop'
  | 'workstation'
  | 'terminal-bay'

export interface ProjectRoomMeta {
  roomType: RoomEnvironmentType
  roomName: string
  accentToken: 'accent' | 'sage' | 'haze'
}

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
  room?: ProjectRoomMeta
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
