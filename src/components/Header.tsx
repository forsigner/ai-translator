import { Box } from '@fower/react'
import Logo from './Logo'
import { FromTo } from './FromTo'

export function Header() {
  return (
    <Box toCenterY toBetween borderBottom borderBottomGray100 px4>
      <Box toCenterY toBetween columnGap-8>
        <Logo />
        <Box textBase>AI Translator!!</Box>
      </Box>
      <Box>
        <FromTo from={'en'} to={'en'} />
      </Box>
    </Box>
  )
}
