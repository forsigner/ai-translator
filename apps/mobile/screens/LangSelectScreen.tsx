import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { View } from '@fower/react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { RootStackParamList } from '../types'
import { Nav } from '@components/Nav'
import { LangSelect } from '@components/LangSelect'
import { useTargetLang } from '@hooks/useTargetLang'

export function LangSelectScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {
  const insets = useSafeAreaInsets()
  const { lang, setLang } = useTargetLang()

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
      <Nav navType="close" />
      <LangSelect
        value={lang}
        onChange={(value) => {
          setLang(value)
          navigation.goBack()
        }}
      />
    </View>
  )
}
