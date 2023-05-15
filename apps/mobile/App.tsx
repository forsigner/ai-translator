import { StatusBar } from 'expo-status-bar'
import { View, Text } from '@fower/react-native'
import { SafeAreaView } from 'react-native'
import { RootSiblingParent } from 'react-native-root-siblings'
import { BotProvider } from './bot'

import { Nav } from './components/Nav'
import { TranslatorInput } from './components/TranslatorInput'

export default function App() {
  return (
    <RootSiblingParent>
      <BotProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <View column flex-1 toCenter>
            <StatusBar style="auto" />
            <Nav />
            <TranslatorInput />
            <View flex-1>
              <View>
                <Text p0 red300>
                  TODO...
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </BotProvider>
    </RootSiblingParent>
  )
}
