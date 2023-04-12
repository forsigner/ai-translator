import { Box } from '@fower/react'
import { Portal } from '@bone-ui/portal'
import Thumbnail from './Thumbnail'
import Translator from './Translator'

export function App() {
  return (
    <Box id="ai-translator-content" bgAmber300>
      <Portal>
        <Thumbnail />
        <Translator />
      </Portal>
    </Box>
  )
}
