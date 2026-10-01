import { BootScene } from '@/scenes/BootScene/BootScene'
import { IdentityScene } from '@/scenes/IdentityScene/IdentityScene'
import { DeveloperScene } from '@/scenes/DeveloperScene/DeveloperScene'
import { CodeScene } from '@/scenes/CodeScene/CodeScene'
import { WorkScene } from '@/scenes/WorkScene/WorkScene'
import { AIScene } from '@/scenes/AIScene/AIScene'
import { JourneyScene } from '@/scenes/JourneyScene/JourneyScene'
import { ContactScene } from '@/scenes/ContactScene/ContactScene'
import { ParticleField } from '@/scenes/ParticleField/ParticleField'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'
import { experienceState } from './experienceState'
import { lerp } from '@/lib/utils'

export function SceneManager() {
  const rig = useRef<Group>(null)

  useFrame(() => {
    if (!rig.current) return
    const chapter = experienceState.chapter
    const p = experienceState.chapterProgress

    const z =
      chapter === 'identity'
        ? -p * 1.5
        : chapter === 'developer'
          ? -1.5 - p * 1.2
          : chapter === 'system'
            ? -2.8 - p
            : chapter === 'work'
              ? -4 - p * 1.5
              : chapter === 'ai'
                ? -5.8 - p
                : chapter === 'journey'
                  ? -7 - p * 2
                  : chapter === 'contact'
                    ? -9 + p * 2
                    : 0

    rig.current.position.z = lerp(rig.current.position.z, z, 0.08)
    rig.current.rotation.y = lerp(rig.current.rotation.y, experienceState.pointer.x * 0.08, 0.05)
  })

  return (
    <>
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 4, 14]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 2]} intensity={1.1} />
      <directionalLight position={[-4, -2, -3]} intensity={0.25} color="#8888ff" />

      <group ref={rig}>
        <ParticleField />
        <BootScene />
        <IdentityScene />
        <DeveloperScene />
        <CodeScene />
        <WorkScene />
        <AIScene />
        <JourneyScene />
        <ContactScene />
      </group>
    </>
  )
}
