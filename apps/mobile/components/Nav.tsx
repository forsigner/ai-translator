import { View, Text } from '@fower/react-native'
import { Ionicons } from '@expo/vector-icons'

export function Nav() {
  return (
    <View toBetween px2 pt2 w="100%" toCenterY bgTransparent>
      <View
        row
        toCenterY
        style={{
          columnGap: 10,
        }}
      >
        <View>
          <Text black text2XL>
            翻译
          </Text>
        </View>
        <View>
          <Text gray400 textLG>
            收藏
          </Text>
        </View>
      </View>
      <Ionicons name="md-cog" size={24} color="black" />
    </View>
  )
}
