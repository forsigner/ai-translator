import { View, Text } from '@fower/react-native'
import { SettingsButton } from './SettingsButton'

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
      <SettingsButton />
    </View>
  )
}
