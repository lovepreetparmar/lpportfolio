import { useState, type CSSProperties } from 'react'
import type { CharacterLayer } from './characterAssets'
import { CharacterPlaceholder } from './CharacterPlaceholder'
import type { CharacterExpression, CharacterPose } from './types'

type CharacterFrameProps = {
  layers: CharacterLayer[]
  expression: CharacterExpression
  pose: CharacterPose
  priority: 'high' | 'auto'
}

/**
 * Paints the resolved illustration layers, back to front.
 *
 * A layer that fails to load is dropped; when no layer is left an invisible
 * stand-in keeps the figure's box alive without drawing a placeholder.
 * Swapping in real artwork never changes the component API — it only fills
 * `characterAssets`.
 */
export function CharacterFrame({ layers, expression, pose, priority }: CharacterFrameProps) {
  const [broken, setBroken] = useState<ReadonlySet<string>>(() => new Set())
  const visible = layers.filter((layer) => !broken.has(layer.src))

  if (visible.length === 0) {
    return (
      <div className="character-art">
        <CharacterPlaceholder expression={expression} pose={pose} />
      </div>
    )
  }

  return (
    <div className="character-art">
      {visible.map((layer) => (
        <img
          key={layer.key}
          src={layer.src}
          alt=""
          aria-hidden="true"
          className="character-layer"
          style={{ '--layer-depth': String(layer.depth) } as CSSProperties}
          draggable={false}
          decoding="async"
          loading={priority === 'high' ? 'eager' : 'lazy'}
          fetchPriority={priority === 'high' ? 'high' : 'auto'}
          onError={() => setBroken((previous) => new Set(previous).add(layer.src))}
        />
      ))}
    </div>
  )
}
