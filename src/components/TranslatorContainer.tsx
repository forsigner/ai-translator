import { Box } from '@fower/react'
import { useTranslator } from '../stores/translator.store'
import Translator from './Translator'

export default function TranslatorContainer() {
  const { x, y, visible } = useTranslator()

  if (!visible) return null

  return (
    <Box
      column
      absolute
      // left={x - 100}
      shadowXL
      border
      rounded
      left={x}
      top={y}
    >
      <Translator />
    </Box>
  )
}
