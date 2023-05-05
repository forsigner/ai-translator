import { Box } from '@fower/react'
import { PlanInterval } from '@ai-translator/api-sdk'
import { Button, ArrowRightOutline } from 'bone-ui'

interface Props {
  planInterval: PlanInterval
}

export const UpgradeCard = ({ planInterval }: Props) => {
  return (
    <Box border-2 borderGray200 w-100p roundedXL py3 px6>
      <Box textXL fontBold>
        Plus
      </Box>
      <Box text2XL brand500 mb-80 fontSemibold flexShrink-0>
        More words per month
      </Box>
      <Box toCenterY brand500 leadingNone>
        <Box text2XL fontBold>
          {planInterval === PlanInterval.Month ? '$10' : '$8'}
        </Box>
        <Box fontBold mb--4 pl1>
          / month
        </Box>
      </Box>
      <Box pt3>
        <Button rightIcon={<ArrowRightOutline size={20} />}>Upgrade Now</Button>
        <Box pt2 gray400>
          You can cancel anytime
        </Box>
      </Box>
    </Box>
  )
}
