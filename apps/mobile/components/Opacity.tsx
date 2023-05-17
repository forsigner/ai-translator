import { TouchableOpacity } from '@fower/react-native'
import { FowerHTMLProps } from '@fower/core'
import React, { FC, PropsWithChildren } from 'react'
import { StyleProp, ViewStyle, InteractionManager } from 'react-native'

interface Props {
  onPress?: (...args: any[]) => any
  style?: StyleProp<ViewStyle>
}

export const Opacity: FC<PropsWithChildren<Props>> = (props) => {
  function onPress() {
    InteractionManager.runAfterInteractions(() => {
      props.onPress && props.onPress()
    })
  }

  return <TouchableOpacity activeOpacity={0.5} {...props} onPress={onPress}></TouchableOpacity>
}
