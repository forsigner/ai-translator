import { Box } from '@fower/react'
import { withTranslation } from 'react-i18next'
import { ToastContainer } from 'bone-ui'
import { ChatProvider } from '@ai-translator/chat'
import { Settings, init, initFomir } from '@ai-translator/widgets'

import './style.scss'

init()
initFomir()

function IndexPopup() {
  return (
    <ChatProvider clearMessagesWhenInitialized>
      <ToastContainer></ToastContainer>
      <Box inlineFlex black bgWhite>
        <Settings />
      </Box>
    </ChatProvider>
  )
}

export default withTranslation()(IndexPopup)
