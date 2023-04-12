import { Select } from '@bone-ui/select'
import { Box } from '@fower/react'

interface Props {
  from: string
  to: string
}

export function FromTo({ from, to }: Props) {
  return (
    <Box toCenterY>
      <Select options={[]} />
      <Box>-</Box>
      <Select options={[]} />
    </Box>
  )
}
