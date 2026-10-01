import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { experienceState } from '@/experience/experienceState'

export function JourneyScene() {
  const root = useRef<Group>(null)

  useFrame(() => {
    if (!root.current) return
    const active = experienceState.chapter === 'journey'
    root.current.visible = active
    if (!active) return
    root.current.position.z = -experienceState.chapterProgress * 6
  })

  return (
    <group ref={root}>
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} position={[0, 0, i * 1.2]}>
          <torusGeometry args={[1.6 - i * 0.12, 0.02, 8, 48]} />
          <meshStandardMaterial color="#c47a2c" emissive="#5a3210" emissiveIntensity={0.2} />
        </mesh>
      ))}
    </group>
  )
}
