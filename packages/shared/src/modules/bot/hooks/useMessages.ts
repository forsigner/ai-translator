import { useVisit } from './useVisit'
import { Hooks, MESSAGES, Message, Refetcher } from '@boter/api-sdk'
import { getBot } from '@boter/bot'
import { getState } from 'stook'

export function useMessages() {
  const { visit } = useVisit()

  const { data: messages = [], ...rest } = Hooks.useMessages(() => {
    const bot = getBot()
    if (!bot) throw new Error('')
    return {
      botId: bot.id,
    }
  })

  return {
    ...rest,
    messages,
  }
}

export function getMessages(): Message[] {
  return getState(MESSAGES)?.data || []
}

export async function refetchMessages(botId: number) {
  await Refetcher.refetchMessages({
    botId,
  })
}
