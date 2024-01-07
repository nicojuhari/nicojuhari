import { onAuthStateChanged, getAuth } from "firebase/auth";

const getCurrentUser = () => {
    const auth = getAuth();
    return new Promise((resolve, reject) => {
        const unsub = onAuthStateChanged(
            auth,
            (user) => {
                unsub();
                if (user) {
                    
                    console.log('user', user.uid);
                } else {
                    console.log('no user found')
                }
                resolve(user);
            },
            (err) => reject(err)
        );
    });
};

export default defineNuxtRouteMiddleware(async (to, from) => {
    console.log("global auth");
    const user = useUser();
    
    if(!user.value)  {
        user.value = await getCurrentUser();
    }

    console.log('error or user', user.value)
    // const authUser = useUser();
    // console.log(user?.value)
    if (!user?.value && to.path !== "/login") {
        return navigateTo({
            path: "/login",
            query: {
                redirect: to.fullPath,
            },
        });
    } else {
        // authUser.value = user.getCurrentUser
    }
});
