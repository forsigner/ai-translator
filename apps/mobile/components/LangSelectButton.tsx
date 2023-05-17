import React from 'react'
import { Text, View } from '@fower/react-native'
import { styled } from '@fower/styled'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { LangSelectScreenNavigationProp } from '../types'
import { IconDown } from './Icons/IconDown'
import { useTargetLang } from '@hooks/useTargetLang'

const Opacity = styled(TouchableOpacity)

export function LangSelectButton() {
  const navigation = useNavigation<LangSelectScreenNavigationProp>()
  const { langName } = useTargetLang()

  return (
    <Opacity
      row
      toCenterY
      activeOpacity={0.5}
      px4
      py-6
      roundedFull
      textBase
      mr3
      border-1
      onPress={() => {
        navigation.navigate('LangSelect')
      }}
    >
      <View mr1>
        <Text>{langName}</Text>
      </View>
      <IconDown size={8} />
    </Opacity>
  )
}
