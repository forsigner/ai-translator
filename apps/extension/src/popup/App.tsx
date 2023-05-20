import { Box } from '@fower/react'
import { withTranslation } from 'react-i18next'
import { ToastContainer } from 'bone-ui'
import { Settings, Translator, TranslatorLoading, useSession } from '@ai-translator/shared'
import { BotProvider } from '@ai-translator/bot'
import { ReactElement } from 'react'

import './index.scss'
import '../assets/style/markdown.scss'
import { useSettingsVisible } from '@ai-translator/shared/src/stores/settings.store'

function App(): ReactElement {
  const { visible } = useSettingsVisible()
  const { loading } = useSession()
  if (loading) return <TranslatorLoading />

  return (
    <BotProvider clearMessagesWhenInitialized>
      <ToastContainer></ToastContainer>
      <Box inlineFlex black bgWhite>
        {!visible && <Translator showSettings />}
        {visible && <Settings />}
      </Box>
    </BotProvider>
  )
}

export default withTranslation()(App)
