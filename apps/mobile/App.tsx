import { StatusBar } from 'expo-status-bar'
import { View, Text } from '@fower/react-native'
import { Platform, SafeAreaView, StatusBar as RNStatusBar } from 'react-native'
import { RootSiblingParent } from 'react-native-root-siblings'
import { BotProvider } from '@ai-translator/bot'
import { Nav } from './components/Nav'
import { Chat } from './components/Chat'

export default function App() {
  return (
    <RootSiblingParent>
      <BotProvider>
        <SafeAreaView
          style={{ flex: 1, paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0 }}
        >
          <View column flex-1 toCenter>
            <StatusBar style="auto" />
            <Nav />
            <View flex-1 w-100p>
              <Chat />
            </View>
          </View>
        </SafeAreaView>
      </BotProvider>
    </RootSiblingParent>
  )
}
