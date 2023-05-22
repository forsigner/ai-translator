import type { Params } from '../domains/chat.domain'
import { useChatContext } from '../context'
import { useEffect, useState } from 'react'

export function useParams() {
  const chat = useChatContext()
  const [params, setParams] = useState<Params>(chat.params)

  useEffect(() => {
    chat.emitter.on('SELECT_BOT', () => {
      setParams({ ...chat.params })
    })
  }, [])

  async function updateParams(params: any) {
    setParams(params)
    chat.updateParams(params)
  }

  return { params, updateParams }
}
