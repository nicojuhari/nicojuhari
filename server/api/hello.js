export default defineEventHandler(async (event) => {
    const user = await getUserFromSession(event);

    if (!user) {
        // throw createError({
        //     statusCode: 401,
        //     message: 'Unauthorized',
        // });
    }

    return {
        hello: "world",
    };
});
