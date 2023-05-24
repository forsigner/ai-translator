import { useTranslation } from 'react-i18next'
import { Box } from '@fower/react'
import { CHAT_WIDTH, NAV_HEIGHT } from '@ai-translator/chat'
import { LayoutType, useChat } from '@ai-translator/chat'
import { SettingsPopover } from './SettingsPopover'
import { LayoutSelect } from './LayoutSelect'

export const BotHeader = () => {
  const { chat } = useChat()
  const { t } = useTranslation('common')

  return (
    <Box
      h={NAV_HEIGHT}
      // borderBottom
      // borderBottomGray100
      // borderBottomGray800--dark
      py4
      toCenterY
      columnGap-4
      toBetween
      mx-auto
      px={[12, 12, 0]}
      w={['100%', '100%', chat.layout === LayoutType.Chat ? CHAT_WIDTH : '100%']}
    >
      <Box toCenterY columnGap-4>
        <Box textLG fontBold columnGap-4 toCenterY>
          {chat.name}
        </Box>
      </Box>
      <Box toCenterY columnGap-12 pr2>
        {/* <ChatSettings /> */}
        <LayoutSelect />
      </Box>
    </Box>
  )
}
