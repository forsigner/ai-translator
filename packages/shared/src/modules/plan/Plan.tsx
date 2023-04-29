import { Box } from '@fower/react'
import { PlanList } from './PlanList'
import { createSubscription } from './createSubscription'
import getStripe from './get-stripejs'

export function Plan() {
  async function handleUpgrade(priceId = '') {
    const session = await createSubscription(priceId)
    const stripe = await getStripe()
    const { error } = await stripe!.redirectToCheckout({ sessionId: session.id })
    console.log('error:', error)
  }
  return (
    <Box column mb-80 maxW-960 mx-auto px5>
      <Box my-100 textCenter>
        <Box text2XL text5XL--md text6XL--lg fontBold>
          Translator power by AI
        </Box>
      </Box>
      <PlanList
        canUpgrade
        onUpgrade={async ({ priceId }) => {
          handleUpgrade(priceId)
        }}
      />
    </Box>
  )
}
