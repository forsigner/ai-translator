import { IChatMessage } from 'react-native-gifted-chat'
import { useChatContext } from '../context'
import { MessageJson } from '../domains/message.domain'
import { useEffect, useMemo, useState } from 'react'

export function useMessages() {
  const chat = useChatContext()
  const [messages, setMessages] = useState<MessageJson[]>(
    chat.messages.map((item) => item.toJSON()),
  )

  useEffect(() => {
    chat.emitter.on('ADD_MESSAGE', () => {
      setMessages([...chat.messages])
    })

    chat.emitter.on('STREAMING_MESSAGE', () => {
      setMessages(chat.messages.map((item) => item.toJSON()))
    })

    chat.emitter.on('REMOVE_MESSAGE_PAIR', () => {
      setMessages(chat.messages.map((item) => item.toJSON()))
    })

    chat.emitter.on('SELECT_BOT', () => {
      setMessages(chat.messages.map((item) => item.toJSON()))
    })

    chat.emitter.on('SET_LAYOUT', () => {
      console.log('bot.messages:', chat.messages)

      setMessages(chat.messages.map((item) => item.toJSON()))
    })

    chat.emitter.on('CLEAR_MESSAGES', () => {
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
    if (!messages.length) return null as unknown as MessageJson
    return messages[messages.length - 1]
  }, [messages])

  return {
    message,
    messages,
    chatMessages,
    setMessages,
  }
}
