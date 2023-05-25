import { supportLanguages, useFromTo } from '@ai-translator/chat'
import { Option, Select } from '../Select'

interface Props {
  containerHeight?: number | string
}

export function TranslatorLangSelector({ containerHeight }: Props) {
  const options: Option[] = supportLanguages.map(([value, label]) => ({ label, value }))
  const { to = '', setTo } = useFromTo()
  return <Select containerHeight={containerHeight} options={options} value={to} onChange={setTo} />
}
