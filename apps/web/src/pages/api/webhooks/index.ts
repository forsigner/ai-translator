import { buffer } from 'micro'
import Cors from 'micro-cors'
import Stripe from 'stripe'
import { NextApiRequest, NextApiResponse } from 'next'
import { handleChargeSucceeded } from '../../../stripe/handleChargeSucceeded'
import { handleSubscriptionCreated } from '../../../stripe/handleSubscriptionCreated'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2022-11-15',
})

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
}

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
})

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const buf = await buffer(req)
  const sig = req.headers['stripe-signature']!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret)
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    // On error, log and return the error message.
    if (err! instanceof Error) console.log(err)
    console.log(`❌ Error message: ${errorMessage}`)
    res.status(400).send(`Webhook Error: ${errorMessage}`)
    return
  }

  // Successfully constructed event.
  console.log('✅ Success:', event.id)

  // console.log('event.data.object----:', event.data.object)

  // Cast event data to Stripe object.
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    console.log(`checkout.session 成功====: ${JSON.stringify(session, null, 2)}`)
  } else if (event.type === 'checkout.session.async_payment_succeeded') {
    const session = event.data.object as Stripe.Checkout.Session
    console.log(`checkout.session.payment 成功====: ${JSON.stringify(session, null, 2)}`)
    //
  } else if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent
    console.log(`💰 PaymentIntent status: ${paymentIntent.status}`)
  } else if (event.type === 'payment_intent.payment_failed') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent

    console.log(`❌ Payment failed: ${paymentIntent.last_payment_error?.message}`)
  } else if (event.type === 'charge.succeeded') {
    const charge = event.data.object as Stripe.Charge
    handleChargeSucceeded(charge)
  } else if (event.type === 'customer.subscription.created') {
    const subscription = event.data.object as Stripe.Subscription
    handleSubscriptionCreated(subscription)
  } else if (event.type === 'customer.subscription.updated') {
    //
    console.log('更新订阅.........:', event.data.object)
    const subscription = event.data.object as Stripe.Subscription
  } else if (event.type === 'customer.subscription.deleted') {
    console.log('删除订阅.........:', event.data.object)
    const subscription = event.data.object as Stripe.Subscription
    subscription.collection_method
  } else {
    console.warn(
      `🤷‍♀️ Unhandled event type: ${event.type}`,
      JSON.stringify(event.data.object, null, 2),
    )
  }

  // Return a response to acknowledge receipt of the event.
  res.json({ received: true })
}

export default cors(webhookHandler as any)
