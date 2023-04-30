import { FC, PropsWithChildren } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from 'bone-ui'
import { ChipOutline, MenuAlt2Solid } from '@bone-ui/icons'
import { Box } from '@fower/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IconDocument } from '../../icons/IconDocument'
import { IconPassword } from '../../icons/IconPassword'
import { Logo } from '../../components/Logo'
import { UserAvatarPopover } from '../../components/UserAvatarPopover'
import { StyledLink } from '../../components/StyledLink'

interface ItemProps {
  to: string
  icon: any
}

const Item: FC<PropsWithChildren<ItemProps>> = ({ icon: Icon, to, children }) => {
  const router = useRouter()

  const active = router.pathname === to

  return (
    <StyledLink
      href={to}
      passHref
      toCenterY
      spaceX2
      cursorPointer
      p2
      roundedSM
      black
      brand500={active}
      bgBrand100--T20--hover
      bgBrand100--T20={active}
      transitionCommon
    >
      <Icon gray800 brand500={active} size={22}></Icon>
      <Box>{children}</Box>
    </StyledLink>
  )
}

const NavMenu = () => {
  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <MenuAlt2Solid cursorPointer />
      </PopoverTrigger>
      <PopoverContent p2>
        {({ close }) => (
          <Box toBetween toCenterY onClick={close}>
            <Box spaceY3 textLG fontBold>
              <Item to="/dashboard/strategies" icon={IconDocument}>
                Strategies
              </Item>
              <Item to="/dashboard/bots" icon={ChipOutline}>
                Bots
              </Item>
            </Box>
          </Box>
        )}
      </PopoverContent>
    </Popover>
  )
}

export const NavMobile = () => {
  return (
    <Box
      h-48
      display={['flex', 'flex', 'none']}
      borderBottom-1
      borderGray200--T40
      toCenterY
      toBetween
      px4
    >
      <NavMenu />
      <Logo />
      <UserAvatarPopover />
    </Box>
  )
}
