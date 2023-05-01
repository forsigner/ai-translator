import { Box } from '@fower/react'
import { Button, ArrowRightOutline, CheckOutline } from 'bone-ui'

export const PlanFeatures = () => {
  const list = [
    '100,000 words',
    'Open AI Plus mode',
    '90+ copywriting tools',
    'Api mode',
    'Share translation result',
  ]
  return (
    <Box>
      <Box textBase fontSemibold mb2>
        Plan includes
      </Box>
      <Box>
        {list.map((item) => (
          <Box key={item} toCenterY gray400 py1>
            <CheckOutline size={20} />
            <Box>{item}</Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
