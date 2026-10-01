import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { PointLight } from 'three'
import { lerp } from '@/lib/utils'
import { pointerStore } from '@/experience/pointerStore'

export function CursorLamp() {
  const light = useRef<PointLight>(null)
  const target = useRef({ x: 0, y: 0, z: 2.5 })

  useFrame(() => {
    if (!light.current) return
    target.current.x = lerp(target.current.x, pointerStore.x * 1.8, 0.1)
    target.current.y = lerp(target.current.y, pointerStore.y * 1.4, 0.1)
    light.current.position.set(target.current.x, target.current.y, target.current.z)
  })

  return (
    <pointLight
      ref={light}
      intensity={28}
      distance={14}
      decay={2}
      color="#F5F4EF"
      castShadow={false}
    />
  )
}
