import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2022-11-15',
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }

  const { priceId, userId, email } = req.body
  console.log('body--------:', req.body)

  const DOMAIN = req.headers.origin

  try {
    const session = await stripe.checkout.sessions.create({
      client_reference_id: userId,
      customer_email: email,
      billing_address_collection: 'auto',
      line_items: [
        {
          price: priceId,
          // For metered billing, do not pass quantity
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${DOMAIN}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${DOMAIN}/checkout/cancel`,
    })

    console.log('==========session.customer:', session)

    res.json(session)
  } catch (err) {
    console.log('err:', err)

    const errorMessage = err instanceof Error ? err.message : 'Internal server error'
    res.status(500).json({ statusCode: 500, message: errorMessage })
  }
}
