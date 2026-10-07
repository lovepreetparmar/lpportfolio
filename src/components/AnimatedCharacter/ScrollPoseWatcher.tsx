import { useScrollPose } from '@/hooks/useScrollPose'

/**
 * Mounts the scroll-pose watcher as a null-rendering component so it lives
 * inside both CharacterPoseProvider and the page DOM (needed for ScrollTrigger
 * to find section elements). Renders nothing.
 */
export function ScrollPoseWatcher() {
  useScrollPose()
  return null
}
