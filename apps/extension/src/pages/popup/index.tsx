import { createRoot } from 'react-dom/client'
import '@pages/popup/index.scss'
import Popup from '@pages/popup/Popup'
import refreshOnUpdate from 'virtual:reload-on-update-in-view'
import { init } from '@src/common/init'
import { storage } from '@src/services/storage'

refreshOnUpdate('pages/popup')

window.onload = async () => {
  const settings = await storage.getSettings()
  document.documentElement.classList.add(settings?.theme || 'light')
}

async function main() {
  const appContainer = document.querySelector('#app-container')
  if (!appContainer) {
    throw new Error('Can not find #app-container')
  }
  const root = createRoot(appContainer)
  root.render(<Popup />)
  init()

  // const res = await fetch('http://localhost:4000/api/auth/session')
  // const json = await res.json()
  // console.log('json....:', json)
}

main()
