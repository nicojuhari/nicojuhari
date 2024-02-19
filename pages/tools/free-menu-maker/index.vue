
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
                <div class="mb-6">
                    <h1 class="text-2xl">Free Menu Maker</h1>
                    <h2 class="mt-2">Create a digital food menu for your restaurant, and easily publish it on your website or app.</h2>
                    <p>No coding knowledge is required.</p>
                </div>
                <ClientOnly>
                    <MenuList></MenuList>
                </ClientOnly>
                <MenuToolDescription></MenuToolDescription>
            </template>
        </div>
    </div>
</template>