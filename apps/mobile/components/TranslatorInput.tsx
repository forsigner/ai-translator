import { View, Text, TextInput } from '@fower/react-native'
import { Button, Colors } from 'react-native-ui-lib'
import { IconCopy } from './IconCopy'

export function TranslatorInput() {
  return (
    <View w-100p p3>
      <View w-100p border-2 borderBlack roundedXL>
        <TextInput rounded2XL px3 py3 minH-120 maxH-200 multiline placeholder="Enter text" />
        <View row toBetween px1 pb1>
          <View>
            <IconCopy />
          </View>
          <View>
            <Button
              label={'Translate'}
              size={Button.sizes.medium}
              backgroundColor={Colors.black}
              borderRadius={8}
            />
          </View>
        </View>
      </View>
    </View>
  )
}
