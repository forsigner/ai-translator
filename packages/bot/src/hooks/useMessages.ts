import { useStore } from 'stook'
import { IChatMessage } from 'react-native-gifted-chat'
import { useBotContext } from '../context'
import { Message } from '../domains/message.domain'
import { useEffect, useState } from 'react'

const key = 'MESSAGE_LIST'

export function useMessages() {
  const bot = useBotContext()
  // const [messages, setMessages] = useStore<Message[]>(key, bot.messages)
  const [messages, setMessages] = useState<Message[]>(bot.messages)

  useEffect(() => {
    bot.emitter.on('ADD_MESSAGE', () => {
      setMessages([...bot.messages])
    })

    bot.emitter.on('STREAMING_MESSAGE', (text) => {
      setMessages((messages) => {
        messages[messages.length - 1].content = text
        messages[messages.length - 1].streaming = false
        return [...messages]
      })
    })

    bot.emitter.on('CLEAR_MESSAGES', () => {
      setMessages([])
    })
  }, [])

  const chatMessages = messages
    .map<IChatMessage>((item) => {
      return {
        _id: item.id,
        text: item.content,
        createdAt: item.createdAt,
        streaming: item.streaming,
        user: {
          _id: item.role === 'assistant' ? 2 : 1,
        },
      }
    })
    .reverse()

  return {
    messages,
    chatMessages,
    setMessages,
  }
}
