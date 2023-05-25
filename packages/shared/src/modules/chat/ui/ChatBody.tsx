import { Box } from '@fower/react'
import { BotSlugs, LayoutType, useChat, useMessages } from '@ai-translator/chat'
import { CHAT_WIDTH } from '@ai-translator/chat'
import { Anchor } from './Anchor'
import { ChatWelcome } from './ChatWelcome'
import { MessageList } from '../../../components/MessageList/MessageList'
import { CodeTranslatorLayout } from './CodeTranslatorLayout/CodeTranslatorLayout'
import { TranslatorPanel } from './TranslatorPanel/TranslatorPanel'

export const ChatBody = () => {
  const { messages } = useMessages()
  const { chat } = useChat()

  console.log('messages:', messages)

  if (chat.layout === LayoutType.Chat) {
    return (
      <Box flex-1 column overflowYAuto px4 pt5 pb0 w-100p>
        <Box mx-auto w={['100%', '100%', CHAT_WIDTH]}>
          {!!messages.length && <MessageList messages={messages} />}
          {!messages.length && <ChatWelcome />}
          <Anchor />
        </Box>
      </Box>
    )
  }

  if (chat.slug === BotSlugs.CodeTranslator) {
    return <CodeTranslatorLayout />
  }
  return <TranslatorPanel />
}
