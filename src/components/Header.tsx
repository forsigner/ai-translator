import { Box } from '@fower/react'
import { FromTo } from './FromTo'
import { HEADER_HEIGHT } from '@src/constants'
import { IconLogo } from './IconLogo'

export function Header() {
  return (
    <Box toCenterY toBetween borderBottom borderBottomGray100 px4 h={HEADER_HEIGHT}>
      <Box toCenterY toBetween columnGap-8>
        <IconLogo size={28} />
        <Box textBase>AI Translator</Box>
      </Box>
      <Box toCenterY columnGap-8>
        <FromTo />
      </Box>
    </Box>
  )
}
