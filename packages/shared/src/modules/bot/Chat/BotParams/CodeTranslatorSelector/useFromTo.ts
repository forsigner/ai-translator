import { getState, useStore } from 'stook'

interface State {
  to: string
  from: string
}

const key = 'FROM_TO'

export function useFromTo() {
  const [state, setFromTo] = useStore(key, {
    from: 'en',
    to: 'zh-cn',
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

export function getFromToState(): State {
  return getState(key)
}
