import { Box } from '@fower/react'
import { CogSolid } from '@bone-ui/icons'
import { HEADER_HEIGHT } from '@src/constants'

export function Footer() {
  return (
    <Box toCenterY toBetween borderBottom borderBottomGray100 px4 h={HEADER_HEIGHT}>
      <CogSolid gray400 cursorPointer></CogSolid>
      <CogSolid gray400 cursorPointer></CogSolid>
    </Box>
  )
}
