import { FC, PropsWithChildren } from 'react'
import { Box } from '@fower/react'
import { Nav } from './Nav'
import { Footer } from './Footer'
import { Logo } from '../../components'
import { LoginStatus } from './LoginStatus'
import { useDeviceId } from '../../hooks/useDeviceId'
import { BadgeCheckOutline, BadgeCheckSolid, Button } from 'bone-ui'
import { EasyModal } from '@langpt/easy-modal'
import { ModalUpgrade } from './ModalUpgrade'

interface Props {
  showNav?: boolean
}

export const BasicLayout: FC<PropsWithChildren<Props>> = ({ children, showNav = true }) => {
  const deviceId = useDeviceId()

  if (!deviceId) return null
  return (
    <Box black bgWhite bgGray900--dark h-100vh>
      <Box w={['100%', 640, 768, 1024, 1280]} mx-auto column h-100vh>
        <Box className="nav" toBetween py3 px={[18, 0]}>
          <Box toCenterY spaceX2>
            <Logo />
            <Box textXL>Langpt.ai</Box>
          </Box>

          <Box>{showNav && <Nav />}</Box>
          <Box toCenterY columnGap-8>
            <Button
              px3
              leftIcon={<BadgeCheckSolid />}
              roundedFull
              onClick={() => {
                EasyModal.show(ModalUpgrade)
              }}
            >
              Upgrade to Plus
            </Button>
            <LoginStatus />
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
