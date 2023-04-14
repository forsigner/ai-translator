import { getState, mutate, useStore } from 'stook'

const key = 'Text_for_translate'

type State = {
  text: string
  selected?: boolean
}

export function useText() {
  const [state, setState] = useStore<State>(key, { text: '' } as State)
  const setText = (value: string) => {
    setState((state) => {
      state.text = value
    })
  }
  return {
    ...state,
    setText,
  }
}

export function updateText(text: string) {
  mutate(key, { text })
}

export function getTextState(): State {
  return getState(key)
}
