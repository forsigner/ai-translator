import { useBotContext } from '@ai-translator/bot'
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, IChatMessage } from 'react-native-gifted-chat'

export function Chat() {
  const bot = useBotContext()
  const [messages, setMessages] = useState<IChatMessage[]>([])

  // console.log('messages:', messages)

  useEffect(() => {
    bot.emitter.on('ADD_MESSAGE', (message) => {
      setMessages((previousMessages) => {
        return [message.toChatMessage(), ...previousMessages]
      })
    })

    bot.emitter.on('STREAMING_MESSAGE', (text) => {
      setMessages((messages) => {
        messages[0].text = text

        return [...messages]
      })
    })
  }, [bot])

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback(async (messages: IChatMessage[] = []) => {
    try {
      await bot.sendMessage(messages[0].text)
    } catch (error) {
      console.log('xx-error:', error)
    }
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onInputTextChanged={(text) => {
        if (text) bot.updateText(text)
      }}
      onSend={(messages) => {
        onSend(messages)
      }}
      user={{
        _id: 1,
      }}
    />
  )
}
