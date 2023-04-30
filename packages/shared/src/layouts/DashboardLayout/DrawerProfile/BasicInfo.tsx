import { Box } from '@fower/react'
import { Avatar } from 'bone-ui'
import { getUser, useUser } from '../../../stores'
import { EditEmailPopover } from './EditEmailPopover'
import { EditNamePopover } from './EditNamePopover'
import { UpdatePassword } from './UpdatePassword'

export const BasicInfo = () => {
  const { user } = useUser()
  return (
    <Box toCenterY spaceX3>
      <Box>
        <Avatar name={user.nickname} size={80} />
      </Box>
      <Box column rowGap-8>
        <Box toCenterY spaceX2>
          <Box fontMedium textLG>
            {user.shortNickname}
          </Box>
          <EditNamePopover />
        </Box>

        {/* <Box toCenterY spaceX2>
          <Box gray700 textSM>
            {user.email}
          </Box>
          <EditEmailPopover></EditEmailPopover>
        </Box>
        <UpdatePassword /> */}
      </Box>
    </Box>
  )
}
