import React, { useRef } from 'react'
import { View, Text } from '@fower/react-native'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { useNavigation } from '@react-navigation/native'

export function SettingsButton() {
  const navigation = useNavigation<any>()

  return (
    <View>
      <TouchableOpacity>
        <Ionicons
          name="md-cog"
          size={24}
          color="black"
          onPress={() => {
            navigation.navigate('Settings')
          }}
        />
      </TouchableOpacity>
    </View>
  )
}
