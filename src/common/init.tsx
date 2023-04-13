import { Fomir } from 'fomir'
import { devtools } from 'stook-devtools'
import FomirBoneUI from './fomir-bone-ui'
import { initFower } from './initFower'
import { initI18n } from './initI18n'

export function init() {
  initFower()
  initI18n()

  devtools.init()

  Fomir.use(FomirBoneUI)
}
