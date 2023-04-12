import { getState, mutate, useStore } from 'stook'

const key = 'Message'

type State = {
  content: string
  streaming: boolean
}

export function useMessage() {
  const [state, setMessage] = useStore<State>(key, {
    content: '',
    streaming: false,
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

export function updateMessage(value: string) {
  mutate(key, (state: State) => {
    state.content = value
    state.streaming = false
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
