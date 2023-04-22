import { FC, PropsWithChildren } from 'react'
import { Box } from '@fower/react'
import { ModeToggle } from '../../components/ModeToggle'
import { Nav } from './Nav'
import { LocaleSelect } from '../../components/LocaleSelect'
import { Footer } from './Footer'
import { Logo } from '../../components'

interface Props {
  showNav?: boolean
}

export const BasicLayout: FC<PropsWithChildren<Props>> = ({ children, showNav = true }) => {
  return (
    <Box black bgWhite bgGray900--dark h-100vh>
      <Box w={['100%', 820]} mx-auto column h-100vh>
        <Box className="nav" toBetween py3 px={[18, 0]}>
          <Box toCenterY spaceX2>
            <Logo />
            <Box textXL>AI Translator</Box>
          </Box>
          <Box toCenterY spaceX2>
            <Box>{showNav && <Nav />}</Box>
            <LocaleSelect></LocaleSelect>
            <ModeToggle></ModeToggle>
          </Box>
        </Box>
        <Box flex-1 w-100p>
          {children}
        </Box>
        <Footer></Footer>
      </Box>
    </Box>
  )
}
