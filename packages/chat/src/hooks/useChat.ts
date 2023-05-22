import { useEffect, useState } from 'react'
import { useChatContext } from '../context'
import { emitter } from '../emitter'

export function useChat() {
  const [, update] = useState<any>()
  const chat = useChatContext()

  useEffect(() => {
    emitter.on('SELECT_BOT', () => {
      update({})
    })

    emitter.on('SET_LAYOUT', () => {
      update({})
    })
  }, [chat])

  return { chat }
}
