import { useParams } from '@src/bot'
import { getState } from 'stook'

interface State {
  to: string
  from: string
}

const key = 'LANG_FROM_TO'

export function useLangFromTo() {
  const { params, updateParams } = useParams()

  function setTo(to: string) {
    updateParams((s) => {
      s.to = to
    })
  }

  function setFrom(from: string) {
    updateParams((s) => {
      s.from = from
    })
  }

  function reverse() {
    updateParams((s) => {
      s.from = params.to
      s.to = params.from
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
