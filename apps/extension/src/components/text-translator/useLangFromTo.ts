import { getState, useStore } from 'stook'

interface State {
  to: string
  from: string
}

const key = 'LANG_FROM_TO'

export function useLangFromTo() {
  const [state, setFromTo] = useStore(key, {
    from: 'en',
    to: 'zh-Hans',
  } as State)

  function setTo(to: string) {
    setFromTo((s) => {
      s.to = to
    })
  }

  function setFrom(from: string) {
    setFromTo((s) => {
      s.from = from
    })
  }

  function reverse() {
    setFromTo((s) => {
      s.from = state.to
      s.to = state.from
    })
  }

  return {
    ...state,
    setTo,
    setFrom,
    reverse,
    setFromTo,
  }
}

export function getLangFromToState(): State {
  return getState(key)
}
