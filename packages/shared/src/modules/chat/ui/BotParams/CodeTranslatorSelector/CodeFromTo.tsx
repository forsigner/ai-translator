import { SwitchHorizontalOutline } from '@bone-ui/icons'
import { Box } from '@fower/react'
import { LangSelect } from './LangSelect'

interface Props {
  value: [string, string]
  onChange(value: [string, string]): void
}

export function CodeFromTo({ value = ['en', 'zh-cn'], onChange }: Props) {
  const [from, to] = value

  return (
    <Box toCenterY columnGap-4>
      <LangSelect
        value={from}
        onChange={(from) => {
          onChange([from, to])
        }}
      />
      <SwitchHorizontalOutline
        cursorPointer
        gray500
        gray600--hover
        size={16}
        onClick={() => {
          onChange([to, from])
        }}
      />
      <LangSelect
        value={to}
        onChange={(to) => {
          onChange([from, to])
        }}
      />
    </Box>
  )
}
