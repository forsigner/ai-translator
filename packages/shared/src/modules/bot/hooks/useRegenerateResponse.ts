import { useMessages } from './useMessages'
import { emitter } from '../../../common/emitter'
import { useChatStatus } from './useChatStatus'
import { useSendChatRequest } from './sendChatRequest'
import { Message, Mutator } from '@boter/api-sdk'
import { useBotContext } from '@boter/bot'

export function useRegenerateResponse() {
  const bot = useBotContext()
  const { messages = [] } = useMessages()
  const { setStatus } = useChatStatus()
  const sendChatRequest = useSendChatRequest()

  async function regenerateResponse(message: Message) {
    bot.setRegeneratingMessage(message)
    setStatus('fetching')
    emitter.emit('SCROLL_ANCHOR', '')

    Mutator.mutateMessages((messages) => {
      const index = messages.findIndex((i) => i.id === bot.regeneratingMessage?.id)
      messages[index].content = ''
      messages[index].streaming = true
    })

    try {
      await sendChatRequest(message.content, messages.slice(0, messages.length - 1), message)
    } catch (error) {
      setStatus('finished')
    }
  }

  return { regenerateResponse }
}
