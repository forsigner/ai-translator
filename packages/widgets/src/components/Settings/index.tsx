import React from 'react'
import { Box } from '@fower/react'
import { Form } from 'fomir'
import { SettingsHeader } from './SettingsHeader'
import { useSettingsForm } from '../../hooks/useSettingsForm'
// import { UserInfo } from './UserInfo'
import { Button } from 'bone-ui'

interface Props {
  title?: string
  width?: number | string
}

export function Settings({ title, width = 360 }: Props) {
  const form = useSettingsForm()

  return (
    <Box column w={width}>
      <SettingsHeader title={title} />
      {/* {isExtension && <UserInfo />} */}
      <Box p4>
        <Form form={form} suffix={<Button type="submit">Save</Button>} />
      </Box>
    </Box>
  )
}
