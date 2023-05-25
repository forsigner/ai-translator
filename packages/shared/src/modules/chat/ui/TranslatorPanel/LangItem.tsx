import { Box } from '@fower/react'
import { memo } from 'react'

export interface Option {
  label: string
  value: string
}

interface LangItemProps {
  item: Option
  onClick(value: string): void
}

function LangItem({ item, onClick }: LangItemProps) {
  return (
    <Box
      text-14
      bgGray100--hover
      rounded
      px2
      py-6
      cursorPointer
      onClick={(e) => {
        e.stopPropagation()
        onClick(item.value)
      }}
    >
      {item.label}
    </Box>
  )
}

export default memo(LangItem)
