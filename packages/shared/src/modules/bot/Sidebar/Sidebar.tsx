import { Box } from '@fower/react'
import { CogSolid } from '@bone-ui/icons'
import { useTranslation } from 'react-i18next'
import { useUser } from '../../../stores'
import { useMounted } from '../../../hooks/useMounted'
import { Logo } from '../../../components'
import { BotNav } from './BotNav'
import { SidebarItem } from './SidebarItem'
import { EasyModal } from '@ai-translator/easy-modal'
import { UserAvatarPopover } from '../../../components/UserAvatarPopover'
import { IconLogoLight } from '../../../icons/IconLogoLight'
import { DownloadBox } from './DownloadBox'
import { ModalSettings } from '../modals/ModalSettings'
import { Button } from 'bone-ui'

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
      borderRight-1
      borderGray200--T40
      borderGray800--dark--i
      // bg="#fafafa"
      bgSlate800--dark
    >
      <Box>
        <Box toCenterY columnGap-4 px4 mb4>
          <Box bgBrand500 square7 rounded2XL toCenter>
            <IconLogoLight
              size={24}
              black
              onClick={(e) => {
                e.stopPropagation()
              }}
            />
          </Box>

          <Box textLG fontBold columnGap-4 toCenterY>
            AI Translator
          </Box>
        </Box>

        <BotNav />
      </Box>
      <Box flex-1 column toBottom>
        <Box py2>
          <DownloadBox />

          <Box mx4 py4>
            <Button
              w-100p
              colorScheme="black"
              toBetween
              roundedFull
              onClick={() => {
                EasyModal.show(ModalSettings)
              }}
            >
              <Box toCenterY columnGap-4>
                <CogSolid size={20} />
                <Box fontMedium>Settings</Box>
              </Box>
              <Box textXS gray400>
                API Key
              </Box>
            </Button>
          </Box>

          {/* <UserAvatarPopover /> */}
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
