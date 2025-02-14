<script setup>
import { UCard } from '#components';


let apps = [
    {
        title: "1FoodMenu",
        url: 'https://1food.menu/',
        logo: 'https://1food.menu/1food-menu-logo.svg',
        description: 'Digital food menus for restaurants'
    },
    {
        title: "Bunny CDN",
        url: 'https://bunny-cdn.netlify.app/',
        logo: 'https://bunny-cdn.netlify.app/bunnyLogo.svg',
        description: 'Assets manager from a better UI'
    },
    {
        title: "Saver Wallet",
        url: 'https://saver-wallet.netlify.app/',
        logo: 'https://saver-wallet.netlify.app/saver-wallet-logo.svg',
        description: 'Never forget your cards at home'
    },
    {
        title: "Rock Paper Scissors",
        url: 'https://play-rps-online.netlify.app/',
        logo: 'https://play-rps-online.netlify.app/rock-paper-scissors-logo.svg',
        description: 'Play with your friends and family'
    },
];

</script>
<template>
    <UCard>
        <h3 class="title mb-6 mt-2 text-center">Apps I Built</h3>
        <div class="grid grid-cols-1 lg:grid-cols-1 gap-6">
            <NuxtLink :to="app.url" target="_blank" v-for="app in apps" :key="app.title"
                class="flex gap-4 items-center border border-gray-100 p-4 rounded-md bg-gray-100/50" :title="app.title">
                <img :src="app.logo" class="h-6 w-6 lg:h-8 lg:w-8 object-contain shrink-0" />
                <div>
                    <h3 class="font-semibold">{{ app.title }}</h3>
                    <div class="text-gray-600 text-sm"> {{ app.description }}</div>
                </div>
            </NuxtLink>
        </div>
    </UCard>
</template>