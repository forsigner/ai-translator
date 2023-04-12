import { Box } from '@fower/react'
import { hideThumbnail, useThumbnail } from '../thumbnail.store'
import TranslateSolid from './TranslateSolid'

export default function Thumbnail() {
  const { x, y } = useThumbnail()
  console.log('x:', x, 'y:', y)

  if (!x || !y) return null
  return (
    <Box
      toCenter
      inlineFlex
      absolute
      right0
      top0
      square7
      shadowXL
      rounded
      left={x}
      top={y}
      cursorPointer
      border
      borderGray200
      bgWhite
      onClick={() => {
        hideThumbnail()
      }}
    >
      <TranslateSolid size={20} gray600 />
    </Box>
  )
}
