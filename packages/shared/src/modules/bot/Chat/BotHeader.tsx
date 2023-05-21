import { useTranslation } from 'react-i18next'
import { Box } from '@fower/react'
import { CHAT_WIDTH, NAV_HEIGHT, TOW_COLUMN_WIDTH } from '../../../common'
import { ChatSettings } from './ChatSettings'
import { LayoutType, useBot } from '@ai-translator/bot'
import { SettingsPopover } from './SettingsPopover'
import { LayoutSelect } from './LayoutSelect'

export const BotHeader = () => {
  const { bot } = useBot()
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
      w={['100%', '100%', bot.layout === LayoutType.Chat ? CHAT_WIDTH : '100%']}
    >
      <Box toCenterY columnGap-4>
        <Box textLG fontBold columnGap-4 toCenterY>
          {bot.name}
        </Box>
      </Box>
      <Box toCenterY columnGap-12 pr2>
        {/* <ChatSettings /> */}
        <LayoutSelect />
        <SettingsPopover />
      </Box>
    </Box>
  )
}
