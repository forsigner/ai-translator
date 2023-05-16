import { View, Text } from '@fower/react-native'
import { ActivityIndicator } from 'react-native'
import { useMessageContent, useStreaming } from '@ai-translator/bot'

export function TranslatorContent() {
  const { content } = useMessageContent()
  const { streaming } = useStreaming()
  if (streaming) {
    return (
      <View toCenterY>
        <ActivityIndicator color="#000" />
        <Text pl2>Translating...</Text>
      </View>
    )
  }
  return (
    <View w-100p p3>
      <Text>{content}</Text>
    </View>
  )
}
