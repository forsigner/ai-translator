import { ChatCompletionResponseMessageRoleEnum } from 'openai'
import { IChatMessage } from 'react-native-gifted-chat'

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

  content: string

  role: ChatCompletionResponseMessageRoleEnum

  extra: any

  streaming: boolean = false

  createdAt: Date

  constructor(input: CreateMessageInput) {
    this.id = Date.now().toString() + Math.random()
    this.userId = input.userId
    this.content = input.content
    this.role = input.role

    if (typeof input.botId !== 'undefined') {
      this.botId = input.botId
    }

    if (typeof input.streaming !== 'undefined') {
      this.streaming = input.streaming
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
