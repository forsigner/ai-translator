import { apiService } from '@boter/api-sdk'
import { refetchMessages } from './useMessages'
import { getBot } from '@boter/bot'

export function useRemoveMessagePair() {
  async function removeMessagePair(id: number) {
    const bot = getBot()
    await apiService.removeMessagePair({
      messageId: id,
    })
    await refetchMessages(bot.id)
  }

  return { removeMessagePair }
}
