import { Box } from '@fower/react'
import { useTranslator } from '../translator.store'

export default function Translator() {
  const { x, y } = useTranslator()

  if (!x || !y) return null
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
      left={x + 60}
      top={y}
      cursorPointer
      border
      borderGray200
      bgWhite
    >
      <Box>gogo</Box>
    </Box>
  )
}
