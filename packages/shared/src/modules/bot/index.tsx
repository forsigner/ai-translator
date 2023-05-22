import { ChatProvider } from '@ai-translator/chat'
import { Chat } from './Chat/Chat'
import { Box } from '@fower/react'
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
