import { PlusOutline } from 'bone-ui'
import { Box } from '@fower/react'
import { useTranslation } from 'react-i18next'
import { BotList } from './BotList'
import { SidebarItem } from './SidebarItem'
import { EasyModal } from '@ai-translator/easy-modal'
import { ModalBot } from '../modals/ModalBot'

export function BotNav() {
  const { t } = useTranslation('common')
  return (
    <Box column rowGap-1>
      <Box toBetween toCenterY mr-2 gray500 px5 pb2>
        <Box textSM>My bots</Box>
      </Box>

      <BotList />

      <SidebarItem
        icon={PlusOutline}
        mt-1
        onClick={() => {
          EasyModal.show(ModalBot)
        }}
      >
        <Box>Create Bot</Box>
      </SidebarItem>
    </Box>
  )
}
