export type CharacterState =
  | 'idle'
  | 'looking'
  | 'happy'
  | 'curious'
  | 'thinking'
  | 'excited'
  | 'working'

export type CharacterExpression = 'neutral' | 'happy' | 'curious' | 'thinking' | 'excited'

export type AnimatedCharacterProps = {
  state?: CharacterState
  followCursor?: boolean
  expression?: CharacterExpression
  className?: string
}
