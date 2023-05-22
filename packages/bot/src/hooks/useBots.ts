import { useBotContext } from '../context'
import { MessageJson } from '../domains/message.domain'
import { useEffect, useMemo, useState } from 'react'
import { BotType } from '../constants'

export function useBots() {
  const bot = useBotContext()
  const [bots, setBots] = useState<BotType[]>(bot.bots)

  useEffect(() => {
    bot.emitter.on('ADD_MESSAGE', () => {
      //
    })
  }, [])

  return {
    bots,
    setBots,
  }
}
