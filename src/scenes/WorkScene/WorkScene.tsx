import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { experienceState } from '@/experience/experienceState'

export function WorkScene() {
  const root = useRef<Group>(null)
  const phone = useRef<Group>(null)
  const browser = useRef<Group>(null)

  useFrame(() => {
    if (!root.current) return
    const active = experienceState.chapter === 'work'
    root.current.visible = active
    if (!active || !phone.current || !browser.current) return
    const t = experienceState.chapterProgress
    phone.current.rotation.y = t * 1.2
    browser.current.rotation.y = -t * 0.8
  })

  return (
    <group ref={root}>
      <group ref={phone} position={[-1.2, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.45, 0.9, 0.08]} />
          <meshStandardMaterial color="#d8d2c8" metalness={0.4} roughness={0.35} />
        </mesh>
      </group>
      <group ref={browser} position={[1.1, 0.05, -0.2]}>
        <mesh>
          <boxGeometry args={[1.4, 0.9, 0.06]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.3} />
        </mesh>
      </group>
    </group>
  )
}
