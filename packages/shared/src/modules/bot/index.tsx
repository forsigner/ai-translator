import { ChatProvider } from '@ai-translator/chat'
import { Box } from '@fower/react'
import { Chat } from './Chat/Chat'

export function ModuleBot() {
  return (
    <ChatProvider>
      <Chat />
    </ChatProvider>
  )
}
