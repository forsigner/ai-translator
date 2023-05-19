import { Box } from '@fower/react'
import { useBot } from '@ai-translator/bot'
import { CHAT_WIDTH } from '../../../common'
import { SendMessageBox } from './SendMessageBox'
import { ClearMessageButton } from './ClearMessageButton'

export const ChatFooter = () => {
  // const { sendMessage } = useSendMessage()
  const { bot } = useBot()
  // const plugin = getBotPlugin(bot.slug)
  // const paramsNode = plugin?.renderParams()

  return (
    <Box pb4 px4>
      <Box maxW={CHAT_WIDTH} mx-auto>
        <Box toCenterX mb2>
          {/* <ChatController /> */}
          <ClearMessageButton />
        </Box>

        <SendMessageBox
          onSendMessage={async (value) => {
            await bot.sendMessage()
          }}
        />
      </Box>
    </Box>
  )
}
