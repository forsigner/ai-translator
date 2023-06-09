import { Box } from '@fower/react'
import { CodeOutline, TranslateOutline } from '@bone-ui/icons'
import { BotSlugs, BotType, getChat, useChat } from '@ai-translator/chat'

interface Props {
  item: BotType
}

const getIcon = (item: BotType) => {
  if (item.slug === BotSlugs.TextTranslator) {
    return (
      <Box flexShrink-1 square10 bgGray300--T20 roundedFull toCenter bgOrange100>
        <TranslateOutline orange600 />
      </Box>
    )
  }

  if (item.slug === BotSlugs.CodeTranslator) {
    return (
      <Box flexShrink-1 square10 bgGray300--T20 roundedFull toCenter bgRed100>
        <CodeOutline red700 />
      </Box>
    )
  }

  if (item.slug === BotSlugs.JSONTranslator) {
    return (
      <Box flexShrink-1 square10 bgGray300--T20 roundedFull toCenter bgGreen100>
        <Box text-10 green600>
          JSON
        </Box>
      </Box>
    )
  }
  return null
}

export const BotItem = ({ item }: Props) => {
  const { chat } = useChat()
  const active = item.slug === chat.slug

  if (item.hide) return null

  return (
    <Box
      key={item.slug}
      bgBrand100={active}
      onClick={() => {
        getChat().selectBot(item)
      }}
    >
      <Box
        py3
        px3
        toCenterY
        cursorPointer
        black
        black--hover
        bgGray100--hover
        bgGray100={active}
        gray100--dark--hover
        bgGray800--dark={active}
        bgGray800--dark--hover
        textBase
        fontMedium
        spaceX2
      >
        {getIcon(item)}
        <Box flex-1>
          <Box textLG>{item.name}</Box>
          <Box textXS gray400>
            {item.intro}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
