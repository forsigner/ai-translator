import { Box } from '@fower/react'
import { useTranslator } from '../stores/translator.store'
import Translator from './Translator'

export default function TranslatorContainer() {
  const { x, y, visible } = useTranslator()

  if (!visible) return null

  return (
    <Translator
      absolute
      // left={x - 100}
      shadowXL
      roundedLG
      overflowHidden
      x={x}
      y={y}
    />
  )
}
