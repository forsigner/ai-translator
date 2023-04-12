import { mutate, useStore } from 'stook'

const key = 'Thumbnail'

type State = {
  x: number
  y: number
  visible: boolean
}

export function useThumbnail() {
  const [state, setThumbnail] = useStore<State>(key, { visible: false } as State)
  return {
    x: state.x,
    y: state.y,
    setState: setThumbnail,
  }
}

export function showThumbnail(x: number, y: number) {
  mutate(key, (state: State) => {
    state.visible = true
    state.x = x
    state.y = y
  })
}

export function hideThumbnail() {
  mutate(key, (state: State) => {
    state.visible = false
  })
}
