import { AddBotInput, apiService } from '@boter/api-sdk'
import { useUser } from '../../../stores'
import { refetchMyBots } from './useMyBots'
import { getBot } from '@boter/bot'

export function useAddBot() {
  const { user } = useUser()

  async function addBot(input: AddBotInput) {
    const { refetchBot } = getBot()

    const bot = await apiService.addBot({
      ...input,
      userId: user.id,
    })

    await Promise.all([refetchMyBots(), refetchBot(bot.slug)])
    return bot
  }

  return { addBot }
}
