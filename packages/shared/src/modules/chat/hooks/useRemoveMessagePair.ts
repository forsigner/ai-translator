import { apiService, Refetcher } from '@ai-translator/api-sdk'
import { useSessions } from './useSessions'

export function useRemoveMessagePair() {
  const { activeSession } = useSessions()

  async function removeMessagePair(id: number) {
    await apiService.removeMessagePair({
      messageId: id,
    })
    await Refetcher.refetchMessages({
      where: { sessionId: activeSession?.id },
    })
  }

  return { removeMessagePair }
}
