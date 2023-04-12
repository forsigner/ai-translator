import { Box } from '@fower/react'
import { useTranslator } from '../stores/translator.store'
import { IconChatLoading } from './IconChatLoading'

export default function Translator() {
  const { x, y, visible, result, streaming } = useTranslator()

  console.log('visible:', visible, 'streaming:', streaming)

  if (!visible) return null

  return (
    <Box
      toCenter
      inlineFlex
      absolute
      right0
      top0
      w-400
      h-100
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
      <Box>Header</Box>
      <Box>
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
