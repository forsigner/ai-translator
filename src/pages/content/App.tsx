import { Box } from '@fower/react'
import { Portal } from '@bone-ui/portal'
import Thumbnail from '../../components/Thumbnail'
import TranslatorContainer from '@src/components/TranslatorContainer'

export function App() {
  return (
    <Box id="ai-translator-content" bgAmber300>
      <Portal>
        <Thumbnail />
        <TranslatorContainer />
      </Portal>
    </Box>
  )
}
