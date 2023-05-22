import { getState } from 'stook'
import { useParams } from '@ai-translator/bot'

interface State {
  to: string
  from: string
}

const key = 'LANG_FROM_TO'

export function useLangFromTo() {
  const { params, updateParams } = useParams()

  function setTo(to: string) {
    updateParams({
      ...params,
      to,
    })
  }

  function setFrom(from: string) {
    updateParams({
      ...params,
      from,
    })
  }

  function reverse() {
    const to = params.to
    const from = params.from
    updateParams({
      from: to,
      to: from,
    })
  }

  return {
    ...params,
    setTo,
    setFrom,
    reverse,
    setFromTo: updateParams,
  }
}

export function getLangFromToState(): State {
  return getState(key)
}
