import { Box } from '@fower/react'
import { IconLogoLight } from '@ai-translator/widgets'
import { motion, MotionValue } from 'framer-motion'
import { styled } from '@fower/styled'
import { HEADER_HEIGHT } from '../common/constants'
import { SettingsButton } from './SettingsButton'
import { CodeFromTo } from './code-translator/CodeFromTo'
import { TranslatorLangSelector } from './TranslatorLangSelector'
import { useChat, BotSlugs } from '@ai-translator/chat'

interface Props {
  showSettings: boolean
  containerX?: MotionValue<number>
  containerY?: MotionValue<number>
}

const MotionBox = styled(motion(Box))

export function Header({ showSettings, containerX, containerY }: Props) {
  const { chat } = useChat()
  const draggable = containerX && containerY
  return (
    <MotionBox
      toCenterY
      toBetween
      borderBottom
      borderBottomGray100
      borderBottomGray800--dark
      px4
      cursor={draggable ? 'move' : false}
      h={HEADER_HEIGHT}
      onPan={(e, info) => {
        if (draggable) {
          containerX.set(containerX.get() + info.delta.x)
          containerY.set(containerY.get() + info.delta.y)
        }
      }}
    >
      <Box toCenterY toBetween columnGap-8>
        <Box bgBrand500 square7 rounded2XL toCenter>
          <IconLogoLight
            size={24}
            black
            onClick={(e) => {
              e.stopPropagation()
            }}
          />
        </Box>
        <Box textLG fontSemibold>
          AI Translator
        </Box>
        {/* <BotSelect /> */}
      </Box>
      <Box toCenterY columnGap-8>
        {chat.slug === BotSlugs.TextTranslator && <TranslatorLangSelector />}
        {chat.slug === BotSlugs.CodeTranslator && <CodeFromTo />}
        {showSettings && <SettingsButton />}
      </Box>
    </MotionBox>
  )
}
