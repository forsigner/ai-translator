import { Box } from '@fower/react'
import { ToastContainer } from 'bone-ui'
import { BotProvider, Settings, Translator } from '@ai-translator/shared'
import { ReactElement, useContext, useEffect, useRef } from 'react'

import './index.scss'
import '../assets/style/markdown.scss'
import { useSettingsVisible } from '@ai-translator/shared/src/stores/settings.store'

export default function App(): ReactElement {
  const { visible } = useSettingsVisible()
  return (
    <BotProvider>
      <ToastContainer></ToastContainer>
      <Box inlineFlex black bgWhite>
        {!visible && <Translator showSettings />}
        {visible && <Settings />}
      </Box>
    </BotProvider>
  )
}
