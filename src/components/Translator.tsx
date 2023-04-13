import { Box } from '@fower/react'
import { IconChatLoading } from './IconChatLoading'
import { Header } from './Header'
import { useMessage } from '@src/stores/message.store'
import { SendMessageBox } from './SendMessageBox'
import { useSendMessage } from '@src/hooks/useSendMessage'
import { CARD_HEIGHT, CARD_WIDTH } from '@src/constants'
import { Footer } from './Footer'
import { Markdown } from './Markdown'

export default function Translator() {
  const sendMessage = useSendMessage()
  const { content, streaming } = useMessage()

  return (
    <Box w={CARD_WIDTH} minH={CARD_HEIGHT} column bgWhite>
      <Header />
      <Box p3>
        <SendMessageBox
          onSendMessage={async (value) => {
            await sendMessage(value)
          }}
        />
        <Box minH-46 pt4 mb2 px2 textBase leadingNormal>
          {streaming && (
            <Box>
              <IconChatLoading />
            </Box>
          )}

          <Box>{content && !streaming && <Markdown content={content} />}</Box>
        </Box>
        <Footer />
      </Box>
    </Box>
  )
}
