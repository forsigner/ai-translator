import { ChatCompletionResponseMessageRoleEnum } from 'openai'
import { v4 } from 'uuid'
import { IChatMessage } from 'react-native-gifted-chat'

export type MessageJson = {
  id: number | string

  botId: number

  userId: number

  content: any

  role: ChatCompletionResponseMessageRoleEnum

  extra: any

  streaming: boolean

  createdAt: Date
}

export type CreateMessageInput = {
  content: string

  role: ChatCompletionResponseMessageRoleEnum

  userId: number

  botId?: number

  streaming?: boolean
}

export class Message {
  id: number | string

  botId: number

  userId: number

  content: any

  role: ChatCompletionResponseMessageRoleEnum

  extra: any

  streaming: boolean = false

  createdAt: Date

  static create(input: CreateMessageInput) {
    try {
      const message = new Message()

      message.id = v4()
      message.userId = input.userId
      message.content = input.content
      message.role = input.role
      message.createdAt = new Date()

      if (typeof input.botId !== 'undefined') {
        message.botId = input.botId
      }

      if (typeof input.streaming !== 'undefined') {
        message.streaming = input.streaming
      }
      return message
    } catch (error) {
      console.log('errro.....:', error)
      throw new Error('')
    }
  }

  static fromJSON(json: MessageJson): Message {
    const message = new Message()

    message.id = json.id
    message.botId = json.botId
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
      botId: this.botId,
      userId: this.userId,
      content: this.content,
      role: this.role,
      extra: this.extra,
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
