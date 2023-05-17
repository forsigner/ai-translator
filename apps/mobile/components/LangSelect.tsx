import React, { useRef } from 'react'
import { View, Text } from '@fower/react-native'
import { Portal } from '@gorhom/portal'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { Button, Colors } from 'react-native-ui-lib'

export function LangSelect() {
  const modalizeRef = useRef<Modalize>(null)

  const onOpen = () => {
    modalizeRef.current?.open()
  }

  return (
    <View>
      <TouchableOpacity>
        <Ionicons
          name="md-cog"
          size={24}
          color="black"
          onPress={() => {
            onOpen()
          }}
        />
      </TouchableOpacity>
      <Portal>
        <Modalize
          onOverlayPress={() => {
            console.log('gogo........')
            modalizeRef.current?.close()
          }}
          ref={modalizeRef}
          // withHandle={false}
          // handlePosition="inside"
          adjustToContentHeight={true}
        >
          <View>
            <Text
              onPress={() => {
                modalizeRef.current?.close()
              }}
            >
              ...your content
            </Text>
          </View>

          <View>
            <Text>...your content</Text>
          </View>

          <View>
            <Text>...your content</Text>
          </View>

          <View>
            <Text>...your content</Text>
          </View>

          <View>
            <Text>...your content</Text>
          </View>

          <View>
            <Text>...your content</Text>
          </View>
          <View>
            <Text>...your content</Text>
          </View>

          <View>
            <Text>...your content</Text>
          </View>

          <View>
            <Text>...your content</Text>
          </View>
          <Button
            label={'Press'}
            size={Button.sizes.medium}
            backgroundColor={Colors.red30}
            onPress={() => {
              modalizeRef.current?.close()
            }}
          />
        </Modalize>
      </Portal>
    </View>
  )
}
