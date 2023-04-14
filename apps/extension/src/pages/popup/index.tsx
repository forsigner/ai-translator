import { createRoot } from 'react-dom/client'
import '@pages/popup/index.scss'
import Popup from '@pages/popup/Popup'
import refreshOnUpdate from 'virtual:reload-on-update-in-view'
import { init } from '@src/common/init'
import { storageService } from '@src/services/storage.service'

refreshOnUpdate('pages/popup')

window.onload = async () => {
  const settings = await storageService.getSettings()
  document.documentElement.classList.add(settings?.theme || 'light')
}

function main() {
  const appContainer = document.querySelector('#app-container')
  if (!appContainer) {
    throw new Error('Can not find #app-container')
  }
  const root = createRoot(appContainer)
  root.render(<Popup />)
  init()
}

main()
