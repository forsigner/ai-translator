import { createRoot } from 'react-dom/client'
import { App } from './App'
import { init } from '@langpt/shared'

export function renderApp() {
  init()

  const $container = document.createElement('div')
  document.body.append($container)
  const root = createRoot($container)

  root.render(<App />)
}
