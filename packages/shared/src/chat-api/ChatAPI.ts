import { createParser } from 'eventsource-parser'
import { ChatCompletionRequestMessage } from 'openai'
import { CompletionParams } from './types'

export const TIME_OUT_MS = 60 * 1000

export enum RequestMode {
  Boter = 'Boter',
  Proxy = 'Proxy',
  Official = 'Official',
}

interface SendMessageOptions {
  requestMode: RequestMode
  messages: ChatCompletionRequestMessage[]
  completionParams?: CompletionParams
  abortController?: AbortController
  onMessage?: (text: string) => void
}

export class ChatAPI {
  completionParams = {
    temperature: 0.8,
    top_p: 1.0,
    presence_penalty: 1.0,
    model: 'gpt-3.5-turbo',
  }

  apiKey = ''
  messages: SendMessageOptions['messages'] = []
  abortController: AbortController

  resolve: (value: string) => void

  reject: (reason?: any) => void

  opt: SendMessageOptions

  constructor(apiKey: string = '') {
    this.apiKey = apiKey
  }

  async sendMessage(opt: SendMessageOptions) {
    const { requestMode, completionParams, messages } = opt

    this.opt = opt
    this.completionParams = {
      ...this.completionParams,
      ...completionParams,
    } as any

    this.messages = messages

    this.abortController = opt.abortController || new AbortController()

    return new Promise<string>(async (resolve, reject) => {
      this.resolve = resolve
      this.reject = reject

      if (requestMode === RequestMode.Boter) {
        await this.handleBoter()
      } else if (requestMode === RequestMode.Proxy) {
        await this.handleProxy()
      } else {
        await this.handleOfficial()
      }
    })
  }

  async handleOfficial() {
    const API_HOST = 'https://api.openai.com'
    const API_PATH = '/v1/chat/completions'
    const reqTimeoutId = setTimeout(() => this.abortController.abort(), TIME_OUT_MS)

    const { resolve, reject } = this

    let responseText = ''

    try {
      const res = await fetch(`${API_HOST}${API_PATH}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...this.completionParams,
          stream: true,
          messages: this.messages,
        }),
        signal: this.abortController.signal,
      })

      clearTimeout(reqTimeoutId)

      if (!res.ok || !res.body) {
        // TODO: need to improve
        const errorRes = await res.json()
        reject(errorRes.error.message)
        return
      }

      const parser = createParser((event) => {
        if (event.type !== 'event') return
        try {
          const json = JSON.parse(event.data)
          const text = json.choices[0].delta.content
          if (text) {
            responseText += text
            this.opt?.onMessage?.(responseText)
          }
        } catch {
          //
        }
      })

      const reader = res.body.getReader()

      try {
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read()
          if (done) {
            resolve(responseText)
            break
          }
          const str = new TextDecoder().decode(value)
          parser.feed(str)
        }
      } finally {
        reader.releaseLock()
      }
    } catch (error) {
      // handle abort()
      if ((error as any)?.name == 'AbortError') {
        resolve(responseText)
        return
      }

      reject(`NetWork Error ${error}`)
    }
  }

  async handleProxy() {
    const reqTimeoutId = setTimeout(() => this.abortController.abort(), TIME_OUT_MS)

    const baseURL = 'https://styli.js.org'
    const url = `${baseURL}/api/chat-stream?apiKey=${this.apiKey}`

    const { resolve, reject } = this

    let responseText = ''

    try {
      const result = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...this.completionParams,
          stream: true,
          messages: this.messages,
        }),
        signal: this.abortController.signal,
      })

      clearTimeout(reqTimeoutId)

      if (result.ok && result.body) {
        const reader = result.body.getReader()
        const decoder = new TextDecoder()
        // onController && onController(controller)
        // eslint-disable-next-line no-constant-condition
        while (true) {
          // handle time out, will stop if no response in 10 secs
          const resTimeoutId = setTimeout(() => {
            this.abortController.abort()
          }, TIME_OUT_MS)

          const { done, value } = await reader.read()
          clearTimeout(resTimeoutId)
          const text = decoder.decode(value)
          responseText += text

          this.opt.onMessage?.(responseText)
          if (done) {
            break
          }
        }
        resolve(responseText)
      } else if (result.status === 401) {
        responseText = 'Unauthorized access, please enter access code in settings page.'
        reject(responseText)
      } else {
        reject('Error!')
        console.error('Stream Error')
      }
    } catch (error) {
      // handle abort()
      if ((error as any)?.name == 'AbortError') {
        resolve(responseText)
        return
      }

      reject(`NetWork Error ${error}`)
    }
  }

  async handleBoter() {
    const baseURL = 'https://langpt.langpt.ai'
    const content = this.messages.map((m) => m.content).join('\n')
    const { resolve, reject } = this

    let responseText = ''

    try {
      const url = `${baseURL}/api/boter/completions`

      const TIME_OUT_MS = 60 * 1000
      const reqTimeoutId = setTimeout(() => this.abortController.abort(), TIME_OUT_MS)

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
        }),
        signal: this.abortController.signal,
      })

      clearTimeout(reqTimeoutId)

      if (!res.ok || !res.body) {
        // TODO: need to improve
        const errorRes = await res.json()
        reject(errorRes.error.message)
        return
      }

      const parser = createParser((event) => {
        if (event.type !== 'event') return

        try {
          const str = JSON.parse(event.data)
          this.opt.onMessage?.(str)
          responseText = str
        } catch (e) {
          console.log('e:', e)
        }
      })

      const reader = res.body.getReader()

      try {
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read()
          if (done) {
            resolve(responseText)
            break
          }
          const str = new TextDecoder().decode(value)
          parser.feed(str)
        }
      } finally {
        reader.releaseLock()
      }
    } catch (error) {
      if ((error as any)?.name == 'AbortError') {
        reject(responseText)
        return
      }

      reject(`NetWork Error ${error}`)
    }
  }
}
