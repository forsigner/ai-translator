import { Box } from '@fower/react'
import { FromTo } from './FromTo'
import { HEADER_HEIGHT } from '@src/common/constants'
import { IconLogo } from './IconLogo'
import { SettingsButton } from './SettingsButton'

interface Props {
  showSettings: boolean
}

export function Header({ showSettings }: Props) {
  return (
    <Box
      toCenterY
      toBetween
      borderBottom
      borderBottomGray100
      borderBottomGray800--dark
      px4
      h={HEADER_HEIGHT}
    >
      <Box toCenterY toBetween columnGap-8>
        <IconLogo size={28} />
        <Box textBase>AI Translator</Box>
      </Box>
      <Box toCenterY columnGap-8>
        <FromTo />
        {showSettings && <SettingsButton></SettingsButton>}
      </Box>
    </Box>
  )
}
