import { Buffer } from 'buffer/'
import { toast } from 'bone-ui'
import { updatePlaying } from './hooks/usePlaying'

const API_BASE_URL = 'https://ai-translator.langpt.ai'

export class Speaker {
  playing = false

  audioMap = new Map<string, HTMLAudioElement>()

  audio: HTMLAudioElement

  url = `${API_BASE_URL}/api/tts`
  //  url = `http://localhost:8002/api/tts`

  private async loadAudioData(text: string, languageCode: string) {
    if (!text) return
    const res = await fetch(this.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, languageCode }),
    })

    const audioBase64 = await res.text()
    // Decode the received base64-encoded audio data
    const binaryData = Buffer.from(audioBase64, 'base64')
    const arrayBuffer = new ArrayBuffer(binaryData.length)
    const uint8Array = new Uint8Array(arrayBuffer)
    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData[i]
    }

    return arrayBuffer
  }

  play = async (text: string, languageCode: string) => {
    try {
      const id = `<${languageCode}>:${text}`
      if (this.audioMap.get(id)) {
        this.audio = this.audioMap.get(id)!
      } else {
        const audioData = await this.loadAudioData(text, languageCode)
        const blob = new Blob([audioData!], { type: 'audio/mpeg' })
        const url = URL.createObjectURL(blob)
        this.audio = new Audio(url)

        this.audioMap.set(id, this.audio)
      }

      updatePlaying(true)
      this.playing = true
      await this.audio.play()
    } catch (error) {
      updatePlaying(false)
      this.playing = false
      toast.warning('Speaker is bad')
    }

    this.audio.onended = () => {
      updatePlaying(false)
      this.playing = false
    }
  }

  stop = () => {
    updatePlaying(false)
    this.audio.pause()
    this.audio.currentTime = 0
    this.playing = false
  }
}
