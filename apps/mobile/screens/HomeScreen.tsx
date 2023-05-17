import React, { useRef } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { Nav } from '../components/Nav'
import { Text, View } from '@fower/react-native'
import { Chat } from '../components/Chat'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function HomeScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {
  const insets = useSafeAreaInsets()

  return (
    <View
      bgWhite
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      {/* <Button title="Go to Details" onPress={() => navigation.navigate('Settings')} /> */}
      <View column flex-1 toCenter>
        <Nav />
        <View flex-1 w-100p>
          <Chat />
        </View>
      </View>
    </View>
  )
}
