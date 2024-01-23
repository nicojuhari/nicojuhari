
import Stripe from "stripe";

export default defineEventHandler( async (event) => {
    
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    const query = getQuery(event)
    const subs = await stripe.subscriptions.retrieve( query.id as string);

    console.log(subs)

    return subs
})