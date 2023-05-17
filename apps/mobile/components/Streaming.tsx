import { View, Text } from '@fower/react-native'
import { ActivityIndicator } from 'react-native'

export function Streaming() {
  return (
    <View toCenterY py2 px2>
      <ActivityIndicator
        size="small"
        color="#000"
        style={
          {
            // backgroundColor: 'red',
          }
        }
      />
      <Text pl2 textSM>
        Translating...
      </Text>
    </View>
  )
}
