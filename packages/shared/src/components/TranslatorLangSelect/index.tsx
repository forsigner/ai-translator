import { Option, Select } from '../Select'
import { useLangFromTo } from './useLangFromTo'
import { supportLanguages } from '../../common'

export function TranslatorLangSelect() {
  const options: Option[] = supportLanguages.map(([value, label]) => ({ label, value }))
  // const { from, to, setFrom, setTo, reverse } = useLangFromTo()
  const { to = '', setTo } = useLangFromTo()
  return <Select options={options} value={to} onChange={setTo} />
}
