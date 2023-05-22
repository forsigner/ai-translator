import { BotType } from '../constants'
import { AsyncStorage } from './AsyncStorage'

const key = 'BOTS'

export class BotStorage {
  static async set(bots: BotType[]) {
    await AsyncStorage.setItem(key, bots)
  }

  static async get(): Promise<BotType[]> {
    const bot: BotType[] | undefined = await AsyncStorage.getItem(key)
    if (!bot) return []
    return bot
  }
}
