import { Box } from '@fower/react'
import { hideThumbnail, useThumbnail } from '../stores/thumbnail.store'
import { showTranslator } from '../stores/translator.store'
import { useSendMessage } from '../hooks/useSendMessage'
import { useSelection } from '../stores/selection.store'
import { IconLogo } from './IconLogo'

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
      <IconLogo></IconLogo>
    </Box>
  )
}
