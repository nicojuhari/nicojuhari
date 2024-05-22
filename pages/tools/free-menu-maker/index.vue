
<script setup>

    useHead({
        title: 'Free Digital Menu Maker: Create & Customize Your Menu Online',
        meta: [
            { name: 'description', content: 'Get your restaurant noticed! Design a stunning free digital menu online in minutes. No design skills needed. Easy to customize, mobile-friendly. Try it now!' }
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
                <h1 class="font-bold text-3xl mb-2">Design Your Free Digital Menu Online</h1>
                <h2 class="mb-8 text-lg font-normal">Create a professional menu for your restaurant, bar, or cafe in minutes!</h2>
            </div>
            <ClientOnly>
                <MenuList></MenuList>
            </ClientOnly>
            <MenuToolDescription></MenuToolDescription>
        </template>
    </div>
</template>