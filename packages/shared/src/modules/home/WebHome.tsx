import { Box } from '@fower/react'
import { ThirdPartyLogin } from './ThirdPartyLogin'
import { useTranslation } from 'react-i18next'
import { TranslatorEditor } from '../translator/TranslatorEditor'

export function WebHome() {
  const { t } = useTranslation('home')

  return (
    <Box toCenter column mb-80 minH-70vh>
      <Box text4XL fontBold pb3>
        AI Translator
      </Box>
      <TranslatorEditor />

      {/* <ThirdPartyLogin /> */}
    </Box>
  )
}
