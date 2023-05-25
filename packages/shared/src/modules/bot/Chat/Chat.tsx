import { Box } from '@fower/react'
import { ChatBody } from './ChatBody'
import { ChatFooter } from './ChatFooter'
import { BotHeader } from './BotHeader'
import { useChat } from '@ai-translator/chat'
import { PanelFooter } from './PanelFooter'

export const Chat = () => {
  const { chat } = useChat()
  return (
    <Box flex-1>
      <Box mx-auto column h-100vh w={chat.isChatLayout ? '100%' : ['100%', '100%', 800, 800]}>
        <BotHeader />
        <ChatBody />

        {chat.isChatLayout && <ChatFooter />}
        {!chat.isChatLayout && <PanelFooter />}
      </Box>
    </Box>
  )
}
