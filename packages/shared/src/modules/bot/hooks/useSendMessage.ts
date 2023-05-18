import { Message, Mutator } from '@boter/api-sdk'
import { ChatCompletionResponseMessageRoleEnum } from 'openai'
import { useUser } from '../../../stores'
import { useChatSettings } from './useChatSettings'
import { useMessages } from './useMessages'
import { emitter } from '../../../common/emitter'
import { useChatStatus } from './useChatStatus'
import { getBotPlugin } from '@boter/bot-ui'
import { useBotContext, useParams } from '@boter/bot'
import { useSendChatRequest } from './sendChatRequest'
import { addMessage } from './addMessage'

export function useSendMessage() {
  const { user } = useUser()
  const bot = useBotContext()
  const { messages = [] } = useMessages()
  const { setStatus } = useChatStatus()
  const { params } = useParams()
  const sendChatRequest = useSendChatRequest()

  function initAnswer() {
    const newMessage = {
      userId: user.id,
      botId: bot.id,
      role: ChatCompletionResponseMessageRoleEnum.Assistant,
      content: '',
      streaming: true,
      createdAt: new Date().toString(),
      extra: params,
    } as Message

    Mutator.mutateMessages((messages) => {
      messages.push(newMessage)
    })
  }

  async function sendMessage(value: string) {
    setStatus('fetching')

    bot.setRegeneratingMessage(null)

    try {
      // Firstly, save user message to server
      await addMessage(value, ChatCompletionResponseMessageRoleEnum.User)

      // init an empty answer message
      initAnswer()

      emitter.emit('SCROLL_ANCHOR', '')

      await sendChatRequest(value, messages)
    } catch (error) {
      console.log('error:', error)
      setStatus('finished')
    }
  }

  return { sendMessage }
}
