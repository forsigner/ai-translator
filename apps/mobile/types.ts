import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'

export type RootStackParamList = {
  Home: undefined
  LangSelect: undefined
  Settings: undefined
}

export type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>

export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>

export type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Settings'>

export type LangSelectScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'LangSelect'
>
