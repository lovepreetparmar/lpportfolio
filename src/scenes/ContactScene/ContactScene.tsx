import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group, Mesh } from 'three'
import { experienceState } from '@/experience/experienceState'

export function ContactScene() {
  const root = useRef<Group>(null)
  const mesh = useRef<Mesh>(null)

  useFrame(() => {
    if (!root.current || !mesh.current) return
    const active = experienceState.chapter === 'contact'
    root.current.visible = active
    if (!active) return
    const collapse = 1 - experienceState.chapterProgress
    mesh.current.scale.setScalar(Math.max(0.05, collapse))
  })

  return (
    <group ref={root}>
      <mesh ref={mesh}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#f5f5f0" emissive="#ffffff" emissiveIntensity={0.4} />
      </mesh>
    </group>
  )
}
