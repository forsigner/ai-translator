import { useTranslation } from 'react-i18next'
import { Box } from '@fower/react'
import { CHAT_WIDTH, NAV_HEIGHT } from '../../../common'
import { ChatSettings } from './ChatSettings'
import { useBot } from '@ai-translator/bot'
import { MenuAlt1Outline, MenuAlt1Solid } from '@bone-ui/icons'
import { IconLogoLight } from '../../../icons/IconLogoLight'
import { TranslatorLangSelect } from '../../../components/TranslatorLangSelect'
import { SettingsPopover } from './SettingsPopover'

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
      w={['100%', '100%', CHAT_WIDTH]}
    >
      <Box toCenterY columnGap-4>
        {/* <MenuAlt1Solid /> */}

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
          {bot.name}
        </Box>
      </Box>
      <Box toCenterY columnGap-12 pr2>
        {/* <ChatSettings /> */}
        <TranslatorLangSelect containerHeight="60vh" />
        <SettingsPopover />
      </Box>
    </Box>
  )
}
