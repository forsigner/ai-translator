import { useChatContext } from '../context'
import { MessageJson } from '../domains/message.domain'
import { useEffect, useMemo, useState } from 'react'
import { BotType } from '../constants'

export function useBots() {
  const chat = useChatContext()
  const [bots, setBots] = useState<BotType[]>(chat.bots)

  useEffect(() => {
    chat.emitter.on('ADD_MESSAGE', () => {
      //
    })
  }, [])

  return {
    bots,
    setBots,
  }
}
