import { ReactNode } from 'react'
import { getState, mutate, useStore } from 'stook'

const key = 'Message'

type State = {
  content: ReactNode
  streaming: boolean
  isWordMode: boolean
}

export function useMessage() {
  const [state, setMessage] = useStore<State>(key, {
    content: '',
    streaming: false,
    isWordMode: false,
  } as State)

  function setStreaming(streaming: boolean) {
    setMessage((state) => {
      state.streaming = streaming
    })
  }

  return {
    ...state,
    setMessage,
    setStreaming,
  }
}

export function updateMessage(value: ReactNode, isWordMode = false) {
  mutate(key, (state: State) => {
    state.content = value
    state.streaming = false
    state.isWordMode = isWordMode
  })
}

export function updateStreaming(streaming: boolean) {
  mutate(key, (state: State) => {
    state.streaming = streaming
  })
}

export function getMessageState(): State {
  return getState(key)
}
