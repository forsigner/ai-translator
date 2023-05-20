import { Box } from '@fower/react'
import { BotType } from '@ai-translator/bot'

interface Props {
  bot: BotType
}

export const BotItem = ({ bot }: Props) => {
  const active = bot.slug === 'text-translator'

  if (bot.hide) return null

  return (
    <Box
      key={bot.slug}
      bgBrand100={active}
      onClick={() => {
        console.log('..xgo')
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
        <Box>{!!bot.icon && bot.icon}</Box>

        <Box>
          <Box textLG>{bot.name}</Box>
          <Box textXS gray500>
            {bot.intro}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
