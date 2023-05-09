import React, { useState, useEffect } from 'react'
import { Text } from 'ink'
import Spinner from 'ink-spinner'
import { ChatgptAPI, RequestMode } from '@ai-translator/chatgpt-api'
import { MessageBuilder } from './MessageBuilder.js'

type Props = {
  input: string[]
}

const API_BASE_URL = 'https://ai-translator.langpt.ai'

export default function App({ input = [] }: Props) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

  const text = input.join(' ')

  async function sendMessage() {
    if (!text) {
      setContent('Please input texts to translate')
      setLoading(false)
      return
    }

    const api = new ChatgptAPI('')
    try {
      const messageBuilder = new MessageBuilder({
        text,
        to: '简体中文',
      })

      await api.sendMessage({
        baseURL: API_BASE_URL,
        deviceId: 'qwerty',
        token: '',
        requestMode: RequestMode.Unofficial,
        messages: messageBuilder.buildMessages(),
        onMessage(text) {
          setContent(text)
        },
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    sendMessage()
  }, [])

  if (loading) {
    return (
      <Text>
        <Text color="green">
          <Spinner type="dots" />
        </Text>
        {' translating...'}
      </Text>
    )
  }

  return (
    <Text>
      <Text color="green">{content}</Text>;
    </Text>
  )
}
