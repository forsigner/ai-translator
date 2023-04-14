import { Fomir } from 'fomir'
import FomirBoneUI from './fomir-bone-ui'
import { initFower } from './initFower'
import { initI18n } from './initI18n'
import { initStookGraphql } from './initStookGraphql'
import { initDeviceId } from './initDeviceId'
import { initSettingsStorage } from './initSettingsStorage'
import { RegionChecker } from '@src/services/RegionChecker'

export function init() {
  initSettingsStorage()
  initDeviceId()
  initFower()
  initI18n()
  initStookGraphql()

  Fomir.use(FomirBoneUI)

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

  async function run() {
    const regionChecker = await RegionChecker.fromStorage()

    if (regionChecker.shouldCheck) {
      await regionChecker.fetchLocation()
    }
  }

  run()
}
