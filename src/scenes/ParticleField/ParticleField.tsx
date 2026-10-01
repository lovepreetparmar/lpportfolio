import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Points } from 'three'
import { getParticleTier } from '@/lib/performance'

type ParticleFieldProps = {
  count?: number
}

export function ParticleField({ count }: ParticleFieldProps) {
  const ref = useRef<Points>(null)
  const tier = getParticleTier()
  const total = count ?? (tier === 'high' ? 420 : tier === 'medium' ? 240 : 120)

  const positions = useMemo(() => {
    const arr = new Float32Array(total * 3)
    for (let i = 0; i < total; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * 14
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return arr
  }, [total])

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.02
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.35} sizeAttenuation />
    </points>
  )
}
