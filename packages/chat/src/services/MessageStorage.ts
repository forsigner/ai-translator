import { Message, MessageJson } from '../domains/message.domain'
import { AsyncStorage } from './AsyncStorage'

const key = 'MESSAGES'

export class MessageStorage {
  static maxSize = 200

  static async set(messages: Message[]) {
    if (messages.length > MessageStorage.maxSize) {
      messages = messages.slice(messages.length - MessageStorage.maxSize, messages.length)
    }

    await AsyncStorage.setItem(
      key,
      messages.map((message) => message.toJSON()),
    )
  }

  static async get(): Promise<Message[]> {
    const messages: MessageJson[] | undefined = await AsyncStorage.getItem(key)
    if (!messages) return []
    return messages.map((item) => Message.fromJSON(item))
  }

  static async clear(botSlug: string) {
    const messages = await MessageStorage.get()
    const filteredMessages = messages.filter((message) => message.botSlug !== botSlug)
    await AsyncStorage.setItem(key, filteredMessages)
  }

  static async add(data: Message) {
    const messages = await MessageStorage.get()
    messages.push(data)
    await MessageStorage.set(messages)
  }

  static async delete() {
    const messages = await MessageStorage.get()
    messages.pop()
    await MessageStorage.set(messages)
  }

  static async update(message: Message) {
    const messages = await MessageStorage.get()
    const index = messages.findIndex((item) => item.id === message.id)
    messages[index] = message
    await MessageStorage.set(messages)
  }

  static async deleteMessagePair(id: string | number) {
    const messages = await MessageStorage.get()

    const index = messages.findIndex((message) => message.id === id)
    messages.splice(index - 1, 2)

    await MessageStorage.set(messages)
  }

  static async queryBotMessages(botSlug: string) {
    const messages = await MessageStorage.get()
    return messages.filter((message) => message.botSlug === botSlug)
  }
}
