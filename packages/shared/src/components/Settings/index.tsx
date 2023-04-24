import { Box } from '@fower/react'
import { Form } from 'fomir'
import { SettingsHeader } from './SettingsHeader'
import { useSettingsForm } from '../../hooks/useSettingsForm'
import { useSession } from '../../hooks'
import { UserInfo } from './UserInfo'

interface Props {
  title?: string
}

export function Settings({ title }: Props) {
  const form = useSettingsForm()
  return (
    <Box column w-360>
      <SettingsHeader title={title} />

      <UserInfo />

      <Box p4>
        <Form form={form} />
      </Box>
    </Box>
  )
}
