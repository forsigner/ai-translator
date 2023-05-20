import { FC, PropsWithChildren } from 'react'
import { Box } from '@fower/react'
import { FowerHTMLProps } from '@fower/core'

interface ItemProps extends FowerHTMLProps<'div'> {
  icon?: any
}

export const SidebarItem: FC<PropsWithChildren<ItemProps>> = ({
  icon: Icon,
  children,
  ...rest
}) => {
  return (
    <Box
      toCenterY
      spaceX2
      cursorPointer
      py3
      pl5
      textBase
      black
      fontNormal
      transitionCommon
      black--hover
      bgGray100--hover
      bgGray200--hover
      gray100--dark--hover
      bgSlate700--dark--hover
      {...rest}
    >
      {Icon && <Icon gray800 size={22} />}
      <Box flex-1 {...rest}>
        {children}
      </Box>
    </Box>
  )
}
