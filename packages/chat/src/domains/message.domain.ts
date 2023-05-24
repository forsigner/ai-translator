import { ChatCompletionResponseMessageRoleEnum } from 'openai'
import { v4 } from 'uuid'
import { IChatMessage } from 'react-native-gifted-chat'

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