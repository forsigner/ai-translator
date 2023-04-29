import { graphqlClient } from '@common/query'
import { INIT_STRIPE_CUSTOMER_ID } from '@langpt/api-sdk'
import Stripe from 'stripe'

export async function handleChargeSucceeded(charge: Stripe.Charge) {
  console.log(`💵 Charge id 支付成功---------:`, JSON.stringify(charge, null, 2))
  try {
    const customerId = charge?.customer
    if (customerId) {
      // const data: any = await graphqlClient.query(INIT_STRIPE_CUSTOMER_ID, {
      //   code,
      // })
    }
  } catch (error) {
    //
  }
  //
}
