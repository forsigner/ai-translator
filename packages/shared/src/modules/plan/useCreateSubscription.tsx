import type { Stripe } from 'stripe'
import { request } from '@boter/request'
import { useSessionContext } from '../../hooks'

export function useCreateSubscription() {
  const session = useSessionContext()
  async function createSubscription(priceId: string) {
    const { id, email } = session.user
    const url = '/api/create-subscription'
    const res = await request<Stripe.Checkout.Session>(url, {
      method: 'POST',
      body: {
        userId: id.toString(),
        email,
        priceId,
      },
    })
    return res
  }
  return { createSubscription }
}
