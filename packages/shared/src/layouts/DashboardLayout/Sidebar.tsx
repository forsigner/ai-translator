import { Box } from '@fower/react'
import { Divider, TranslateOutline, UserOutline, UsersOutline } from 'bone-ui'
import { ChipOutline } from '@bone-ui/icons'
import { useTranslation } from 'react-i18next'
import { SidebarItem } from './SidebarItem'
import { IconDocument } from '../../icons/IconDocument'
import { Logo } from '../../components/Logo'
import { IconTwitter } from '../../icons/IconTwitter'
import { IconTelegram } from '../../icons/IconTelegram'
import { useUser } from '../../stores'
import { useMounted } from '../../hooks/useMounted'
import { IconSubscription } from '../../icons/IconSubscription'
import { UserAvatarPopover } from './UserAvatarPopover'

export const Sidebar = () => {
  const { t } = useTranslation('common')
  const { user } = useUser()
  const { mounted } = useMounted()

  if (!mounted) return null

  return (
    <Box
      w-280
      h-100vh
      column
      toBetween
      display={['none', 'none', 'flex']}
      pt-20
      // bgGreen900--D25
      // bgGray100--D5
      // bgWhite
      // borderRight-1
      // borderGray200--T40
      // borderGray800--dark--i
      bg="#fafafa"
      bgSlate800--dark
    >
      <Box>
        <Box pl6 toCenterY spaceX2 pb8>
          <Logo></Logo>
          <Box text2XL fontBold>
            Langpt
          </Box>
        </Box>
      </Box>
      <Box flex-1 column>
        <Box>
          <Box column rowGap-1 textLG fontBold>
            <SidebarItem to="/dashboard/translation" icon={TranslateOutline}>
              My translation
            </SidebarItem>

            <SidebarItem to="/dashboard/billing" icon={IconSubscription}>
              Subscription
            </SidebarItem>

            <SidebarItem to="/dashboard/profile" icon={UserOutline}>
              Profile
            </SidebarItem>
          </Box>
        </Box>
      </Box>
      <Box px5 py4>
        <UserAvatarPopover />
      </Box>
    </Box>
  )
}
