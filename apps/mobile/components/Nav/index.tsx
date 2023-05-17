import React from 'react'
import { StyleProp, TextStyle } from 'react-native'
import { NavClose } from './NavClose'
import { NavBack } from './NavBack'

interface Props {
  title?: string
  navType?: 'close' | 'back'
  titleStyle?: StyleProp<TextStyle>
  onOk?: (...args: any[]) => any
  autoBack?: boolean
}

export const Nav = (props: Props) => {
  const { title, navType, titleStyle, autoBack } = props
  if (navType === 'close') {
    return <NavClose title={title} titleStyle={titleStyle}></NavClose>
  }
  return (
    <NavBack autoBack={autoBack} onOk={props.onOk} title={title} titleStyle={titleStyle}></NavBack>
  )
}
