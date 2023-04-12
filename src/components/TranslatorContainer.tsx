import { Box } from '@fower/react'
import { useTranslator } from '../pages/content/stores/translator.store'

export default function TranslatorContainer() {
  const { x, y, visible } = useTranslator()

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
      ...
    </Box>
  )
}
