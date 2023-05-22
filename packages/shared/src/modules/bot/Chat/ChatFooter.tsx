import { Box } from '@fower/react'
import { useChat } from '@ai-translator/chat'
import { CHAT_WIDTH } from '../../../common'
import { SendMessageBox } from './SendMessageBox'
import { ClearMessageButton } from './ClearMessageButton'
import { BotParams } from './BotParams/BotParams'

export const ChatFooter = () => {
  const { chat } = useChat()

  return (
    <Box pb4 px4>
      <Box maxW={CHAT_WIDTH} mx-auto>
        <Box mb2 toCenterY columnGap-12>
          {/* <ChatController /> */}
          <BotParams />
          <ClearMessageButton />
        </Box>

        <SendMessageBox
          onSendMessage={async (value) => {
            await chat.sendMessage()
          }}
        />
      </Box>
    </Box>
  )
}
