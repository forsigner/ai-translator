import { Box } from '@fower/react'
import { useTranslation } from 'react-i18next'
import { Button } from 'bone-ui'
import { IconAndroid } from '../../icons/IconAndroid'

export const DownloadAndroidButton = () => {
  const { t } = useTranslation('common')
  return (
    <Button
      size="sm"
      flex-1
      colorScheme="white"
      roundedFull
      // textLG
      leftIcon={<IconAndroid fillGreen500 size={20} />}
    >
      <Box>Android</Box>
    </Button>
  )
}
