import { StatusBar } from 'expo-status-bar'
import { View, Text } from '@fower/react-native'
import { SafeAreaView } from 'react-native'
import { RootSiblingParent } from 'react-native-root-siblings'
import { BotProvider } from '@ai-translator/bot'
import { Nav } from './components/Nav'
import { TranslatorInput } from './components/TranslatorInput'
import { TranslatorContent } from './components/TranslatorContent'

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
              <TranslatorContent />
            </View>
          </View>
        </SafeAreaView>
      </BotProvider>
    </RootSiblingParent>
  )
}
