
<script setup>
    definePageMeta({
        layout: 'empty'
    })

    useHead({
        title: 'Free Menu Maker - Create a digital food menu',
        meta: [
            { name: 'description', content: 'Free Menu Maker - Create a digital food menu for your restaurant, bar and cafe' }
        ],
    })
</script>   
<template>
    <div>
        <Body class="bg-gray-50"></Body>
        <header class="border-b bg-white sticky top-0 z-30 h-14 flex items-center">
            <div class="container flex items-center justify-between gap-6 h-full">
                <div class="flex flex-shrink-0 items-center gap-6">
                    <img src="/menuLogo.svg" class="w-14"/>
                </div>
            </div>
        </header>
        <div class="container">
            <ClientOnly>
                <MenuList/>
            </ClientOnly>
            <div class="max-w-4xl m-auto py-10">
                Create a digital food menu for your restaurant - FREE
            </div>
        </div>
    </div>
</template>