import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const menu_uid = getRouterParam(event, 'menu_uid')

    return await prisma.menu.findFirst ({
        where: {
            menu_uid: menu_uid
        },
    });
    
});
