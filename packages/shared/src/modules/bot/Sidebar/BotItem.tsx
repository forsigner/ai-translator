import { Box } from '@fower/react'
import { Bot, Hooks } from '@boter/api-sdk'
import { useRouter } from 'next/router'
import { StyledLink } from '../../../components/StyledLink'
import { useUser } from '../../../stores'
import { IconBot } from '../../../icons'
import { refetchMessages } from '../hooks/useMessages'
import { useBotContext } from '@boter/bot'

interface Props {
  bot: Bot
}

export const BotItem = ({ bot }: Props) => {
  const { query } = useRouter()
  const { user } = useUser()
  const active = query.slug === bot.slug
  const botCtx = useBotContext()

  return (
    <StyledLink
      key={bot.id}
      onClick={(e) => {
        botCtx.refetchBot(bot.slug)
        refetchMessages(bot.id)
      }}
      href={`/${bot.slug}`}
    >
      <Box
        py3
        pr2
        pl-20
        toCenterY
        cursorPointer
        black
        black--hover
        bgGray100--hover
        bgGray200--hover
        bgGray200={active}
        gray100--dark--hover
        bgGray800--dark={active}
        bgGray800--dark--hover
        brand500={active}
        textBase
        fontMedium
        spaceX2
      >
        <Box>
          <IconBot />
        </Box>
        <Box>{bot.slug}</Box>
      </Box>
    </StyledLink>
  )
}
