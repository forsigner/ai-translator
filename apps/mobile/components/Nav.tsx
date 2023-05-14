import { View, Text } from '@fower/react-native'

export function Nav() {
  return (
    <View
      row
      bgTransparent
      toCenterY
      w="100%"
      px2
      pt2
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
  )
}
