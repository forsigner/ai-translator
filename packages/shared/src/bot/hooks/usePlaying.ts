import { mutate, useStore } from 'stook'
import { useBotContext } from '../context'

const key = 'BOT_AUDIO_PLAYING'

export function usePlaying() {
  const bot = useBotContext()
  const [playing, setPlaying] = useStore<boolean>(key, bot.speaker.playing)

  return { playing, setPlaying }
}

export function updatePlaying(playing: boolean) {
  mutate(key, playing)
}
