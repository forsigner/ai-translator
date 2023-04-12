import { Box } from '@fower/react'
import { hideThumbnail, useThumbnail } from '../pages/content/stores/thumbnail.store'
import { showTranslator } from '../pages/content/stores/translator.store'
import { useSendMessage } from '../pages/content/useSendMessage'
import { useSelection } from '../pages/content/stores/selection.store'
import Logo from './Logo'

export default function Thumbnail() {
  const { x, y, visible } = useThumbnail()
  const sendMessage = useSendMessage()
  const { text } = useSelection()

  console.log('visible:', visible)

  if (!visible) return null
  return (
    <Box
      cursorPointer
      inlineFlex
      borderGray200
      shadowXL
      border
      rounded
      absolute
      left={x + 60}
      top={y}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        hideThumbnail()
        showTranslator(x, y)
        console.log('text:', text)
        setTimeout(async () => {
          sendMessage(text)
        }, 0)
      }}
    >
      <Logo />
    </Box>
  )
}
