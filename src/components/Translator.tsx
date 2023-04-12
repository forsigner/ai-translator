import { Box } from '@fower/react'
import { useTranslator } from '../pages/content/stores/translator.store'
import { IconChatLoading } from './IconChatLoading'
import { Header } from './Header'
import { useMessage } from '@src/pages/content/stores/message.store'

export default function Translator() {
  const { x, y, visible } = useTranslator()
  const { content, streaming } = useMessage()

  console.log('visible:', visible, 'streaming:', streaming)

  if (!visible) return null

  return (
    <Box
      column
      absolute
      w-400
      minH-100
      p5
      shadowXL
      rounded
      // left={x - 100}
      left={x}
      top={y}
      cursorPointer
      border
      borderGray200
      bgWhite
    >
      <Header />
      <Box pt5>
        {streaming && (
          <Box toCenter>
            <IconChatLoading />
          </Box>
        )}

        {content && <Box>{content}</Box>}
      </Box>
    </Box>
  )
}
