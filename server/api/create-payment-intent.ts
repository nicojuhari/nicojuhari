import Stripe from 'stripe';
import { defineEventHandler, readBody, createError } from 'h3'

// Type definitions
type Item = {
  id: number
  name: string
  price: number
  quantity: number
}

interface PaymentIntentMetadataItem {
  id: number;
  name: string;
  quantity: number;
}

interface PaymentIntentRequest {
  amount: number;
  items: Item[];
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  console.log('STRIPE_SECRET_KEY:', config.STRIPE_SECRET_KEY)
  
  if (!config.STRIPE_SECRET_KEY) {
    throw createError({
      statusCode: 500,
      message: 'Stripe secret key is not configured'
    })
  }

  try {
    const stripe = new Stripe(config.STRIPE_SECRET_KEY, {
      apiVersion: '2025-08-27.basil'
    })

    const body = await readBody(event)
    const { amount, items }: PaymentIntentRequest = body

    if (!amount || !items) {
      throw createError({
        statusCode: 400,
        message: 'Amount and items are required'
      })
    }

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      metadata: {
        items: JSON.stringify(items.map((item: Item): PaymentIntentMetadataItem => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity
        })))
      }
    });

    return {
      clientSecret: paymentIntent.client_secret
    };
  } catch (error: any) {
    return {
      error: {
        message: error.message
      }
    }
  }
});