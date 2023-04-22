import { Box } from '@fower/react'
import { BotSlugs, HEADER_HEIGHT } from '../common/constants'
import { SettingsButton } from './SettingsButton'
// import { BotSelect } from './BotSelect'
import { IconLogoLight } from './IconLogoLight'
import { CodeFromTo } from './code-translator/CodeFromTo'
import { TranslatorLangSelect } from './TranslatorLangSelect'
import { useBot } from '../bot'

interface Props {
  showSettings: boolean
}

export function Header({ showSettings }: Props) {
  const { bot } = useBot()
  return (
    <Box
      toCenterY
      toBetween
      borderBottom
      borderBottomGray100
      borderBottomGray800--dark
      px4
      h={HEADER_HEIGHT}
    >
      <Box toCenterY toBetween columnGap-4>
        <Box bgBrand500 square7 rounded2XL toCenter>
          <IconLogoLight
            size={24}
            white
            onClick={(e) => {
              e.stopPropagation()
            }}
          />
        </Box>
        {/* <BotSelect /> */}
      </Box>
      <Box toCenterY columnGap-8>
        {bot.slug === BotSlugs.TextTranslator && <TranslatorLangSelect />}
        {bot.slug === BotSlugs.CodeTranslator && <CodeFromTo />}
        {showSettings && <SettingsButton />}
      </Box>
    </Box>
  )
}
