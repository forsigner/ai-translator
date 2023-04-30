import { graphqlClient } from '@common/query'
import { MODIFY_PLAN } from '@langpt/api-sdk'
import Stripe from 'stripe'

export async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log('创建订阅.........:', JSON.stringify(subscription, null, 2))
  try {
    const plan = (subscription as any).plan as Stripe.Plan
    const input = {
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      customerId: subscription.customer,
      interval: plan.interval,
      priceId: plan.id,
      subscriptionId: subscription.id,
    }
    console.log('input-------:', input)

    await graphqlClient.query(MODIFY_PLAN, { input })
  } catch (error) {
    console.log('error==========:', error)
  }
}
