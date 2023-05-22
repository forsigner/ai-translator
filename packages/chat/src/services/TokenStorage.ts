import { AsyncStorage } from './AsyncStorage'

enum Keys {
  Token = 'TOKEN',
}

export class TokenStorage {
  static async set(token: string) {
    await AsyncStorage.setItem(Keys.Token, token)
  }

  static async get(): Promise<string> {
    const token = await AsyncStorage.getItem(Keys.Token)
    return token
  }
}
