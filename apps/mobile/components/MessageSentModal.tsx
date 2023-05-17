import { View } from '@fower/react-native'
import { Portal } from '@gorhom/portal'
import React from 'react'
import { Button, Text } from 'react-native'

export const MessageSentModal = ({ modal: { closeModal } }: any) => {
  return (
    <Portal>
      <View bgWhite w-100p h-600>
        <Text>Your message was sent!</Text>
        <Button onPress={closeModal} title="OK" />
      </View>
    </Portal>
  )
}
