import { apiService } from '@boter/api-sdk'
import { ChatCompletionResponseMessageRoleEnum } from 'openai'
import { getBot } from '@boter/bot'
import { getMessages, refetchMessages } from './useMessages'
import { getUser } from '../../../stores'

export async function addMessage(value: string, role: ChatCompletionResponseMessageRoleEnum) {
  const user = getUser()
  const bot = getBot()
  const { id: botId } = bot
  const messages = getMessages()

  await apiService.addMessage({
    userId: user.id,
    userMessageId:
      role === ChatCompletionResponseMessageRoleEnum.Assistant
        ? messages[messages.length - 2].id
        : null,
    botId,
    role,
    content: value,
    extra: bot.currentExtra ? bot.currentExtra : undefined,
  })

  await refetchMessages(bot.id)
}
