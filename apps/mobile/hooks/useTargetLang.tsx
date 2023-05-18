import { langMap, useBotContext } from '@ai-translator/bot'
import { useCallback, useEffect } from 'react'
import { useStore } from 'stook'

export function useTargetLang() {
  const bot = useBotContext()
  const [lang, setLang] = useStore('TargetLang', bot.params.to || 'en')
  const langName = langMap.get(lang)

  const syncToParams = useCallback(
    async function (newLang: string) {
      bot.updateParams({
        to: newLang,
      })
    },
    [bot],
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
