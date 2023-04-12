import { Box } from '@fower/react'
import { hideThumbnail, useThumbnail } from '../stores/thumbnail.store'
import TranslateSolid from './TranslateSolid'
import { showTranslator } from '../stores/translator.store'
import { useSendMessage } from '../useSendMessage'
import { useSelection } from '../stores/selection.store'

export default function Thumbnail() {
  const { x, y, visible } = useThumbnail()
  const sendMessage = useSendMessage()
  const { text } = useSelection()

  console.log('--- x, y, visible :', x, y, visible)

  if (!visible) return null
  return (
    <Box
      toCenter
      inlineFlex
      absolute
      right0
      top0
      square7
      shadowXL
      rounded
      left={x + 60}
      top={y}
      cursorPointer
      border
      borderGray200
      bgWhite
      onClick={(e) => {
        e.stopPropagation()
        hideThumbnail()
        showTranslator(x, y)
        console.log('text:', text)
        setTimeout(() => {
          sendMessage(text)
        }, 0)
      }}
    >
      <TranslateSolid size={20} gray600 />
    </Box>
  )
}
