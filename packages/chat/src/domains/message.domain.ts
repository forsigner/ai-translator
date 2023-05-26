import { ChatCompletionResponseMessageRoleEnum } from 'openai'
import { v4 } from 'uuid'
import { IChatMessage } from 'react-native-gifted-chat'

export type TranslateResult = {
  text: string
  textArray: string[]
  pronunciation: string
  hasCorrectedLang: boolean
  src: string
  hasCorrectedText: boolean
  correctedText: boolean
  translations: any[]
}

export type DictResult = {
  type: string
  data: {
    l: string
    web: Array<{
      key: string
      value: string[]
    }>

    dict: { url: string }
    basic: {
      wfs: Array<{
        wf: {
          name: string
          value: string
        }
      }>
      explains: string[]
      phonetic: string
      exam_type: string[]
      'uk-speech': string
      'us-speech': string
      'uk-phonetic': string
      'us-phonetic': string
    }
    query: string
    isWord: boolean
    webdict: { url: string }
    speakUrl: string
    errorCode: string
    requestId: string
    tSpeakUrl: string
    translation: string[]
    returnPhrase: string[]
    mTerminalDict: { url: string }
  }
}

export type MessageJson = {
  id: number | string

  botSlug: string

  userId: number

  content: any

  role: ChatCompletionResponseMessageRoleEnum

  extra: any

  streaming: boolean

  layout: string

  createdAt: Date
}

export type CreateMessageInput = {
  botSlug: string

  content: string

  role: ChatCompletionResponseMessageRoleEnum

  userId: number

  layout: string

  streaming?: boolean
}

export function isDictContent(content: any): content is DictResult {
  if (typeof content === 'object') {
    if (content?.type === 'youdao' && content?.data?.isWord) {
      return true
    }
  }
  return false
}

export function isJsonContent(content: any): content is Record<string, any> {
  if (typeof content === 'object' && content?.type !== 'youdao') {
    return true
  }

  return false
}

export class Message {
  id: number | string

  botSlug: string

  userId: number

  content: any

  role: ChatCompletionResponseMessageRoleEnum

  extra: any

  layout: string

  streaming: boolean = false

  createdAt: Date

  static create(input: CreateMessageInput) {
    const message = new Message()

    message.id = v4()
    message.userId = input.userId
    message.content = input.content
    message.role = input.role
    message.createdAt = new Date()
    message.botSlug = input.botSlug
    message.layout = input.layout

    if (typeof input.streaming !== 'undefined') {
      message.streaming = input.streaming
    }
    return message
  }

  static fromJSON(json: MessageJson): Message {
    const message = new Message()

    message.id = json.id
    message.botSlug = json.botSlug
    message.userId = json.userId
    message.content = json.content
    message.role = json.role
    message.extra = json.extra
    message.streaming = json.streaming
    message.createdAt = json.createdAt

    return message
  }

  toJSON() {
    return {
      id: this.id,
      botSlug: this.botSlug,
      userId: this.userId,
      content: this.content,
      role: this.role,
      extra: this.extra,
      layout: this.layout,
      streaming: this.streaming,
      createdAt: this.createdAt,
    }
  }

  toContentString() {
    if (typeof this.content === 'string') {
      return this.content
    }

    if (isDictContent(this.content)) {
      return JSON.stringify(this.content.data)
    }

    if (isJsonContent(this.content)) {
      return JSON.stringify(this.content.data, null, 2)
    }

    return this.content
  }

  toChatMessage = () => {
    return {
      _id: this.id,
      text: this.content,
      createdAt: new Date(),
      user: {
        _id: this.userId,
      },
    } as IChatMessage
  }
}
