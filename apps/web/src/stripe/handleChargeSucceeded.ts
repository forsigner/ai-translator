import { graphqlClient } from '@common/query'
import { INIT_STRIPE_CUSTOMER_ID } from '@langpt/api-sdk'
import Stripe from 'stripe'

export async function handleChargeSucceeded(charge: Stripe.Charge) {
  console.log(`💵 Charge id 支付成功---------:`, JSON.stringify(charge, null, 2))
  try {
    const customerId = charge?.customer
    if (customerId) {
      await graphqlClient.query(INIT_STRIPE_CUSTOMER_ID, {
        input: {
          customerId: charge.customer,
          email: charge.billing_details.email,
        },
      })
    }
  } catch (error) {
    console.log('error==========:', error)
  }
}
