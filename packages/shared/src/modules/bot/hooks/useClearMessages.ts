import { apiService } from '@boter/api-sdk'
import { refetchMessages } from './useMessages'
import { toast } from 'bone-ui'
import { getBot } from '@boter/bot'

export function useClearMessages() {
  async function clearMessages() {
    const bot = getBot()
    await apiService.clearBotMessages({
      botId: bot.id,
    })

    toast.success('Cleared')
    await refetchMessages(bot.id)
  }

  return { clearMessages }
}
