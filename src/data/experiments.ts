export type ExperimentType = 'shader' | 'three' | 'gsap' | 'ai' | 'interaction'

export interface Experiment {
  slug: string
  title: string
  category: string
  type: ExperimentType
  description: string
}

export const experiments: Experiment[] = [
  {
    slug: 'magnetic-type',
    title: 'Magnetic Type',
    category: 'Typography',
    type: 'gsap',
    description: 'Letters move away from the cursor and return.',
  },
  {
    slug: 'liquid-type',
    title: 'Liquid Type',
    category: 'Shader',
    type: 'shader',
    description: 'Distorted display type with pointer-driven waves.',
  },
  {
    slug: 'particle-lp',
    title: 'Particle LP',
    category: 'Three.js',
    type: 'three',
    description: 'Particles form LP, scatter on pointer, reform when still.',
  },
]
