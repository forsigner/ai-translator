import { RegionChecker } from '@ai-translator/chat'
import { initFower } from './initFower'
import { initI18n } from './initI18n'
import { initStookGraphql } from './initStookGraphql'
import { initSettingsStorage } from './initSettingsStorage'

export function init() {
  initSettingsStorage()
  initFower()
  initI18n()
  initStookGraphql()

  async function run() {
    const regionChecker = await RegionChecker.fromStorage()

    if (regionChecker.shouldCheck) {
      await regionChecker.fetchLocation()
    }
  }

  run()
}
