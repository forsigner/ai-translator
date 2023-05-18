import { Message, MessageJson } from '../domains/message.domain'
import { AsyncStorage } from './AsyncStorage'

const key = 'MESSAGES'

export class MessageStorage {
  static async set(messages: Message[]) {
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

  static async clear() {
    await AsyncStorage.setItem(key, null)
  }
}
