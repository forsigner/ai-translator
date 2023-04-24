import { Box } from '@fower/react'
import { ToastContainer } from 'bone-ui'
import { BotProvider, Settings, Translator, TranslatorLoading, useSession } from '@langpt/shared'
import { ReactElement } from 'react'

import './index.scss'
import '../assets/style/markdown.scss'
import { useSettingsVisible } from '@langpt/shared/src/stores/settings.store'

export default function App(): ReactElement {
  const { visible } = useSettingsVisible()
  const { loading } = useSession()
  if (loading) return <TranslatorLoading />

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
