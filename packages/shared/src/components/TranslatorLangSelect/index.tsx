import { Option, Select } from '../Select'
import { useLangFromTo } from './useLangFromTo'
import { supportLanguages } from '../../common'

interface Props {
  containerHeight?: number | string
}

export function TranslatorLangSelect({ containerHeight }: Props) {
  const options: Option[] = supportLanguages.map(([value, label]) => ({ label, value }))
  // const { from, to, setFrom, setTo, reverse } = useLangFromTo()
  const { to = '', setTo } = useLangFromTo()
  return <Select containerHeight={containerHeight} options={options} value={to} onChange={setTo} />
}
