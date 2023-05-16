import { useBotContext } from '../context'
import { useEffect, useState } from 'react'

export function useMessageContent() {
  const bot = useBotContext()
  const [content, setContent] = useState('')

  useEffect(() => {
    bot.message.emitter.on('UPDATE_MESSAGE_CONTENT', (content) => {
      setContent(content)
    })
  }, [bot])

  return {
    content,
    setContent,
  }
}
