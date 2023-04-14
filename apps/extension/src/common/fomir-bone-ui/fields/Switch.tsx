import { ChangeEvent, FC } from 'react'
import { NodeProps } from 'fomir'
import { Switch as BoneSwitch } from '@bone-ui/switch'
import { FormField } from '../FormField'
import { Box } from '@fower/react'
import { SwitchNode } from '../bone-ui-node'

export const Switch: FC<NodeProps<SwitchNode>> = (props) => {
  const { value, label, componentProps } = props.node

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    props.handler.handleChange(e.target.checked)
  }

  return (
    <FormField node={props.node} showLabel={false} toBetween>
      <Box flex-1 textSM fontSemibold>
        {label}
      </Box>
      <BoneSwitch {...componentProps} checked={value} onChange={handleChange}></BoneSwitch>
    </FormField>
  )
}
