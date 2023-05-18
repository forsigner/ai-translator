import { Box } from '@fower/react'
import { CogSolid } from '@bone-ui/icons'
import { useTranslation } from 'react-i18next'
import { useUser } from '../../../stores'
import { useMounted } from '../../../hooks/useMounted'
import { Logo } from '../../../components'
import { BotNav } from './BotNav'
import { SidebarItem } from './SidebarItem'
import { EasyModal } from '@ai-translator/easy-modal'
import { ModalSettings } from '../modals/ModalSettings'
import { UserAvatarPopover } from '../../../components/UserAvatarPopover'

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
      flexShrink-0
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
        <Box pl6 toCenterY spaceX1 pb4>
          <Logo />
        </Box>
        <BotNav />
      </Box>
      <Box flex-1 column toBottom>
        <Box py2>
          <SidebarItem
            icon={CogSolid}
            onClick={() => {
              EasyModal.show(ModalSettings)
            }}
          >
            Settings
          </SidebarItem>

          <UserAvatarPopover />
        </Box>

        {/* <Box w-100p p4>
          <Box toBetween toCenterY spaceX2>
            <DownloadIOSButton />
            <DownloadAndroidButton />
          </Box>
        </Box> */}
      </Box>
    </Box>
  )
}
