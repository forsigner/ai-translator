import { PlusOutline } from 'bone-ui'
import { Box } from '@fower/react'
import { useTranslation } from 'react-i18next'
import { BotList } from './BotList'
import { SidebarItem } from './SidebarItem'
import { EasyModal } from '@ai-translator/easy-modal'

export function BotNav() {
  const { t } = useTranslation('common')
  return (
    <Box column rowGap-1>
      <BotList />
    </Box>
  )
}
