export type PlaygroundAct = 'hero' | 'work' | 'about' | 'experiments' | 'contact'

export const playgroundStore = {
  act: 'hero' as PlaygroundAct,
  actIndex: 1,
  activeProjectIndex: 0,
  scrollProgress: 0,
}

type ActListener = (act: PlaygroundAct, index: number) => void

const listeners = new Set<ActListener>()

export function setPlaygroundAct(act: PlaygroundAct, index: number): void {
  if (playgroundStore.act === act && playgroundStore.actIndex === index) return
  playgroundStore.act = act
  playgroundStore.actIndex = index
  listeners.forEach((fn) => fn(act, index))
}

export function subscribePlaygroundAct(listener: ActListener): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
