import { getState, mutate, useStore } from 'stook'

const key = 'Translator'

type State = {
  x: number
  y: number
  visible: boolean
}

export function useTranslator() {
  const [state, setTranslator] = useStore<State>(key, {
    visible: false,
  } as State)

  return {
    ...state,
    setTranslator,
  }
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
