import { IChatMessage } from 'react-native-gifted-chat'
import { useBotContext } from '../context'
import { Message, MessageJson } from '../domains/message.domain'
import { useEffect, useMemo, useState } from 'react'

export function useMessages() {
  const bot = useBotContext()
  const [messages, setMessages] = useState<MessageJson[]>(bot.messages.map((item) => item.toJSON()))

  useEffect(() => {
    bot.emitter.on('ADD_MESSAGE', () => {
      setMessages([...bot.messages])
    })

    bot.emitter.on('STREAMING_MESSAGE', () => {
      setMessages(bot.messages.map((item) => item.toJSON()))
    })

    bot.emitter.on('REMOVE_MESSAGE_PAIR', () => {
      setMessages(bot.messages.map((item) => item.toJSON()))
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

  const message = useMemo(() => {
    if (!messages.length) return {} as MessageJson
    return messages[messages.length - 1]
  }, [messages])

  return {
    message,
    messages,
    chatMessages,
    setMessages,
  }
}
