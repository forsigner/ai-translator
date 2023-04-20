import { useStore } from 'stook'
import { useBotContext } from '../context'
import { useEffect } from 'react'
import { emitter } from '../emitter'
import type { Params } from '../bot.domain'

const key = 'BOT_PARAMS'

export function useParams() {
  const bot = useBotContext()
  const [params, setParams] = useStore<Params>(key, bot.params)

  // useEffect(() => {
  //   emitter.on('SELECT_BOT', (data) => {
  //     setParams(bot.params)
  //   })
  // }, [bot, setParams])

  async function updateParams(params: any) {
    const result = setParams(params)
    bot.updateParams(result as any)
  }

  return { params, updateParams }
}
