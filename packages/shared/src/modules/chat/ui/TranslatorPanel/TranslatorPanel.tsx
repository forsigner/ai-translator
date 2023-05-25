import { Box } from '@fower/react'
import { useCallback } from 'react'
import { PanelHeader } from './PanelHeader'
import { PanelEditor } from './PanelEditor'
import { mutatePanelWidth, usePanelWidth } from './usePanelWidth'

export const TranslatorPanel = () => {
  const elementRef = useCallback((element: HTMLDivElement) => {
    if (element) {
      const { width } = window.getComputedStyle(element)
      if (width) mutatePanelWidth(width)
    }
  }, [])

  return (
    <Box ref={elementRef} flex-1 column pt5 pb0 w-100p>
      <Box column mx-auto w="100%">
        <Box rounded2XL bgWhite mt4 shadow="rgba(17, 12, 46, 0.16) 0px 4px 40px -12px">
          <PanelHeader />
          <PanelEditor />
        </Box>
      </Box>
    </Box>
  )
}
