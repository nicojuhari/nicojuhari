

<script setup>

const apps = [
    {
        title: "Free Menu Maker",
        url: '/tools/free-menu-maker',
        icon: 'i-ph-fork-knife-light',
        // logo: 'menuLogo.svg',
        description: 'Create a digital food menu for your restaurant, bar or cafe.'
    },
    {
        title: "UI for Bunny CDN",
        url: '/tools/bunny-cdn',
        icon: 'i-logos-bunny-net-icon',
        description: 'Manage your bunny.net assets from a single UI.'
    },
    {
        title: "My Promo Cards Online",
        url: 'https://my-promo-cards.web.app/',
        external: true,
        icon: 'i-iconamoon-discount-thin',
        description: 'Add your promo cards online and enjoy constant savings.'
    },
    {
        title: "QR Code Generator",
        url: '/tools/free-qr-code-generator',
        icon: 'i-ph-qr-code-light',
        description: 'Create a QR Code for any url. Easy and Simple.'
    },
    {
        title: "Word Counter",
        url: '/tools/free-word-counter',
        icon: 'i-mdi-counter',
        description: 'Count characters and words in any text.'
    },
    {
        title: "Space Converter",
        url: '/tools/convert-spaces-to-dashes',
        icon: 'i-ph-text-indent',
        description: 'Convert spaces to dashes or underscores in any text.'
    },

]
</script>   
<template>
    <section class="md-section">
        <div class="container">
            <div class="subtitle mb-10 text-center">Free Apps & Tools</div>
            <div class="m-auto grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
                <div class="bg-white border border-gray-400 hover:bg-gray-100 hover:border-gray-200 duration-300 rounded-xl"
                    v-for="app in apps" :key="app.title">
                    <NuxtLink :to="app.url" :target="app.external ? '_blank': ''" class="p-6 md:p-8 block text-center"
                        :title="app.title">
                        <div class="flex flex-col gap-6 items-center">
                            <img v-if="app.logo" :src="'/' + app.logo" class="w-8 h-8 inline-block shrink-0"
                                :alt="app.title">
                            <UIcon v-if="app.icon" :name="app.icon" class="text-[32px] text-red-500 shrink-0" dynamic>
                            </UIcon>
                            <span class="font-bold text-xl">{{ app.title }}</span>
                        </div>
                        <div class="mt-4 text-gray-600"> {{ app.description }}</div>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>