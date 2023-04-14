import { CHAT_MESSAGE_SUBSCRIPTION } from '@ai-translator/api-sdk'
import { useSubscription } from 'stook-graphql'

export function useChatMessageSubscription() {
  useSubscription(CHAT_MESSAGE_SUBSCRIPTION, {
    // variables: { botId },
    onUpdate({ data }) {
      if (data) {
        console.log('data.....:', data)
      }
    },
  })

  return {}
}
