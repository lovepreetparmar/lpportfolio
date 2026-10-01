import type { Project } from '@/types/portfolio'

export const projects: Project[] = [
  {
    slug: 'fitguide',
    number: '01',
    title: 'FitGuide',
    category: 'MOBILE · AI · FITNESS',
    description:
      'AI-powered personal fitness coach with workouts, recovery tracking, nutrition, and offline-friendly sync.',
    overview:
      'FitGuide combines React Native and Supabase with an AI coach layer for personalized training, progress analytics, and an interactive muscle map.',
    technologies: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'AI'],
    visualType: 'phone',
    featured: true,
  },
  {
    slug: 'ai-studio',
    number: '02',
    title: 'AI Studio',
    category: 'WEB · AI',
    description:
      'Full-stack CRM with lead operations, analytics, role-based portals, and Gemini-powered workflows.',
    overview:
      'A React and Vite application with Firebase data, team tooling, and AI integrations for sales and operations teams.',
    technologies: ['React', 'TypeScript', 'Vite', 'Firebase', 'Gemini'],
    visualType: 'browser',
    featured: true,
  },
  {
    slug: 'lpsynch',
    number: '03',
    title: 'LPSynch',
    category: 'WEB · SOFTWARE',
    description:
      'Company website redesign with cinematic scroll storytelling and static deployment to Hostinger.',
    overview:
      'Modern React site replacing a legacy PHP presence, with content-driven sections and a custom digital-flow interaction layer.',
    technologies: ['React', 'TypeScript', 'Vite', 'GSAP', 'Tailwind'],
    visualType: 'browser',
    featured: true,
  },
  {
    slug: 'hr-browser',
    number: '04',
    title: 'HR Browser',
    category: 'DESKTOP · ELECTRON',
    description:
      'Desktop HR tooling built with Electron and React — case study details pending repository verification.',
    technologies: ['Electron', 'React', 'TypeScript', 'APIs'],
    visualType: 'desktop',
    featured: true,
  },
  {
    slug: 'rego-kernel',
    number: '05',
    title: 'Rego Kernel',
    category: 'AI · WEB · BACKEND',
    description:
      'AI-backed web platform with a FastAPI service layer — verify architecture and features before launch.',
    technologies: ['React', 'FastAPI', 'Python', 'SQLite', 'APIs'],
    visualType: 'custom',
    featured: true,
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
