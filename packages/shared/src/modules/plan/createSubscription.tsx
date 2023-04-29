import type { Stripe } from 'stripe'
import { request } from '@boter/request'

export async function createSubscription(priceId: string) {
  const res = await request<Stripe.Checkout.Session>('/api/create-subscription', {
    method: 'POST',
    body: {
      priceId,
    },
  })
  return res
}
