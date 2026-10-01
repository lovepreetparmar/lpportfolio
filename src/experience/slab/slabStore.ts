import { SLAB_PRESETS } from './presets'
import type { SlabState } from './types'

function cloneState(state: SlabState): SlabState {
  return {
    ...state,
    rotation: [...state.rotation] as [number, number, number],
    position: [...state.position] as [number, number, number],
  }
}

export const slabStore: SlabState = cloneState(SLAB_PRESETS.hero)

export function resetSlabToHero(): void {
  Object.assign(slabStore, cloneState(SLAB_PRESETS.hero))
}
