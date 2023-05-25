import { Box } from '@fower/react'
import { motion, MotionValue } from 'framer-motion'
import { styled } from '@fower/styled'
import { SettingsButton } from './SettingsButton'
import { CodeFromTo } from './code-translator/CodeFromTo'
// import { TranslatorLangSelector } from './TranslatorLangSelector'
import { useChat, BotSlugs } from '@ai-translator/chat'
import { IconLogoLight } from '@ai-translator/widgets'
import { HEADER_HEIGHT } from '../constants'
import { TranslatorLangSelector } from './TranslatorLangSelector'
import { navToOptions } from '~common/utils'

interface Props {
  containerX?: MotionValue<number>
  containerY?: MotionValue<number>
}

const MotionBox = styled(motion(Box))

export function Header({ containerX, containerY }: Props) {
  const { chat } = useChat()
  const draggable = containerX && containerY
  return (
    <MotionBox
      toCenterY
      toBetween
      px4
      pt3
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
        <Box bgBrand500 square6 roundedXL toCenter>
          <IconLogoLight
            size={18}
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
        {chat.slug === BotSlugs.TextTranslator && <TranslatorLangSelector containerHeight={400} />}
        {chat.slug === BotSlugs.CodeTranslator && <CodeFromTo />}
      </Box>
    </MotionBox>
  )
}
