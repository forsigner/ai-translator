import { useTranslation } from 'react-i18next'
import { EasyModal } from '@ai-translator/easy-modal'
import { Button, CogSolid } from 'bone-ui'
import { Box } from '@fower/react'
import { CHAT_WIDTH, NAV_HEIGHT } from '@ai-translator/chat'
import { LayoutType, useChat } from '@ai-translator/chat'
import { SettingsPopover } from './SettingsPopover'
import { LayoutSelect } from './LayoutSelect'
import { ChatSettings } from './ChatSettings'
import { ModalSettings } from '../modals/ModalSettings'
import { IconLogoLight } from '@ai-translator/widgets'

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
      <Box toCenterY columnGap-4 mb4>
        <Box bgBrand500 square6 roundedFull toCenter>
          <IconLogoLight
            size={20}
            black
            onClick={(e) => {
              e.stopPropagation()
            }}
          />
        </Box>

        <Box
          textXL
          fontBold
          columnGap-4
          toCenterY
          leadingNone
          style={{
            fontFamily: 'aclonica',
          }}
        >
          AI Translator
        </Box>
      </Box>
      <Box toCenterY columnGap-12>
        <LayoutSelect />

        <Button
          variant="light"
          roundedFull
          p1
          size="sm"
          icon={<CogSolid />}
          onClick={() => {
            EasyModal.show(ModalSettings)
          }}
        ></Button>
      </Box>
    </Box>
  )
}
