
<script setup>

    useHead({
        title: 'Free Menu Maker - Create a digital food menu online',
        meta: [
            { name: 'description', content: 'Free Menu Maker - Create a digital food menu for your restaurant, bar or cafe and publish it on your website or app. No coding knowledge is required.' }
        ],
    })

</script>   
<template>
    <div class="container py-10">
        <ClientOnly v-if="$route.query.menu_uid">
            <MenuDashboard></MenuDashboard>
        </ClientOnly>
        <template v-else>
            <div class="mb-10 md:mb-14 text-center">
                <h1 class="font-bold text-3xl mb-2">Free Menu Maker</h1>
                <div class="mb-8">Create a digital food menu for your restaurant, bar or cafe.</div>
            </div>
            <ClientOnly>
                <MenuList></MenuList>
            </ClientOnly>
            <MenuToolDescription></MenuToolDescription>
        </template>
    </div>
</template>