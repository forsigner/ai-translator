import { lazy, Suspense } from 'react'
import { createRoot, Root } from 'react-dom/client'

export function renderIcon(container: any) {
  console.log('container....:', container)

  const root = createRoot(container)
  const MyComponent = lazy(() => import('./Icon'))

  root.render(
    <Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </Suspense>,
  )
}

// renderIcon()
