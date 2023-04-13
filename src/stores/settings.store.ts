import { getState, mutate, useStore } from 'stook'

const key = 'Message'

export function useSettingsVisible() {
  const [visible, setVisible] = useStore<boolean>(key, true)

  return {
    visible,
    setVisible,
  }
}
