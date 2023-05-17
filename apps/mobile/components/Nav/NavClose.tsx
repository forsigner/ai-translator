import React from 'react'
import { StyleProp, TextStyle } from 'react-native'
import { Opacity } from '@components/Opacity'
import { IconClose } from '@components/Icons/IconClose'
import { useNavigation } from '@react-navigation/native'
import { LangSelectScreenNavigationProp } from '../../types'
import { View, Text } from '@fower/react-native'

interface Props {
  title?: string
  titleStyle?: StyleProp<TextStyle>
}

export const NavClose = (props: Props) => {
  const navigation = useNavigation<LangSelectScreenNavigationProp>()
  const { title } = props
  function back() {
    navigation.goBack()
  }

  return (
    <View toBetween={!!title} toRight={!title} toCenterY pt2 px4>
      {title && (
        <View toCenter pt5>
          <Text fontBold textLG style={props.titleStyle || {}}>
            {title}
          </Text>
        </View>
      )}

      <Opacity
        onPress={back}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 20,
          height: 40,
          width: 40,
        }}
      >
        <IconClose size={26}></IconClose>
      </Opacity>
    </View>
  )
}
