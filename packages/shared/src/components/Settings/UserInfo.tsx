import { Box } from '@fower/react'
import { Avatar, Button } from 'bone-ui'
import { useSession } from '../../hooks'

export function UserInfo() {
  const { loading, session } = useSession()

  if (loading) return null

  if (session) {
    return (
      <Box toCenterY mx5 my3 bgSlate100 rounded2XL columnGap-8 py3 px2>
        <Avatar size={42} src={session.user.avatar} />
        <Box rowGap-4 column>
          <Box textXL fontSemibold>
            @{session.user.nickname}
          </Box>
          <Box textBase gray500>
            {session.user.email}
          </Box>
        </Box>
      </Box>
    )
  }
  return (
    <Box toCenterY mx5 my3 bgSlate100 rounded2XL columnGap-8 py3 px2>
      <Avatar bgGray400 size={42} name="U" />
      <Box rowGap-4 column>
        <Box textXL fontSemibold>
          Not logged in
        </Box>
        <Box textBase gray500>
          <Button as="a" roundedFull size={28} variant="light">
            Login to AI Translator
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
