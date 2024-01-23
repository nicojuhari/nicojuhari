
import Stripe from "stripe";

export default defineEventHandler( async (event) => {
    
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    const body = await readBody(event);

    const customer = await stripe.customers.search({
        query: `email:'${ body.userEmail }'`,
    });

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: body.priceId,
                quantity: 1,
            },
        ],
        customer: customer?.data?.[0]?.id,
        billing_address_collection: "required",
        allow_promotion_codes: true,
        mode: "subscription",
        success_url: `${process.env.BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.BASE_URL}/menu/new?canceled_session_id={CHECKOUT_SESSION_ID}`,
        automatic_tax: { enabled: true },
        subscription_data: {
            metadata: {
                user_uid: body.userId,
                menu_uid: body.menuId,
            },
        },
    });

    return session
    
})