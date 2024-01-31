import { onAuthStateChanged, getAuth } from "firebase/auth";

const getCurrentUser = () => {
    const auth = getAuth();
    return new Promise((resolve, reject) => {
        const unsub = onAuthStateChanged(
            auth,
            (user) => {
                unsub();
                resolve(user);
            },
            (err) => reject(err)
        );
    });
};

export default defineNuxtRouteMiddleware(async (to, from) => {
    
    // const user = useUser();
    
    // if(!user.value)  {
    //     user.value = await getCurrentUser();
    // }

    // if (!user?.value && to.path !== "/login" && to.path !== "/password-recovery") {
    //     return navigateTo({
    //         path: "/login",
    //         query: {
    //             redirect: to.fullPath,
    //         },
    //     });
    // }
});
