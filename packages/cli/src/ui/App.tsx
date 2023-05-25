import React, { useState, useEffect } from 'react'
import { Text } from 'ink'
import Spinner from 'ink-spinner'
import { ChatgptAPI, RequestMode } from '@ai-translator/chatgpt-api'
import { MessageBuilder } from '../MessageBuilder'
import { readConfig } from '../config'
import { langMap } from '../langMap'
import { detectLanguage } from '../detectLanguage'

type Props = {
  input: string[]
}

const API_BASE_URL = 'https://translator.langpt.ai'

async function getTargetLang(): Promise<string> {
  const config = await readConfig()
  let to = 'English'
  if (config?.to) {
    const arr = config.to.split(',')

    if (arr?.[0]) {
      if (langMap.get(arr[0])) {
        return langMap.get(arr[0])!
      }
    }
  }
  return to
}

console.log('----:', detectLanguage('你好'))

export function App({ input = [] }: Props) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

  const text = input.join(' ')

  async function sendMessage() {
    if (!text) {
      setContent('Please input texts to translate')
      setLoading(false)
      return
    }

    try {
      const api = new ChatgptAPI({})
      const to = await getTargetLang()

      const messageBuilder = new MessageBuilder({
        text,
        to,
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
