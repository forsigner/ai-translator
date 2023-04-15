import { FC, PropsWithChildren } from 'react'
import { Box } from '@fower/react'
import { Logo } from '../../components/Logo'
import { ModeToggle } from '../../components/ModeToggle'
import { Nav } from './Nav'
import { LocaleSelect } from '../../components/LocaleSelect'
import { Footer } from './Footer'
import { Button } from 'bone-ui'
import { StyledLink } from '../../components/StyledLink'

interface Props {
  showNav?: boolean
}

export const BasicLayout: FC<PropsWithChildren<Props>> = ({ children, showNav = true }) => {
  return (
    <Box black bgWhite bgGray900--dark>
      <Box w={['100%', 820]} mx-auto column>
        <Box className="nav" toBetween py3 px={[18, 0]}>
          <Logo to="/" />
          <Box toCenterY spaceX2>
            <Box>{showNav && <Nav />}</Box>
            {/* <LocaleSelect></LocaleSelect> */}
            <ModeToggle></ModeToggle>
          </Box>
        </Box>
        <Box flex-1 minH-90vh w-100p>
          {children}
        </Box>
        <Footer></Footer>
      </Box>
    </Box>
  )
}
