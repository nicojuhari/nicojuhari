<script setup>
const route = useRoute();
const filteredApps = ref([]);

let apps = [
    {
        title: "Free Menu Maker",
        url: '/tools/free-menu-maker',
        icon: 'i-ph-fork-knife-light',
        iconColor: 'text-green-600',
        description: 'Create a digital food menu for your restaurant, bar or cafe.'
    },
    {
        title: "UI for Bunny CDN",
        url: '/tools/bunny-cdn',
        icon: 'i-logos-bunny-net-icon',
        description: 'Manage your bunny.net assets from a single UI.'
    },
    {
        title: "Promo Cards Online",
        url: 'https://my-promo-cards.web.app/',
        external: true,
        icon: 'i-iconamoon-discount-thin',
        description: 'Add your promo cards online and enjoy constant savings.'
    },
    {
        title: "Rock Paper Scissors",
        url: 'https://play-rps-online.netlify.app/',
        external: true,
        logo: 'https://play-rps-online.netlify.app/rock-paper-scissors-logo.svg',
        description: 'Play rock paper scissors online, with friends and family.'
    },
];

//filter out the current app
// f.value = apps.value.filter(app => app.url !== route.path);

watchEffect(() => {
    filteredApps.value = apps.filter(app => app.url !== route.path);
})

</script>
<template>
    <section class="md-section">
        <div class="container">
            <h3 class="subtitle mb-10 text-center">Web Apps</h3>
            <div class="m-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div class="bg-white duration-300 rounded-xl shadow-md hover:shadow hover:translate-y-1"
                    v-for="app in filteredApps" :key="app.title">
                    <NuxtLink :to="app.url" :target="app.external ? '_blank' : ''"
                        class="p-4 md:p-6 flex gap-6 items-center" :title="app.title">
                        <img v-if="app?.logo" :src="app.logo" class="h-12 w-12 object-contain" />
                        <UIcon v-else-if="app?.icon" :name="app.icon" class="text-5xl shrink-0"
                            :class="app.iconColor ? app.iconColor : 'text-red-500'" dynamic>
                        </UIcon>
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