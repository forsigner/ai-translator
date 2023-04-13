import { Box } from '@fower/react'
import { ToastContainer } from 'bone-ui'
import { Settings } from '@src/components/Settings'
import Translator from '@src/components/Translator'
import { useSettings, useSettingsVisible } from '@src/stores/settings.store'

const Popup = () => {
  const { visible } = useSettingsVisible()

  return (
    <>
      <ToastContainer></ToastContainer>
      <Box inlineFlex black bgWhite>
        {!visible && <Translator />}
        {visible && <Settings />}
      </Box>
    </>
  )
}

export default Popup
