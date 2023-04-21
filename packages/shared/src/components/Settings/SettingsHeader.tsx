import { Box } from '@fower/react'
import { IconLogo } from '../IconLogo'
import { Button } from 'bone-ui'
import { useSettingsVisible } from '../../stores/settings.store'
import { HEADER_HEIGHT } from '../../common'

export function SettingsHeader() {
  const { setVisible } = useSettingsVisible()
  return (
    <Box
      toCenterY
      toBetween
      px4
      h={HEADER_HEIGHT}
      borderBottom
      borderBottomGray100
      borderBottomGray800--dark
    >
      <Box toCenterY columnGap-8>
        <IconLogo size={28} />
        <Box toCenterY fontSemibold textBase spaceX2>
          <Box>AI Translator</Box>
          <Box brand500>for Chrome</Box>
        </Box>
      </Box>
      <Button
        size={28}
        roundedFull
        onClick={() => {
          setVisible(false)
        }}
      >
        返回
      </Button>
    </Box>
  )
}
