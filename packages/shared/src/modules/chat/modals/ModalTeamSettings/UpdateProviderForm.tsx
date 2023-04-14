import { Form } from 'fomir'
import { useUpdateProviderForm } from '../../hooks/useUpdateProviderForm'
import { Provider } from '@ai-translator/api-sdk'

interface Props {
  provider: Provider
}

export const UpdateProviderForm = ({ provider }: Props) => {
  const form = useUpdateProviderForm(provider)
  return <Form form={form} />
}
