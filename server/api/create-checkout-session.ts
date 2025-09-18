import Stripe from 'stripe';
import { defineEventHandler, readBody } from 'h3'

// Initialize Stripe with your secret key
const config = useRuntimeConfig()

const stripe = new Stripe(config.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil'
});

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { items } = body

    // Create line items from cart items
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: 'Test product - Not a real item',
          images: ['https://via.placeholder.com/300'] // Test image
        },
        unit_amount: Math.round(item.price * 100), // Stripe expects amounts in cents
      },
      quantity: item.quantity,
    }));

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${config.public.siteUrl}/demos/checkout?success=true`,
      cancel_url: `${config.public.siteUrl}/demos/checkout`,
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      submit_type: 'pay',
      payment_intent_data: {
        metadata: {
          isTest: 'true'
        }
      }
    });

    return { url: session.url };
  } catch (error: any) {
    return {
      error: {
        message: error.message,
      }
    }
  }
});