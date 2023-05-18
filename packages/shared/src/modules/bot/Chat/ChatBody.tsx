import { Box } from '@fower/react'
import { useMessages } from '@ai-translator/bot'
import { CHAT_WIDTH } from '../../../common'
import { Anchor } from './Anchor'
import { ChatWelcome } from './ChatWelcome'
import { MessageList } from '../../../components/MessageList/MessageList'

export const ChatBody = () => {
  const { messages } = useMessages()

  return (
    <Box flex-1 column overflowXHidden overflowYAuto px4 pt5 pb0 w-100p>
      <Box mx-auto w={['100%', '100%', CHAT_WIDTH]}>
        <Box>
          <>
            {!!messages.length && <MessageList messages={messages} />}
            {!messages.length && <ChatWelcome />}
          </>
        </Box>
        <Anchor />
      </Box>
    </Box>
  )
}
