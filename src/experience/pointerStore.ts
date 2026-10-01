export const pointerStore = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
}

export function updatePointer(clientX: number, clientY: number): void {
  const x = (clientX / window.innerWidth) * 2 - 1
  const y = -(clientY / window.innerHeight) * 2 + 1
  pointerStore.vx = x - pointerStore.x
  pointerStore.vy = y - pointerStore.y
  pointerStore.x = x
  pointerStore.y = y
}
