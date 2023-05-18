import { UpdateBotDataInput, apiService } from '@boter/api-sdk'
import { refetchMyBots } from './useMyBots'
import { getBot } from '@boter/bot'

export function useUpdateBot() {
  async function updateBot(input: UpdateBotDataInput) {
    const { id, refetchBot } = getBot()
    const newBot = await apiService.updateBot({
      where: { id },
      data: input,
    })

    await Promise.all([refetchMyBots(), refetchBot(newBot.slug)])
    return newBot
  }

  return { updateBot }
}
