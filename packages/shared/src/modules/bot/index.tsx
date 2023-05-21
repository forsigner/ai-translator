import { BotProvider } from '@ai-translator/bot'
import { Chat } from './Chat/Chat'
import { Box } from '@fower/react'
import { Sidebar } from './Sidebar/Sidebar'

export function ModuleBot() {
  return (
    <BotProvider>
      <Box toCenterX>
        <Sidebar />
        <Chat />
      </Box>
    </BotProvider>
  )
}
