import React from 'react'
import { Text, View } from '@fower/react-native'
import { TouchableOpacity } from 'react-native'
import { useChatContext } from '@ai-translator/chat'

export function ClearMessageButton() {
  const chat = useChatContext()
  return (
    <View px3>
      <TouchableOpacity
        onPress={() => {
          chat.clearMessages()
        }}
      >
        <Text>清除信息</Text>
      </TouchableOpacity>
    </View>
  )
}
