import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { PortalProvider } from '@gorhom/portal'
import { View, Text } from '@fower/react-native'
import { Platform, SafeAreaView, StatusBar as RNStatusBar } from 'react-native'
import { BotProvider } from '@ai-translator/bot'
import { Nav } from './components/Nav'
import { Chat } from './components/Chat'
import { HomeScreen } from './screens/HomeScreen'
import { SettingsScreen } from './screens/SettingsScreen'

export type RootStackParamList = {
  Home: undefined
  Settings: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <PortalProvider>
      <BotProvider>
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
      </BotProvider>
    </PortalProvider>
  )
}
