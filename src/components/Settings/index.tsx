import { Box } from '@fower/react'
import { useSettingsForm } from '@src/hooks/useSettingsForm'
import { Form } from 'fomir'
import { SettingsHeader } from './SettingsHeader'

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
