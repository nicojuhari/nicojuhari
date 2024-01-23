// connect to server on local terminal
// stripe listen --forward-to localhost:3000/api/stripe/webhook
import Stripe from "stripe";
import { handleSubscriptionPayments } from "~/server/utils/stripe";

export default defineEventHandler(async (event) => {

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    
    const headers = event.node.req.headers;
    const body = await readRawBody(event);
    const sig = headers["stripe-signature"];
    let hookEvent: Stripe.Event;

    try {
        hookEvent = stripe.webhooks.constructEvent( body as string, sig as string, process.env.STRIPE_SIGNING as string);
    } catch (err) {
        throw createError({ statusCode: 400, message: (err as Error).message });
    }

    // console.log(hookEvent.type);

    switch (hookEvent.type) {
        case "invoice.payment_succeeded":
            // await createSubscription(hookEvent.data.object);
            console.log("invoice.payment_succeeded", hookEvent.data.object)
            await handleSubscriptionPayments(hookEvent.data.object)
            break;
        case "customer.subscription.updated":
            // await updateSubscription(hookEvent.data.object);
            break;
        case "customer.subscription.deleted":
            // await deleteSubscription(hookEvent.data.object);
            break;
        //   // ... handle other event types
        default:
            console.log(`Unhandled event type ${hookEvent.type}`);
    }

})

// const { createSubscription, updateSubscription, deleteSubscription } = require("./stripeServices");

// const handleStripeHooks = async (req, res ) => {
//     const sig = req.headers["stripe-signature"];

//     let event;

//     try {
//         event = await stripe.webhooks.constructEvent(req.body, sig, STRIPE_CONFIG.SIGNING);
//     } catch (err) {
//         res.status(400).send(`Webhook Error: ${err.message}`);
//         return;
//     }

//     // Handle the event
//     switch (event.type) {
//         // on create and update
//         case "customer.subscription.created":
//             await createSubscription(event.data.object);
//             break;
//         case "customer.subscription.updated":
//             await updateSubscription(event.data.object);
//             break;
//         case "customer.subscription.deleted":
//             await deleteSubscription(event.data.object);
//             break;
//         // ... handle other event types
//         default:
//             console.log(`Unhandled event type ${event.type}`);
//     }

//     // Return a 200 response to acknowledge receipt of the event
//     res.send();
// }

// module.exports = handleStripeHooks;