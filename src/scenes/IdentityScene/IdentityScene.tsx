import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import type { Group, Mesh } from 'three'
import { experienceState } from '@/experience/experienceState'
import { lerp } from '@/lib/utils'

export function IdentityScene() {
  const root = useRef<Group>(null)
  const mesh = useRef<Mesh>(null)
  const target = useRef({ x: 0, y: 0 })

  useFrame(() => {
    if (!root.current || !mesh.current) return
    const active = experienceState.chapter === 'identity'
    root.current.visible = active
    if (!active) return
    target.current.x = lerp(target.current.x, experienceState.pointer.x * 0.35, 0.06)
    target.current.y = lerp(target.current.y, experienceState.pointer.y * 0.2, 0.06)
    mesh.current.rotation.x = target.current.y
    mesh.current.rotation.y = target.current.x + experienceState.chapterProgress * 0.6
    mesh.current.position.z = -experienceState.chapterProgress * 0.8
  })

  return (
    <group ref={root}>
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.2, 1]} />
      <MeshDistortMaterial color="#0a0a0a" metalness={0.9} roughness={0.15} distort={0.22} speed={1.2} wireframe />
    </mesh>
    </group>
  )
}
