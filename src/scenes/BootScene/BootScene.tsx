import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group, Mesh } from 'three'
import { experienceState } from '@/experience/experienceState'

export function BootScene() {
  const root = useRef<Group>(null)
  const mesh = useRef<Mesh>(null)

  useFrame(() => {
    if (!root.current || !mesh.current) return
    const active = experienceState.chapter === 'boot'
    root.current.visible = active
    if (!active) return
    const p = experienceState.chapterProgress
    mesh.current.scale.setScalar(0.2 + p * 0.8)
    mesh.current.rotation.y += 0.004
  })

  return (
    <group ref={root}>
    <mesh ref={mesh}>
      <octahedronGeometry args={[0.9, 0]} />
      <meshStandardMaterial color="#111111" wireframe metalness={0.9} roughness={0.2} />
    </mesh>
    </group>
  )
}
