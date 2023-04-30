import { FC, PropsWithChildren } from 'react'
import { Box } from '@fower/react'
import { FowerHTMLProps } from '@fower/core'
import { useRouter } from 'next/router'
import { StyledLink } from '../../components/StyledLink'

interface ItemProps extends FowerHTMLProps<'div'> {
  to: string
  icon?: any
}

export const SidebarItem: FC<PropsWithChildren<ItemProps>> = ({
  icon: Icon,
  to,
  children,
  ...rest
}) => {
  const router = useRouter()
  const active = router.pathname === to

  return (
    <StyledLink
      href={to}
      passHref
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
      bgGray200={active}
      bgSlate700--dark={active}
      brand500={active}
    >
      {Icon && <Icon gray800 brand500={active} size={22} />}
      <Box flex-1 {...rest}>
        {children}
      </Box>
    </StyledLink>
  )
}
