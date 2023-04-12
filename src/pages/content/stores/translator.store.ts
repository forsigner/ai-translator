import { getState, mutate, useStore } from 'stook'

const key = 'Translator'

type State = {
  x: number
  y: number
  visible: boolean
  result: string
  streaming: boolean
}

export function useTranslator() {
  const [state, setTranslator] = useStore<State>(key, {
    visible: false,
    result: '',
    streaming: false,
  } as State)

  function setStreaming(streaming: boolean) {
    setTranslator((state) => {
      state.streaming = streaming
    })
  }
  return {
    ...state,
    setTranslator,
    setStreaming,
  }
}

export function updateTranslateResult(value: string) {
  mutate(key, (state: State) => {
    state.result = value
    state.streaming = false
  })
}

export function showTranslator(x: number, y: number) {
  mutate(key, (state: State) => {
    state.visible = true
    state.x = x
    state.y = y
  })
}

export function hideTranslator() {
  mutate(key, (state: State) => {
    state.visible = false
  })
}

export function getTranslatorState(): State {
  return getState(key)
}

export function setStreaming(streaming: boolean) {
  mutate(key, (state: State) => {
    state.streaming = streaming
  })
}
