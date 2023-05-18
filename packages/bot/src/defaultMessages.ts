import { Message } from './domains/message.domain'

export const defaultMessages: Message[] = [
  Message.create({
    content: 'Hello world',
    role: 'user',
    userId: 1,
  }),

  Message.create({
    content: '你好，世界',
    role: 'assistant',
    userId: 2,
  }),
]
