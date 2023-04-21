import { baseURL } from '@src/common/constants'
import { Buffer } from 'buffer/'

export function playAudio(text: string, languageCode: string) {
  if (!text) return
  // Send a fetch request to the server
  const url = `${baseURL}/api/tts`
  // const url = `http://localhost:8002/api/tts`
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, languageCode }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to receive audio response')
      }
      return response.text()
    })
    .then((audioBase64) => {
      // Decode the received base64-encoded audio data
      const binaryData = Buffer.from(audioBase64, 'base64')
      const arrayBuffer = new ArrayBuffer(binaryData.length)
      const uint8Array = new Uint8Array(arrayBuffer)
      for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData[i]
      }

      // Play the received audio response
      play(arrayBuffer)
    })
    .catch((error) => {
      console.error(error)
    })
}
// Play the received audio response
function play(audioData) {
  const blob = new Blob([audioData], { type: 'audio/mpeg' })
  const url = URL.createObjectURL(blob)
  const audio = new Audio(url)
  audio.play()
}
