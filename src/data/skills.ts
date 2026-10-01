import type { Skill } from '@/types/portfolio'

/** Technologies from verified legacy skills + current projects (no invented stack). */
export const skills: Skill[] = [
  { name: 'React', category: 'Frontend', description: 'Web applications and design systems' },
  { name: 'TypeScript', category: 'Language', description: 'Typed application code' },
  { name: 'JavaScript', category: 'Language', description: 'Interactive web experiences' },
  { name: 'HTML', category: 'Frontend', description: 'Semantic markup' },
  { name: 'CSS', category: 'Frontend', description: 'Layout and visual design' },
  { name: 'Tailwind CSS', category: 'Frontend', description: 'Utility-first styling' },
  { name: 'Vite', category: 'Tools', description: 'Modern frontend tooling' },
  { name: 'GSAP', category: 'Tools', description: 'Motion and scroll animation' },
  { name: 'React Native', category: 'Mobile', description: 'Cross-platform mobile apps' },
  { name: 'Expo', category: 'Mobile', description: 'React Native delivery' },
  { name: 'PHP', category: 'Backend', description: 'Server-side web applications' },
  { name: 'MySQL', category: 'Database', description: 'Relational data' },
  { name: 'Python', category: 'Backend', description: 'Scripting and ML coursework' },
  { name: 'FastAPI', category: 'Backend', description: 'Python API services' },
  { name: 'Node.js', category: 'Backend', description: 'JavaScript services' },
  { name: 'Supabase', category: 'Database', description: 'Auth and Postgres' },
  { name: 'Firebase', category: 'Backend', description: 'App data and auth' },
  { name: 'Electron', category: 'Desktop', description: 'Desktop applications' },
  { name: 'Git', category: 'Tools', description: 'Version control' },
]
