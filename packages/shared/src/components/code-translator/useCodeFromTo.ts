import { getState, useStore } from 'stook'

interface State {
  to: string
  from: string
}

const key = 'CODE_FROM_TO'

export function useCodeFromTo() {
  const [state, setFromTo] = useStore(key, {
    from: 'JavaScript',
    to: 'Python',
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

export function getCodeFromToState(): State {
  return getState(key)
}
