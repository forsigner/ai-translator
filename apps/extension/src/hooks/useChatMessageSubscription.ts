import { getMessageState, updateMessage } from '@src/stores/message.store'
import gql from 'gql-tag'
import { useSubscription } from 'stook-graphql'

export const CHAT_MESSAGE_SUBSCRIPTION = gql`
  subscription chatMessageSubscription($deviceId: String!) {
    chatMessageSubscription(deviceId: $deviceId) {
      content
    }
  }
`

export function useChatMessageSubscription(deviceId: string) {
  useSubscription(CHAT_MESSAGE_SUBSCRIPTION, {
    variables: { deviceId },
    onUpdate({ data }) {
      if (data?.content) {
        const message = getMessageState()
        updateMessage(data.content, message.isWordMode)
        // console.log('data.....:', data)
      }
    },
  })

  return {}
}
