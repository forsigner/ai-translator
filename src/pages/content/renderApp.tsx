import { createRoot } from 'react-dom/client'
import { App } from './App'
import { init } from '@src/common/init'

export function renderApp() {
  init()

  const $container = document.createElement('div')
  document.body.append($container)
  const root = createRoot($container)

  root.render(<App />)
}
