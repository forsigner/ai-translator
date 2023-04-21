import { Box } from '@fower/react'
import { Form } from 'fomir'
import { SettingsHeader } from './SettingsHeader'
import { useSettingsForm } from '../../hooks/useSettingsForm'

export function Settings() {
  const form = useSettingsForm()
  return (
    <Box column w-360>
      <SettingsHeader />
      <Box p4>
        <Form form={form} />
      </Box>
    </Box>
  )
}
