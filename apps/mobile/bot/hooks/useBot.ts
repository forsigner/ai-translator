import { useEffect, useState } from 'react'
import { useBotContext } from '../context'
import { emitter } from '../emitter'

export function useBot() {
  const [, update] = useState<any>()
  const bot = useBotContext()

  useEffect(() => {
    emitter.on('SELECT_BOT', (data) => {
      update({})
    })
  }, [bot])

  return { bot }
}
