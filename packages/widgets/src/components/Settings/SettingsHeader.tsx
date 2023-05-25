import React from 'react'
import { Box } from '@fower/react'
import { IconLogo } from '../../icons/IconLogo'
import { Button } from 'bone-ui'
import { useTranslation } from 'react-i18next'
import { HEADER_HEIGHT, isExtension } from '@ai-translator/chat'

interface Props {
  title?: string
}

export function SettingsHeader({ title }: Props) {
  const { t } = useTranslation('common')
  return (
    <Box
      toCenterY
      toBetween
      px4
      h={HEADER_HEIGHT}
      borderBottom
      borderBottomGray100
      borderBottomGray800--dark
    >
      <Box toCenterY columnGap-8>
        <IconLogo size={28} />
        <Box toCenterY fontSemibold textBase spaceX2>
          {title ? (
            title
          ) : (
            <>
              <Box>AI Translator</Box>
              <Box brand500>for Chrome</Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  )
}
