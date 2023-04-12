import { Select } from '@bone-ui/select'
import { supportLanguages } from '@src/constants'

interface Option {
  label: string
  value: string
}

interface Props {
  value: string
  onChange(value: string): any
  options?: Option[]
}

export function LangSelect({ value, onChange }: Props) {
  const options: Option[] = supportLanguages.map(([value, label]) => ({ label, value }))
  const width = 100
  const containerWidth = '60vh'
  return (
    <Select
      options={options}
      value={value}
      width={width}
      containerMaxHeight={containerWidth}
      onChange={(v: string) => onChange(v)}
    />
  )
}
