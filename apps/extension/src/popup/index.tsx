import { createRoot } from 'react-dom/client'
import App from './App'
import { init } from '@langpt/shared'

console.log('-----:', process.env.API_HOST, process.env.NEXT_PUBLIC_API_BASE_URL)

declare global {
  interface Window {
    windowLoaded: boolean
  }
}

window.addEventListener(
  'load',
  async () => {
    window.windowLoaded = true
  },
  {
    once: true,
  },
)

const renderApp = (data?: any) => {
  const container = document.getElementById('__next')
  const root = createRoot(container) // createRoot(container!) if you use TypeScript
  root.render(<App />)
  init()
}

renderApp()
