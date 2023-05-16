import { View, Text, TextInput } from '@fower/react-native'
import { Button, Colors } from 'react-native-ui-lib'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useBotContext } from '@ai-translator/bot'
import { useState } from 'react'

export function TranslatorInput() {
  const bot = useBotContext()
  const [value, setValue] = useState('')
  const [content, setContent] = useState('')
  return (
    <View w-100p p3>
      <View w-100p border-2 borderBlack roundedXL>
        <TextInput
          rounded2XL
          px3
          py3
          minH-120
          maxH-200
          multiline
          placeholder="Enter text"
          value={value}
          onChangeText={(text) => {
            bot.updateText(text)
            setValue(text)
          }}
        />
        <View row toBetween toCenterY px1 pb1>
          <View>
            <Ionicons name="md-copy-outline" size={24} color="black" />
          </View>
          <View>
            <Button
              label={'Translate'}
              size={Button.sizes.medium}
              backgroundColor={Colors.black}
              borderRadius={8}
              onPress={async () => {
                await bot.sendMessage()
              }}
            />
          </View>
        </View>
      </View>
    </View>
  )
}
