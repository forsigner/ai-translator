import { Box } from '@fower/react'
import { ChatBody } from './ChatBody'
import { ChatFooter } from './ChatFooter'
import { BotHeader } from './BotHeader'
import { useBot } from '@ai-translator/bot'

export const Chat = () => {
  const { bot } = useBot()
  return (
    <Box flex-1>
      <Box mx-auto column h-100vh w={bot.isChatLayout ? '100%' : ['100%', '100%', 800, 800]}>
        <BotHeader />
        <ChatBody />
        {bot.isChatLayout && <ChatFooter />}
      </Box>
    </Box>
  )
}
