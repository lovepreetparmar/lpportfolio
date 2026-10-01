export type SlabChrome = 'none' | 'notch' | 'browserBar' | 'windowBar' | 'terminalBar' | 'mail'

export interface SlabState {
  width: number
  height: number
  depth: number
  cornerRadius: number
  bezel: number
  rotation: [number, number, number]
  position: [number, number, number]
  chrome: SlabChrome
  accent: string
  screenTextureUrl?: string
}

export type SlabPresetId =
  | 'hero'
  | 'fitguide'
  | 'ai-studio'
  | 'lpsynch'
  | 'hr-browser'
  | 'rego-kernel'
  | 'contact'
