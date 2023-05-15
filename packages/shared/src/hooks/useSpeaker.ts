import { useStore } from 'stook'
import { useRef, useEffect } from 'react'
import { Speaker } from '../services/speaker'

const key = 'BOT_AUDIO_PLAYING'

export function useSpeaker() {
  const speakerRef = useRef(new Speaker())
  const speaker = speakerRef.current
  const [playing, setPlaying] = useStore<boolean>(key, speaker.playing)

  useEffect(() => {
    speaker.emitter.on('PLAYING_STATUS_CHANGE', (status) => {
      setPlaying(status)
    })
  }, [])

  return { playing, speaker }
}
