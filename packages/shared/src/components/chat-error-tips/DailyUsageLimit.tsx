import { Box } from '@fower/react'
import { Button } from 'bone-ui'
import { googleAuthUrl } from '../../common'

export const DailyUsageLimit = () => {
  return (
    <Box column mt-20>
      <Box fontBold text2XL>
        Daily usage limit reached
      </Box>
      <Box leadingNormal>
        <Box gray500>Each user can chat for free 10 times a day</Box>
        <Box gray500>Please Upgrade to PRO to expand the limit</Box>
      </Box>
      <Box mt-16>
        <Button as="a" roundedFull href={googleAuthUrl}>
          Login and Upgrade to PRO
        </Button>
      </Box>
    </Box>
  )
}
