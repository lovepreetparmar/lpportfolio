import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import type { Group } from 'three'
import { lerp } from '@/lib/utils'
import { pointerStore } from '@/experience/pointerStore'
import { slabStore } from './slabStore'

const BASE = { w: 0.55, h: 0.72, d: 0.06, r: 0.06 }
const read = { ...BASE }

export function Slab() {
  const root = useRef<Group>(null)

  useFrame(() => {
    if (!root.current) return

    read.w = lerp(read.w, slabStore.width, 0.12)
    read.h = lerp(read.h, slabStore.height, 0.12)
    read.d = lerp(read.d, slabStore.depth, 0.12)
    read.r = lerp(read.r, slabStore.cornerRadius, 0.12)

    root.current.position.set(0, 0, 0)
    root.current.rotation.set(
      slabStore.rotation[0] + pointerStore.y * 0.06,
      slabStore.rotation[1] + pointerStore.x * 0.08,
      slabStore.rotation[2],
    )
    root.current.scale.set(read.w / BASE.w, read.h / BASE.h, read.d / BASE.d)
  })

  return (
    <group ref={root}>
      <RoundedBox args={[BASE.w, BASE.h, BASE.d]} radius={BASE.r} smoothness={4}>
        <meshPhysicalMaterial
          color="#3a3a3a"
          metalness={0.92}
          roughness={0.18}
          envMapIntensity={1.2}
          clearcoat={0.35}
          clearcoatRoughness={0.2}
        />
      </RoundedBox>
      <mesh position={[0, 0, BASE.d / 2 + 0.002]}>
        <planeGeometry args={[BASE.w * 0.86, BASE.h * 0.86]} />
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0}
          roughness={0.02}
          transmission={0.97}
          thickness={0.35}
          transparent
          opacity={0.22}
          envMapIntensity={0.6}
        />
      </mesh>
    </group>
  )
}
