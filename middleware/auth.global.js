export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = useUser();
    
    if (!user.value && to.path !== "/login") {
        return navigateTo({
            path: "/login",
            query: {
                redirect: to.fullPath,
            },
        });
    }
});
