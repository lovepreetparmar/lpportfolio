import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { getDevicePixelRatioCap } from '@/lib/performance'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useWebGL } from '@/hooks/useWebGL'
import { usePointerTracking } from '@/hooks/usePointer'
import { CursorLamp } from './CursorLamp'
import { HeroObject } from '@/experience/HeroObject/HeroObject'

export function GlobalCanvas() {
  const webgl = useWebGL()
  const reducedMotion = useReducedMotion()
  usePointerTracking()

  if (!webgl) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[6] h-full w-full" aria-hidden="true">
      <Canvas
        className="!h-full !w-full"
        dpr={getDevicePixelRatioCap(reducedMotion ? 1 : 1.35)}
        camera={{ position: [0, 0, 3.25], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
        }}
      >
        <ambientLight intensity={0.22} />
        <directionalLight position={[2.5, 3, 4]} intensity={0.35} color="#F5F4EF" />
        <directionalLight position={[-4, -1, -3]} intensity={0.55} color="#9eb4ff" />
        <CursorLamp />
        <Suspense fallback={null}>
          <Environment preset="studio" environmentIntensity={0.85} />
          <group position={[1.35, 0.05, 0]} scale={0.85}>
            <HeroObject />
          </group>
        </Suspense>
      </Canvas>
    </div>
  )
}
