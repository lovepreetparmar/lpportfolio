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
      {/*
        The router mounts immediately so #root always contains the real,
        crawlable and assistive-technology-readable document. The loader is a
        visual overlay only — it never gates rendering.
      */}
      <RouterProvider router={router} />
      {ready ? null : <MonogramLoader onComplete={() => setReady(true)} />}
    </SmoothScroll>
  )
}
