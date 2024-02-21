
<script setup>

    useHead({
        title: 'Free Menu Maker - Create a digital food menu online',
        meta: [
            { name: 'description', content: 'Free Menu Maker - Create a digital food menu for your restaurant, bar or cafe and publish it on your website or app. No coding knowledge is required.' }
        ],
    })

</script>   
<template>
    <div class="my-10">
         <div class="container">
            <ClientOnly v-if="$route.query.menu_uid">
                <MenuDashboard></MenuDashboard>
            </ClientOnly>
            <template v-else>
                <div class="mb-8 text-center">
                    <h1 class="font-bold text-3xl">Free Menu Maker</h1>
                    <h2 class="mt-2">Create a digital food menu for your restaurant and easily publish it on your website or app, with no coding required.</h2>
                </div>
                <ClientOnly>
                    <MenuList></MenuList>
                </ClientOnly>
                <MenuToolDescription></MenuToolDescription>
            </template>
        </div>
    </div>
</template>