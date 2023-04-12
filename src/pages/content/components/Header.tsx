import { Box } from '@fower/react'
import Logo from './Logo'
import { FromTo } from './FromTo'

export function Header() {
  return (
    <Box toCenterY toBetween>
      <Box toCenterY toBetween columnGap-8>
        <Logo />
        <Box>AI Translator</Box>
      </Box>
      <Box>
        <Box>Switch</Box>
        <FromTo from={'en'} to={'en'} />
      </Box>
    </Box>
  )
}
