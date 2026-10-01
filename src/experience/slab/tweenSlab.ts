import gsap from 'gsap'
import { SLAB_PRESETS } from './presets'
import { slabStore } from './slabStore'
import type { SlabPresetId, SlabState } from './types'

type SlabTweenProxy = {
  width: number
  height: number
  depth: number
  cornerRadius: number
  bezel: number
  rotX: number
  rotY: number
  rotZ: number
  posX: number
  posY: number
  posZ: number
}

function toProxy(): SlabTweenProxy {
  return {
    width: slabStore.width,
    height: slabStore.height,
    depth: slabStore.depth,
    cornerRadius: slabStore.cornerRadius,
    bezel: slabStore.bezel,
    rotX: slabStore.rotation[0],
    rotY: slabStore.rotation[1],
    rotZ: slabStore.rotation[2],
    posX: slabStore.position[0],
    posY: slabStore.position[1],
    posZ: slabStore.position[2],
  }
}

function applyProxy(proxy: SlabTweenProxy, chrome?: SlabState['chrome'], accent?: string): void {
  slabStore.width = proxy.width
  slabStore.height = proxy.height
  slabStore.depth = proxy.depth
  slabStore.cornerRadius = proxy.cornerRadius
  slabStore.bezel = proxy.bezel
  slabStore.rotation = [proxy.rotX, proxy.rotY, proxy.rotZ]
  slabStore.position = [proxy.posX, proxy.posY, proxy.posZ]
  if (chrome) slabStore.chrome = chrome
  if (accent) slabStore.accent = accent
}

export function tweenSlabToPreset(
  preset: SlabPresetId,
  options?: { duration?: number; ease?: string },
): gsap.core.Tween {
  return tweenSlab(SLAB_PRESETS[preset], options)
}

export function tweenSlab(
  target: Partial<SlabState>,
  options?: { duration?: number; ease?: string },
): gsap.core.Tween {
  const proxy = toProxy()
  const duration = options?.duration ?? 1.1
  const ease = options?.ease ?? 'power3.inOut'

  const vars: gsap.TweenVars = {
    duration,
    ease,
    overwrite: true,
    onUpdate: () => applyProxy(proxy, target.chrome, target.accent),
  }

  if (target.width !== undefined) vars.width = target.width
  if (target.height !== undefined) vars.height = target.height
  if (target.depth !== undefined) vars.depth = target.depth
  if (target.cornerRadius !== undefined) vars.cornerRadius = target.cornerRadius
  if (target.bezel !== undefined) vars.bezel = target.bezel
  if (target.rotation) {
    vars.rotX = target.rotation[0]
    vars.rotY = target.rotation[1]
    vars.rotZ = target.rotation[2]
  }
  if (target.position) {
    vars.posX = target.position[0]
    vars.posY = target.position[1]
    vars.posZ = target.position[2]
  }

  if (target.chrome) slabStore.chrome = target.chrome
  if (target.accent) slabStore.accent = target.accent
  if (target.screenTextureUrl) slabStore.screenTextureUrl = target.screenTextureUrl

  return gsap.to(proxy, vars)
}
