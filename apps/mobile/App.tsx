import { StatusBar } from 'expo-status-bar'
import { View, Text } from '@fower/react-native'
import { SafeAreaView } from 'react-native'
import { Nav } from './components/Nav'
import { TranslatorInput } from './components/TranslatorInput'

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View column flex-1 toCenter>
        <StatusBar style="auto" />
        <Nav />
        <TranslatorInput />
        <View flex-1>
          <Text>H Open up App.tsx to start working on your app!</Text>
          <View>
            <Text p0 red300>
              Hello
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
