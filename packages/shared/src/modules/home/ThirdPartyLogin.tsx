import { Button } from 'bone-ui'
import { Box } from '@fower/react'
import { useTranslation } from 'react-i18next'
import { IconGoogle } from '@ai-translator/widgets'
import { githubAuthUrl, googleAuthUrl, isProd } from '@ai-translator/chat'

export function ThirdPartyLogin() {
  const { t } = useTranslation('common')

  return (
    <Button
      as="a"
      href={googleAuthUrl}
      border-2
      variant="outline"
      colorScheme="black"
      size="lg"
      // gray800--dark--i
      gray800--dark--i--hover
      leftIcon={<IconGoogle mr2--i />}
    >
      <Box>{t('login-with-google')}</Box>
    </Button>
  )
}
