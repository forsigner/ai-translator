import { ReactNode } from 'react'
import { PopoverOptions, usePopover } from './usePopover'
import { PopoverProvider } from './context'
import { useStore } from 'stook'

export function Popover({
  children,
  modal = false,
  ...restOptions
}: {
  children: ReactNode
} & PopoverOptions) {
  const popover = usePopover({ modal, ...restOptions })

  useStore('translator_popover', popover)

  return <PopoverProvider value={popover}>{children}</PopoverProvider>
}
