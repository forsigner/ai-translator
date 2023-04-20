import { Box } from '@fower/react'
import { ToastContainer } from 'bone-ui'
import { Settings } from '@src/components/Settings'
import { Translator } from '@src/components/Translator'
import { useSettingsVisible } from '@src/stores/settings.store'
import { BotProvider } from '@src/bot'

const Popup = () => {
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

export default Popup
