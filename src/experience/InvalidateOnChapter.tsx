import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { subscribeChapter } from './experienceState'

export function InvalidateOnChapter() {
  const invalidate = useThree((state) => state.invalidate)

  useEffect(() => {
    return subscribeChapter(() => invalidate())
  }, [invalidate])

  return null
}
