import { useChatMessageSubscription } from '@src/hooks/useChatMessageSubscription'

interface Props {
  deviceId: string
}

export const TranslateResultSubscription = ({ deviceId }: Props) => {
  useChatMessageSubscription(deviceId)
  return null
}
