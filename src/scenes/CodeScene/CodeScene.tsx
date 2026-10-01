import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { experienceState } from '@/experience/experienceState'

export function CodeScene() {
  const root = useRef<Group>(null)

  useFrame(() => {
    if (!root.current) return
    root.current.visible = experienceState.chapter === 'system'
    if (root.current.visible) {
      root.current.rotation.y = experienceState.chapterProgress * 0.4
    }
  })

  const grid = 8

  return (
    <group ref={root}>
      {Array.from({ length: grid }).map((_, i) => {
        const z = (i - grid / 2) * 0.6
        return (
          <mesh key={`h-${i}`} position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
            <planeGeometry args={[12, 0.01]} />
            <meshBasicMaterial color="#1f3d2a" transparent opacity={0.35} />
          </mesh>
        )
      })}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.4, 1.4, 0.05]} />
        <meshStandardMaterial color="#050505" emissive="#0f2a18" emissiveIntensity={0.35} />
      </mesh>
    </group>
  )
}
