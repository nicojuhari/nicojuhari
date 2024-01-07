import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const userId = getRouterParam(event, 'user_id')

    return await prisma.menu.findMany({
        where: {
            id: {
                in: await prisma.userMenu
                    .findMany({
                        where: {
                            user_uid: userId,
                        },
                        select: {
                            menu_id: true,
                        },
                    })
                    .then((userMenus) => userMenus.map((userMenu) => userMenu.menu_id)),
            },
        },
    });
    
});
