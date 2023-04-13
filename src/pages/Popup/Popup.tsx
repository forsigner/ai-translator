import { Box } from '@fower/react'
import { Settings } from '@src/components/Settings'
import Translator from '@src/components/Translator'
import { useSettingsVisible } from '@src/stores/settings.store'

const Popup = () => {
  const { visible } = useSettingsVisible()
  return (
    <Box inlineFlex>
      {!visible && <Translator />}
      {visible && <Settings />}
    </Box>
  )
}

export default Popup
