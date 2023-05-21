import type { Params } from '../domains/bot.domain'
import { useBotContext } from '../context'
import { useEffect, useState } from 'react'

export function useParams() {
  const bot = useBotContext()
  const [params, setParams] = useState<Params>(bot.params)

  useEffect(() => {
    bot.emitter.on('SELECT_BOT', () => {
      setParams({ ...bot.params })
    })
  }, [])

  async function updateParams(params: any) {
    setParams(params)
    bot.updateParams(params)
  }

  return { params, updateParams }
}
