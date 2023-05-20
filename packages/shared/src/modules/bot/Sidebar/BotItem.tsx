import { Box } from '@fower/react'
import { BotType, getBot, useBot } from '@ai-translator/bot'

interface Props {
  item: BotType
}

export const BotItem = ({ item }: Props) => {
  const { bot } = useBot()
  const active = item.slug === bot.slug

  if (item.hide) return null

  return (
    <Box
      key={item.slug}
      bgBrand100={active}
      onClick={() => {
        getBot().selectBot(item)
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
        <Box>{!!item.icon && item.icon}</Box>

        <Box>
          <Box textLG>{item.name}</Box>
          <Box textXS gray500>
            {item.intro}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
