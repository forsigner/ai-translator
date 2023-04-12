import { Box } from '@fower/react'
import { useTranslator } from '../pages/content/stores/translator.store'
import { IconChatLoading } from './IconChatLoading'
import { Header } from './Header'

export default function Translator() {
  const { x, y, visible, result, streaming } = useTranslator()

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

        {result && <Box>{result}</Box>}
      </Box>
    </Box>
  )
}
