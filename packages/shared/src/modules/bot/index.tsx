import { BotProvider } from '@ai-translator/bot'
import { Chat } from './Chat/Chat'
import { Sidebar } from './Sidebar/Sidebar'
import { Box } from '@fower/react'

export function ModuleBot() {
  return (
    <BotProvider>
      {/* <Sidebar /> */}
      <Chat />
    </BotProvider>
  )
}
