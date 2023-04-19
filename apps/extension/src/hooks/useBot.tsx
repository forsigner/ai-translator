import { bots, Bot } from '@src/common/constants'
import { useStore } from 'stook'

const key = '@@AI_TRANSLATOR_BOT'

export function useBot() {
  const [bot, setBot] = useStore<Bot>(key, bots[0])
  return { bot, setBot }
}
