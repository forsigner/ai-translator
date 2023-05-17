import { langMap } from '@ai-translator/bot'
import { useStore } from 'stook'

export function useTargetLang() {
  const [lang, setLang] = useStore('TargetLang', 'en')
  const langName = langMap.get(lang)
  return {
    lang,
    langName,
    setLang,
  }
}
