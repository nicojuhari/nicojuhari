<script setup>

let apps = [
    {
        title: "1FoodMenu",
        url: 'https://1food.menu/',
        logo: 'https://1food.menu/1food-menu-logo.svg',
        description: 'Digital Food Menus for top Restaurants'
    },
    {
        title: "Bunny CDN",
        url: 'https://bunny-cdn.netlify.app/',
        logo: 'https://bunny-cdn.netlify.app/bunnyLogo.svg',
        description: 'Manage your Bunny CDN assets from a single UI.'
    },
    {
        title: "Saver Wallet",
        url: 'https://saver-wallet.netlify.app/',
        logo: 'https://saver-wallet.netlify.app/saver-wallet-logo.svg',
        description: 'Add your cards online and start saving today.'
    },
    {
        title: "Rock Paper Scissors",
        url: 'https://play-rps-online.netlify.app/',
        logo: 'https://play-rps-online.netlify.app/rock-paper-scissors-logo.svg',
        description: 'Play rock paper scissors online, with friends and family.'
    },
];

</script>
<template>
    <div class="pt-2">
        <h2 class="subtitle my-6 text-center">Web Apps</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UCard
                v-for="app in apps" :key="app.title">
                <NuxtLink :to="app.url" target="_blank"
                    class="flex gap-6 items-center" :title="app.title">
                    <img :src="app.logo" class="h-10 w-10 lg:h-12 lg:w-12 object-contain shrink-0" />
                    <div>
                        <h3 class="font-semibold text-xl">{{ app.title }}</h3>
                        <div class="text-gray-600 text-sm"> {{ app.description }}</div>
                    </div>
                </NuxtLink>
            </UCard>
        </div>
    </div>
</template>