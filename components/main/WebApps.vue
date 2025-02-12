<script setup>

let apps = [
    {
        title: "1FoodMenu",
        url: 'https://1food.menu/',
        logo: 'https://1food.menu/1food-menu-logo.svg',
        description: 'Digital Food Menus for restaurants, bars or cafes.'
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
    <section class="md-section">
        <div class="container">
            <h3 class="subtitle mb-10 text-center">Web apps I've built</h3>
            <div class="m-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div class="bg-white duration-300 rounded-xl shadow-md hover:shadow hover:translate-y-1"
                    v-for="app in apps" :key="app.title">
                    <NuxtLink :to="app.url" target="_blank"
                        class="p-4 md:p-6 flex gap-6 items-center" :title="app.title">
                        <img :src="app.logo" class="h-12 w-12 object-contain" />
                        <div class="space-y-2">
                            <h4 class="font-semibold text-xl">{{ app.title }}</h4>
                            <div class="text-gray-600"> {{ app.description }}</div>
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>