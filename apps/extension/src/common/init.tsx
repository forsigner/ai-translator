import { Fomir } from 'fomir'
import FomirBoneUI from './fomir-bone-ui'
import { initFower } from './initFower'
import { initI18n } from './initI18n'
import { initStookGraphql } from './initStookGraphql'
import { initDeviceId } from './initDeviceId'

export function init() {
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
}
