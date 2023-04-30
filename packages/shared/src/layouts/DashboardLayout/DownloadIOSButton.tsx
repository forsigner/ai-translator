import { Box } from '@fower/react'
import { useTranslation } from 'react-i18next'
import { Button } from 'bone-ui'
import { IconIOS } from '../../icons/IconIOS'

export const DownloadIOSButton = () => {
  const { t } = useTranslation('common')
  return (
    <Button
      size="sm"
      flex-1
      colorScheme="white"
      roundedFull
      // textLG
      leftIcon={<IconIOS fillBlack fillWhite--dark size={20} />}
    >
      iOS
    </Button>
  )
}
