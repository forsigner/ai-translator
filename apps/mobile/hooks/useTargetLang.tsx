import { langMap, useChatContext } from '@ai-translator/chat'
import { useCallback, useEffect } from 'react'
import { useStore } from 'stook'

export function useTargetLang() {
  const chat = useChatContext()
  const [lang, setLang] = useStore('TargetLang', chat.params.to || 'en')
  const langName = langMap.get(lang)

  const syncToParams = useCallback(
    async function (newLang: string) {
      chat.updateParams({
        to: newLang,
      })
    },
    [chat],
  )

  useEffect(() => {
    syncToParams(lang)
  }, [lang, syncToParams])

  return {
    lang,
    langName,
    setLang,
  }
}
