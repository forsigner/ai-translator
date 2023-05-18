import React from 'react'
import { Text, View } from '@fower/react-native'
import { TouchableOpacity } from 'react-native'
import { useBotContext } from '@ai-translator/bot'

export function ClearMessageButton() {
  const bot = useBotContext()
  return (
    <View px3>
      <TouchableOpacity
        onPress={() => {
          bot.clearMessages()
        }}
      >
        <Text>清除信息</Text>
      </TouchableOpacity>
    </View>
  )
}
