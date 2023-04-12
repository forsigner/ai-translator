import { getState, mutate, useStore } from 'stook'

const key = 'Text_Selection'

type State = {
  text: string
  selected?: boolean
}

export function useSelection() {
  const [state] = useStore<State>(key, { text: '' } as State)
  return {
    ...state,
  }
}

export function setSelectedText(text: string) {
  mutate(key, { text })
}

export function getSelectionState(): State {
  return getState(key)
}
