import React, { ReactNode } from 'react'
import { PopoverOptions, usePopover } from './usePopover'
import { PopoverProvider } from './context'

export function Popover({
  children,
  modal = false,
  ...restOptions
}: {
  children: ReactNode
} & PopoverOptions) {
  const popover = usePopover({ modal, ...restOptions })

  return <PopoverProvider value={popover}>{children}</PopoverProvider>
}
