import { RadioGroup } from 'bone-ui'
import { Box } from '@fower/react'
import { PlanInterval } from '@langpt/api-sdk'
import { check } from 'prettier'

interface Props {
  value: any
  onChange(value: any): any
}

export const PlanIntervalSelect = ({ value, onChange }: Props) => {
  const width = 320
  return (
    <Box bgBrand100 roundedFull toCenterY w={width} p-2>
      <RadioGroup
        value={value}
        onChange={onChange}
        options={[
          { label: 'Monthly', value: PlanInterval.Month },
          { label: 'Yearly(Save 20%)', value: PlanInterval.Year },
        ]}
        renderItem={({ item, checked }) => {
          return (
            <Box
              transitionAll
              toCenter
              w={width / 2}
              px2
              py3
              flex-1
              roundedFull
              bgBrand500={checked}
              white={checked}
              fontSemibold={checked}
              fontMedium={!checked}
              brand500={!checked}
            >
              {item.label}
            </Box>
          )
        }}
      />
    </Box>
  )
}
