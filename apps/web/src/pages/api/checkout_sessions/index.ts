import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { formatAmountForStripe } from '../../utils/stripe-helpers'
import { CURRENCY, MIN_AMOUNT, MAX_AMOUNT } from '../../config'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2022-08-01',
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
  const amount: number = req.body.amount
  try {
    // Validate the amount that was passed from the client.
    if (!(amount >= MIN_AMOUNT && amount <= MAX_AMOUNT)) {
      throw new Error('Invalid amount.')
    }
    console.log('amount--------:', formatAmountForStripe(amount, CURRENCY))

    // Create Checkout Sessions from body params.
    const params: Stripe.Checkout.SessionCreateParams = {
      submit_type: 'donate',
      payment_method_types: ['card'],
      line_items: [
        {
          name: 'Custom amount donation',
          amount,
          currency: CURRENCY,
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/donate-with-checkout`,
    }
    const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(params)

    res.status(200).json(checkoutSession)
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Internal server error'
    res.status(500).json({ statusCode: 500, message: errorMessage })
  }
}
