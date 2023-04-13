import { Fomir } from 'fomir'
import FomirBoneUI from './fomir-bone-ui'
import { initFower } from './initFower'
import { initI18n } from './initI18n'

export function init() {
  initFower()
  initI18n()

  Fomir.use(FomirBoneUI)
}
