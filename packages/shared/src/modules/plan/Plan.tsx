import { Box } from '@fower/react'
import { PlanList } from './PlanList'
import getStripe from './get-stripejs'
import { useCreateSubscription } from './useCreateSubscription'

export function Plan() {
  const { createSubscription } = useCreateSubscription()
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
          Translator powered by AI
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
