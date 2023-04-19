import { SwitchHorizontalOutline } from '@bone-ui/icons'
import { Box } from '@fower/react'
import { useFromTo } from '@src/components/FromTo/useFromTo'
import { LangSelect } from './LangSelect'

export function FromTo() {
  const { from, to, setFrom, setTo, reverse } = useFromTo()
  return (
    <Box toCenterY columnGap-4>
      <LangSelect value={from} onChange={setFrom} />
      <SwitchHorizontalOutline
        cursorPointer
        gray500
        gray600--hover
        size={16}
        onClick={() => {
          reverse()
        }}
      />
      <LangSelect value={to} onChange={setTo} />
    </Box>
  )
}
