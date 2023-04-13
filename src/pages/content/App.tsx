import { Box } from '@fower/react'
import { ToastContainer } from 'bone-ui'
import { Portal } from '@bone-ui/portal'
import Thumbnail from '../../components/Thumbnail'
import TranslatorContainer from '@src/components/TranslatorContainer'

export function App() {
  return (
    <>
      <ToastContainer></ToastContainer>
      <Box id="ai-translator-content">
        <Portal>
          <Thumbnail />
          <TranslatorContainer />
        </Portal>
      </Box>
    </>
  )
}
