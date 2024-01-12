// export const createSubscription = async (data) => {

//     try {

//         //create new subs
//         let newMenusSubs = formatSubsData(data);

//         //insert new subs
//         await insertIntoTable(newMenusSubs, "menus_subs");

//         // insert new menu
//         let insertRes = await insertNewMenu(data.metadata.menu_uid);

//         //connect menu with the user
//         await insertIntoTable(
//             {
//                 user_uid: data.metadata.user_uid,
//                 menu_id: insertRes.insertId,
//             },
//             "user_menus"
//         );
    
//     } catch (err) {
//         console.error(err);
//     }
// };

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