import type { Params } from '../domains/chat.domain'
import { useEffect, useState } from 'react'
import { useChatContext } from '../context'

export function useParams() {
  const chat = useChatContext()
  const [params, setParams] = useState<Params>(chat.params)

  useEffect(() => {
    chat.emitter.on('SELECT_BOT', () => {
      setParams({ ...chat.params })
    })
  }, [chat])

  async function updateParams(params: any) {
    setParams(params)
    chat.updateParams(params)
  }

  return { params, updateParams }
}
