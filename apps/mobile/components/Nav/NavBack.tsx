import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { TextStyle, StyleProp, StyleSheet } from 'react-native'
import { Opacity } from '@components/Opacity'
import { IconBack } from '@components/Icons/IconBack'
import { IconCheck } from '@components/Icons/IconCheck'
import { Text, View } from '@fower/react-native'

interface Props {
  title?: string
  titleStyle?: StyleProp<TextStyle>
  autoBack?: boolean
  onOk?: (...args: any[]) => any
  bordered?: boolean
}

export const NavBack = (props: Props) => {
  const { title, onOk, autoBack } = props
  const { goBack } = useNavigation()

  const bordered = typeof props.bordered === 'boolean' ? props.bordered : true

  async function ok() {
    onOk && (await onOk())
    autoBack && goBack()
  }
  return (
    <View
      row
      toCenter
      h10
      style={{
        borderBottomColor: bordered ? '#dfdfdf' : 'transparent',
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}
    >
      <Opacity
        style={{
          borderRadius: 18,
          position: 'absolute',
          left: 10,
        }}
        onPress={goBack}
      >
        <IconBack size={28}></IconBack>
      </Opacity>
      {title && (
        <View row toCenter textLG>
          <Text textBase style={props.titleStyle || {}}>
            {title}
          </Text>
        </View>
      )}
      {onOk && (
        <Opacity
          style={{
            borderRadius: 18,
            position: 'absolute',
            right: 16,
            top: 4,
          }}
          onPress={ok}
        >
          <IconCheck size={28}></IconCheck>
        </Opacity>
      )}
    </View>
  )
}
