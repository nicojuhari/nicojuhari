<script setup>
import { UCard } from '#components';


let apps = [
    {
        title: "1FoodMenu",
        url: 'https://1food.menu/',
        logo: 'https://1food.menu/1food-menu-logo.svg',
        description: 'Digital food menus for restaurants',
        follow: true
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
        url: 'https://rps-game.online/',
        logo: 'https://rps-game.online/rock-paper-scissors-logo.svg',
        description: 'Play RPS game online'
    },
];

</script>
<template>
    <div class="container container-sm my-16 md:my-24">
        <h2 class="title mb-6 text-center">Web Apps</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NuxtLink :to="app.url" target="_blank" :rel="app.follow ? '' : 'nofollow'" v-for="app in apps" :key="app.title"
                class="flex gap-4 items-center border p-4 rounded-md bg-white" :title="app.title">
                <img :src="app.logo" class="h-6 w-6 lg:h-8 lg:w-8 object-contain shrink-0" :alt="app.title" />
                <div>
                    <h3 class="font-semibold">{{ app.title }}</h3>
                    <div class="text-gray-500 text-sm"> {{ app.description }}</div>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>