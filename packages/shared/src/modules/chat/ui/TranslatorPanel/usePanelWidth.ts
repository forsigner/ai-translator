import { mutate, useStore } from 'stook'

const key = 'PANEL_WIDTH'

export function usePanelWidth() {
  const [panelWidth, setPanelWidth] = useStore<string>(key, '')
  return { panelWidth, setPanelWidth }
}

export function mutatePanelWidth(width: string) {
  mutate(key, width)
}
