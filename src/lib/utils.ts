export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

export function lerp(start: number, end: number, amount: number): number {
  return start + (end - start) * amount
}
