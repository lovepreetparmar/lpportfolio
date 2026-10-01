import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import type { Group } from 'three'
import { lerp } from '@/lib/utils'
import { ParticleField } from '@/scenes/ParticleField/ParticleField'

type HeroSceneProps = {
  scrollProgress: number
  pointer: { x: number; y: number }
  reducedMotion: boolean
}

export function HeroScene({ scrollProgress, pointer, reducedMotion }: HeroSceneProps) {
  const group = useRef<Group>(null)
  const target = useRef({ x: 0, y: 0, z: 0 })

  useFrame(() => {
    if (!group.current) return
    const g = group.current

    if (!reducedMotion) {
      target.current.x = lerp(target.current.x, pointer.x * 0.45, 0.06)
      target.current.y = lerp(target.current.y, pointer.y * 0.25, 0.06)
      target.current.z = lerp(target.current.z, scrollProgress * 1.2, 0.08)
    }

    g.rotation.x = target.current.y
    g.rotation.y = target.current.x + scrollProgress * 0.8
    g.position.z = -target.current.z
  })

  return (
    <>
      <color attach="background" args={['#050505']} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 2]} intensity={1.2} />
      <directionalLight position={[-3, -2, -4]} intensity={0.35} color="#8888ff" />

      <ParticleField />

      <group ref={group}>
        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.35}>
          <mesh castShadow receiveShadow>
            <icosahedronGeometry args={[1.35, 1]} />
            <MeshDistortMaterial
              color="#0a0a0a"
              metalness={0.92}
              roughness={0.18}
              distort={reducedMotion ? 0 : 0.28}
              speed={1.5}
              wireframe
            />
          </mesh>
        </Float>
      </group>
    </>
  )
}
