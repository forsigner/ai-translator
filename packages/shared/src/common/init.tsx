import { Fomir } from 'fomir'
import FomirBoneUI from './fomir-bone-ui'
import { initFower } from './initFower'
import { initI18n } from './initI18n'
import { initStookGraphql } from './initStookGraphql'
import { initSettingsStorage } from './initSettingsStorage'
import { RegionChecker } from '../services/RegionChecker'
import { isExtension } from './constants'

export function init() {
  initSettingsStorage()
  initFower()
  initI18n()
  initStookGraphql()

  Fomir.use(FomirBoneUI)

  if (isExtension) {
    chrome.storage.onChanged.addListener((changes, namespace) => {
      // for (key in changes) {
      //   var storageChange = changes[key]
      //   console.log(
      //     key,
      //     namespace,
      //     storageChange.oldValue,
      //     storageChange.newValue,
      //   )
      // }
    })
  }

  async function run() {
    const regionChecker = await RegionChecker.fromStorage()

    // console.log('init regionChecker.isSupported:', regionChecker.isSupported)

    if (regionChecker.shouldCheck) {
      await regionChecker.fetchLocation()
    }
  }

  run()
}
