import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import type { Group } from 'three'
import { lerp } from '@/lib/utils'
import { pointerStore } from '@/experience/pointerStore'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const velocity = { x: 0, y: 0 }

export function HeroObject() {
  const root = useRef<Group>(null)
  const inner = useRef<Group>(null)
  const reducedMotion = useReducedMotion()

  useFrame((_, delta) => {
    if (!root.current || !inner.current) return

    velocity.x = lerp(velocity.x, pointerStore.vx, 0.15)
    velocity.y = lerp(velocity.y, pointerStore.vy, 0.15)

    const px = reducedMotion ? 0 : pointerStore.x
    const py = reducedMotion ? 0 : pointerStore.y

    root.current.rotation.x = lerp(root.current.rotation.x, py * 0.35 + velocity.y * 0.4, 0.06)
    root.current.rotation.y = lerp(root.current.rotation.y, px * 0.45 + velocity.x * 0.5, 0.06)
    root.current.position.y = lerp(root.current.position.y, py * 0.08, 0.08)

    inner.current.rotation.z += delta * (reducedMotion ? 0.02 : 0.08)
    inner.current.rotation.x += delta * 0.04
  })

  return (
    <group ref={root}>
      <group ref={inner}>
        <mesh>
          <torusKnotGeometry args={[0.42, 0.11, 120, 16]} />
          <MeshDistortMaterial
            color="#2a2a2a"
            metalness={0.95}
            roughness={0.12}
            distort={reducedMotion ? 0 : 0.22}
            speed={1.4}
            wireframe
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.72, 0.012, 8, 64]} />
          <meshStandardMaterial color="#F5F4EF" metalness={0.8} roughness={0.2} wireframe />
        </mesh>
      </group>
    </group>
  )
}
