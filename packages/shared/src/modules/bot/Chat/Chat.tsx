import { Box } from '@fower/react'
import { ChatBody } from './ChatBody'
import { ChatFooter } from './ChatFooter'
import { BotHeader } from './BotHeader'

export const Chat = () => {
  return (
    <Box column h-100vh>
      <BotHeader />
      <ChatBody />
      <ChatFooter />
    </Box>
  )
}
