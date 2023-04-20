import { SwitchHorizontalOutline } from '@bone-ui/icons'
import { Box } from '@fower/react'
import { Option, Select } from '../Select'
import { supportLanguages } from '@src/common/constants'
import { useLangFromTo } from './useLangFromTo'

export function LangFromTo() {
  const options: Option[] = supportLanguages.map(([value, label]) => ({ label, value }))
  const { from, to, setFrom, setTo, reverse } = useLangFromTo()
  return (
    <Box toCenterY columnGap-4>
      <Select options={options} value={from} onChange={setFrom} />
      <SwitchHorizontalOutline
        cursorPointer
        gray500
        gray600--hover
        size={16}
        onClick={() => {
          reverse()
        }}
      />
      <Select options={options} value={to} onChange={setTo} />
    </Box>
  )
}
