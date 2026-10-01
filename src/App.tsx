import { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { Seo } from '@/components/common/Seo'
import { CustomCursor } from '@/components/cursor/CustomCursor'
import { SmoothScroll } from '@/components/transitions/SmoothScroll'
import { MonogramLoader } from '@/components/UI/MonogramLoader'
import { router } from '@/router'

export default function App() {
  const [ready, setReady] = useState(false)

  return (
    <SmoothScroll>
      <Seo />
      <CustomCursor />
      {!ready ? <MonogramLoader onComplete={() => setReady(true)} /> : null}
      {ready ? <RouterProvider router={router} /> : null}
    </SmoothScroll>
  )
}
