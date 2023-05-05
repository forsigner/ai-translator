import { Box } from '@fower/react'
import { IconLogo } from '../../icons/IconLogo'
import { Button } from 'bone-ui'
import { useSettingsVisible } from '../../stores/settings.store'
import { HEADER_HEIGHT, isExtension } from '../../common'
import { useTranslation } from 'react-i18next'

interface Props {
  title?: string
}

export function SettingsHeader({ title }: Props) {
  const { t } = useTranslation('common')
  const { setVisible } = useSettingsVisible()
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
      {isExtension && (
        <Button
          size={28}
          roundedFull
          onClick={() => {
            setVisible(false)
          }}
        >
          {t('back')}
        </Button>
      )}
    </Box>
  )
}
