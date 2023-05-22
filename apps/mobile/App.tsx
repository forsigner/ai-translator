import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack'
import { PortalProvider } from '@gorhom/portal'
import { ChatProvider } from '@ai-translator/chat'
import { HomeNav } from './components/HomeNav'
import { Chat } from './components/Chat'
import { HomeScreen } from './screens/HomeScreen'
import { SettingsScreen } from './screens/SettingsScreen'
import { RootStackParamList } from './types'
import { LangSelectScreen } from './screens/LangSelectScreen'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <PortalProvider>
      <ChatProvider>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  // header: () => null,
                  gestureDirection: 'horizontal',
                }}
              >
                <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{
                    header: () => null,
                    // headerRight: () => (
                    //   <Button onPress={() => alert('This is a button!')} title="Info" />
                    // ),
                  }}
                />

                <Stack.Screen
                  name="LangSelect"
                  component={LangSelectScreen}
                  options={{
                    header: () => null,
                    animation: 'slide_from_bottom',
                  }}
                />

                <Stack.Screen
                  name="Settings"
                  component={SettingsScreen}
                  options={{
                    animation: 'slide_from_bottom',
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </ChatProvider>
    </PortalProvider>
  )
}
