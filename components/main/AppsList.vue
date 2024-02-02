

<script setup>

const apps = [
    {
        title: "Free Menu Maker",
        url: '/tools/free-menu-maker',
        logo: 'menuLogo.svg',
        description: 'Create a digital food menu for your restaurant, bar or cafe'
    },
    {
        title: "UI for Bunny CDN",
        url: '/tools/bunny-cdn',
        logo: 'bunnyLogo.svg',
        description: 'Manage your bunny.net assets with ease from a single UI'
    },
    {
        title: "My Promo Cards Online",
        url: 'https://my-promo-cards.web.app/',
        external: true,
        logo: 'promoLogo.svg',
        description: 'Add your promo cards online and enjoy constant savings'
    },
    {
        title: "QR Code Generator",
        url: '/tools/free-qr-code-generator',
        icon: 'i-ph-qr-code-light',
        description: 'Create a QR Code for any url. Easy and Simple'
    },

]
</script>   
<template>
    <div class="container">
        <div class="m-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white hover:bg-gray-200 text-black duration-300 rounded-xl shadow" v-for="app in apps" :key="app.title">
                <NuxtLink :to="app.url" :target="app.external ? '_blank': ''" class="p-4 flex flex-col" :title="app.title">
                    <div class="flex gap-4 items-center">
                        <img v-if="app.logo" :src="'/' + app.logo" class="w-8 h-8 inline-block" :alt="app.title">
                        <UIcon v-if="app.icon" :name="app.icon" class="text-[32px]"></UIcon>
                        <span class="font-bold text-lg">{{ app.title }}</span>
                    </div>
                    <div class="mt-4 text-sm text-gray-600"> {{ app.description }}</div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>