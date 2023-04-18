import React, { FC } from 'react'
import { NodeProps } from 'fomir'
import { RadioGroup as BoneRadioGroup, Radio } from '@bone-ui/radio'
import { FormField } from '../FormField'
import { RadioGroupNode } from '../bone-ui-node'
import { Box } from '@fower/react'

export const RadioGroup: FC<NodeProps<RadioGroupNode>> = (props) => {
  const { value, options = [], componentProps } = props.node

  return (
    <FormField node={props.node}>
      <BoneRadioGroup value={value} onChange={props.handler.handleChange} {...componentProps}>
        {options.map((item) => (
          <Radio key={item.value} value={item.value}>
            <Box text-14>{item.label}</Box>
          </Radio>
        ))}
      </BoneRadioGroup>
    </FormField>
  )
}
