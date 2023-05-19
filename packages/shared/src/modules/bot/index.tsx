import { BotProvider } from '@ai-translator/bot'
import { Chat } from './Chat/Chat'
import { Box } from '@fower/react'

export function ModuleBot() {
  return (
    <BotProvider>
      {/* <Sidebar /> */}
      <Chat />
    </BotProvider>
  )
}
