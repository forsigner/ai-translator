import { createRoot } from 'react-dom/client'
import { App } from './App'

export function renderApp() {
  const $container = document.createElement('div')
  document.body.append($container)
  const root = createRoot($container)

  root.render(<App />)
}
