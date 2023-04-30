import { Box } from '@fower/react'
import { useRouter } from 'next/router'
import { Button } from 'bone-ui'
import { BadgeCheckSolid, ExternalLinkOutline } from '@bone-ui/icons'
import { ModeToggle } from '../../components/ModeToggle'
import { UserAvatarPopover } from '../../components/UserAvatarPopover'
import { StyledLink } from '../../components/StyledLink'
import { Paths } from '../../common/constants'
import { useTranslation } from 'react-i18next'

export const NavPC = () => {
  const { pathname } = useRouter()
  const { t } = useTranslation('common')

  const maps = {
    [Paths.BILLING]: t('billing'),
    [Paths.PROFILE]: t('profile'),
    [Paths.TRANSLATION]: t('translation'),
  } as Record<string, string>

  return (
    <Box h-72 display={['none', 'none', 'flex']} sticky top0>
      <Box toBetween w-100p pl8 pr4>
        <Box spaceX3 toCenterY>
          {maps[pathname] && (
            <Box textXL fontBold toCenterY flexShrink-0>
              {maps[pathname]}
            </Box>
          )}
        </Box>

        <Box px2 toBetween toCenterY columnGap-12>
          <StyledLink href="/dashboard/billing">
            <Button size="sm" roundedFull spaceX1>
              <Box>{t('upgrade')}</Box>
              <BadgeCheckSolid size={18} />
            </Button>
          </StyledLink>

          <UserAvatarPopover />
          <ModeToggle />
        </Box>
      </Box>
    </Box>
  )
}
