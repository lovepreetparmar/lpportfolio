import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group, Points } from 'three'
import { experienceState } from '@/experience/experienceState'
import { getParticleTier } from '@/lib/performance'

export function AIScene() {
  const root = useRef<Group>(null)
  const points = useRef<Points>(null)
  const tier = getParticleTier()
  const count = tier === 'high' ? 180 : tier === 'medium' ? 110 : 60

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * 8
      arr[i * 3 + 1] = (Math.random() - 0.5) * 5
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5
    }
    return arr
  }, [count])

  useFrame((_, delta) => {
    if (!root.current || !points.current) return
    const active = experienceState.chapter === 'ai'
    root.current.visible = active
    if (!active) return
    points.current.rotation.y += delta * 0.08
    points.current.rotation.x = experienceState.pointer.y * 0.08
  })

  return (
    <group ref={root}>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.03} color="#9aa7ff" transparent opacity={0.55} />
      </points>
    </group>
  )
}
