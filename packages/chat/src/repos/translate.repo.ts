import { API_BASE_URL } from '../constants'
import { TranslateResult } from '../domains/message.domain'

interface TranslateInput {
  to: string
  from: string
  text: string
}

export class TranslateRepo {
  translate = async (input: TranslateInput) => {
    const url = `${API_BASE_URL}/api/translate`
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    })

    const json = await res.json()

    return json as TranslateResult
  }
}
