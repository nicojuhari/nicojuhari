export default defineEventHandler(async (event) => {
    console.time('auth')
    const user = await getUserFromSession(event);
    console.timeEnd('auth');
    if (user) event.context.user = user;
});