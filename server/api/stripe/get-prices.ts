
import Stripe from "stripe";

export default defineEventHandler( async (event) => {
    
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    
    const getPricesRes = await stripe.prices.list({
        expand: ["data.product"],
        active: true,
    });
    return getPricesRes.data.map(price => {
        return {
                id: price.id,
                metadata: price.metadata,
                amount: price.unit_amount,
                currency: price.currency,
                recurring: price.recurring?.interval,
                product: {
                    id: price.product.id,
                    name: price.product.name,
                    description: price.product.description,
                    features: price.product.features
                }
            };
        });
})