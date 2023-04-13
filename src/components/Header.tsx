import { Box } from '@fower/react'
import Logo from './Logo'
import { FromTo } from './FromTo'
import { HEADER_HEIGHT } from '@src/constants'

export function Header() {
  return (
    <Box toCenterY toBetween borderBottom borderBottomGray100 px4 h={HEADER_HEIGHT}>
      <Box toCenterY toBetween columnGap-8>
        <Logo />
        <Box textBase>AI Translator</Box>
      </Box>
      <Box toCenterY columnGap-8>
        <FromTo />
      </Box>
    </Box>
  )
}
