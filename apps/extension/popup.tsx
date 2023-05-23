import { Box } from '@fower/react'
import { withTranslation } from 'react-i18next'
import { ToastContainer } from 'bone-ui'
import { ChatProvider } from '@ai-translator/chat'
import { Settings, init, initFomir, useSettingsVisible } from '@ai-translator/widgets'
import { Translator } from './components/Translator'

// import '../assets/style/markdown.scss'
import './style.scss'

init()
initFomir()

function IndexPopup() {
  const { visible } = useSettingsVisible()
  // const { loading } = useSession()
  // if (loading) return <TranslatorLoading />

  return (
    <ChatProvider clearMessagesWhenInitialized>
      <ToastContainer></ToastContainer>
      <Box inlineFlex black bgWhite>
        {!visible && <Translator showSettings />}
        {visible && <Settings />}
      </Box>
    </ChatProvider>
  )
}

export default withTranslation()(IndexPopup)
