import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { PortalProvider } from '@gorhom/portal'
import { View, Text } from '@fower/react-native'
import { Platform, SafeAreaView, StatusBar as RNStatusBar } from 'react-native'
import { BotProvider } from '@ai-translator/bot'
import { Nav } from './components/Nav'
import { Chat } from './components/Chat'

export default function App() {
  return (
    <PortalProvider>
      <BotProvider>
        <GestureHandlerRootView style={{ flex: 1, padding: 40 }}>
          <Nav />
        </GestureHandlerRootView>
      </BotProvider>
    </PortalProvider>
  )
  return (
    <PortalProvider>
      <BotProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaView
            style={{
              flex: 1,
              paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
            }}
          >
            <View column flex-1 toCenter>
              <StatusBar style="auto" />
              <Nav />
              <View flex-1 w-100p>
                <Chat />
              </View>
            </View>
          </SafeAreaView>
        </GestureHandlerRootView>
      </BotProvider>
    </PortalProvider>
  )
}
