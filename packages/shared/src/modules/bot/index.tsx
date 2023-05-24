import { ChatProvider } from '@ai-translator/chat'
import { Box } from '@fower/react'
import { Chat } from './Chat/Chat'
import { Sidebar } from './Sidebar/Sidebar'

export function ModuleBot() {
  return (
    <ChatProvider>
      <Box toCenterX>
        <Sidebar />
        <Chat />
      </Box>
    </ChatProvider>
  )
}
