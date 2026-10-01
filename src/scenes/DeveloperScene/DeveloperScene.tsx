import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { experienceState } from '@/experience/experienceState'

const objects = [
  { position: [-2.2, 0.2, 0] as [number, number, number] },
  { position: [-0.7, -0.1, -0.3] as [number, number, number] },
  { position: [0.8, 0.15, 0.1] as [number, number, number] },
  { position: [2.3, 0, -0.2] as [number, number, number] },
]

export function DeveloperScene() {
  const root = useRef<Group>(null)

  useFrame(() => {
    if (!root.current) return
    const active = experienceState.chapter === 'developer'
    root.current.visible = active
  })

  const focus = experienceState.chapter === 'developer'
    ? Math.min(objects.length - 1, Math.floor(experienceState.chapterProgress * objects.length))
    : 0

  return (
    <group ref={root}>
      {objects.map((obj, i) => (
        <mesh key={i} position={obj.position} scale={i === focus ? 1.15 : 0.85}>
          <boxGeometry args={[0.9, 0.55, 0.08]} />
          <meshStandardMaterial color={i === focus ? '#f5f5f0' : '#1a1a1a'} wireframe={i !== focus} />
        </mesh>
      ))}
    </group>
  )
}
