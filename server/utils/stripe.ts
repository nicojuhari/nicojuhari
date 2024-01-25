import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const handleSubscriptionPayments = async (data:any) => {

    console.log("data", data)
    try {
        //create new subscription + new menu
        const stripe = new Stripe(process.env?.STRIPE_SECRET_KEY);

        //get subscription
        const subsData = await stripe.subscriptions.retrieve(data.subscription);
        let subsObject = formatSubsData(subsData);

        if(data.billing_reason == 'subscription_create') {
            // create new subscription in database
            await prisma.menuSubs.create({
                data: subsObject
            })

            let response = await prisma.menu.create({
                data: {
                    menu_uid: subsData.metadata.menu_uid,
                    products: [],
                    categories: [],
                    promos: [],
                    bundles: [],
                    allergens: [],
                    configs: {
                        title: "Default Menu Title",
                    },
                }
            })
            //connect menu to user
            await prisma.userMenu.create({
              data: {
                user_uid: subsData.metadata.user_uid,
                menu_id: response.id
              }
            })
            
        }
        else if(data.billing_reason == 'subscription_cycle') {
            // update existing subscription in database
            await prisma.subscription.update({
                where: {
                    id: ''
                },
                data: {
                    // updated fields
                }
            });
        }
        //get subscription data
        // const subscription = await stripe.subscriptions.retrieve(data.object.id);
        //update subscription in database
        // console.log(subscription);
        //update subscription on repeat payment

        //create new subs
        // let newMenusSubs = formatSubsData(data);

        //insert new subs
        // await insertIntoTable(newMenusSubs, "menus_subs");

        // insert new menu
        // let insertRes = await insertNewMenu(data.metadata.menu_uid);

        //connect menu with the user
        // await insertIntoTable(
        //     {
        //         user_uid: data.metadata.user_uid,
        //         menu_id: insertRes.insertId,
        //     },
        //     "user_menus"
        // );
    
    } catch (err) {
        console.error(err);
    }
};

// exports.updateSubscription = async (data) => {
//     try {
        
//         let subObj = formatSubsData(data);

//         await updateTable(subObj, "menus_subs", { subs_uid: data.id });

//     } catch (err) {
//         console.error(err);
//     }
// };

// exports.deleteSubscription = async (data) => {
//     updateTable({ is_active: false }, "menus_subs", { subs_uid: data.id});
// };

// exports.getStripeSubscription = async (id) => {
//     return await stripe.subscriptions.retrieve(id, {
//         expand: ["plan.product"],
//     });
// }

const formatSubsData = (data:any) => {
    //from subs Object
    return {
        menu_uid: data.metadata.menu_uid,
        subs_uid: data.id,
        price_uid: data.plan.id,
        is_active: data.status == 'active' ? true : false,
        valid_before: new Date(data.current_period_end * 1000),
        prod_name: data.plan.metadata.prod_name || 'pro-or-premium',
        subs_interval: data.plan.interval,
    }
}