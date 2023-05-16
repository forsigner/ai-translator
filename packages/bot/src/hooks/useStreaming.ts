import { useBotContext } from '../context'
import { useEffect, useState } from 'react'

export function useStreaming() {
  const bot = useBotContext()
  const [streaming, setStreaming] = useState(false)

  useEffect(() => {
    bot.message.emitter.on('UPDATE_MESSAGE_STREAMING', (streaming) => {
      setStreaming(streaming)
    })
  }, [bot])

  useEffect(() => {
    bot.message.emitter.on('UPDATE_MESSAGE_CONTENT', () => {
      setStreaming(false)
    })
  }, [bot])

  return {
    streaming,
    setStreaming,
  }
}
