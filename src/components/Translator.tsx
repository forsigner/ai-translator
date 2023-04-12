import { Box } from '@fower/react'
import { IconChatLoading } from './IconChatLoading'
import { Header } from './Header'
import { useMessage } from '@src/pages/content/stores/message.store'
import { SendMessageBox } from './SendMessageBox'
import { useSendMessage } from '@src/pages/content/useSendMessage'

export default function Translator() {
  const sendMessage = useSendMessage()
  const { content, streaming } = useMessage()

  return (
    <Box w-400 minH-100 column bgWhite>
      <Header />
      <Box p3>
        <SendMessageBox
          onSendMessage={async (value) => {
            await sendMessage(value)
          }}
        />
        <Box p5 pt5>
          {streaming && (
            <Box toCenter>
              <IconChatLoading />
            </Box>
          )}

          {content && <Box>{content}</Box>}
        </Box>
      </Box>
    </Box>
  )
}
