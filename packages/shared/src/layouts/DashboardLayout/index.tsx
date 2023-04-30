import { FC, PropsWithChildren } from 'react'
import { Box } from '@fower/react'
import { NavPC } from './NavPC'
import { NavMobile } from './NavMobile'
import { Sidebar } from './Sidebar'
import { useRouter } from 'next/router'

export const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  const { pathname } = useRouter()
  return (
    <Box black toLeft h-100vh bgWhite bgSlate800--dark>
      <Sidebar />
      <Box flex-1 h-100vh overflowAuto relative>
        <NavPC />
        <NavMobile />
        <Box px={[20, 20, 32]} h="calc(100vh - 72px)">
          {children}
        </Box>
      </Box>
    </Box>
  )
}
