import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const menu_uid = getRouterParam(event, "menu_uid");
    const body = await readBody(event);

    return await prisma.menu.update({
        where: {
            menu_uid: menu_uid,
        },
        data: {
            categories: body.categories,
            products: body.products,
            configs: body.configs,
            promos: body.promos,
            allergens: body.allergens,
            bundles: body.bundles,
        },
    });
});
