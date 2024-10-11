<script setup>
const route = useRoute();
const filteredApps = ref([]);

let apps = [
    
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
    {
        title: "Online Checklist Maker",
        url: '/tools/online-checklist-maker',
        icon: 'i-ph-list-checks-light',
        description: 'Create a checklist online and keep track of your tasks.'
    },
    {
        title: "Products Grid Generator",
        url: '/tools/products-grid-generator',
        icon: 'i-ic-twotone-shopify',
        description: 'Generate a grid of products for Shopify blog.'
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
            <h3 class="subtitle mb-2 text-center">Productivity Tools</h3>
            <div class="mb-10 text-center text-gray-600">Quick solutions for everyday tasks</div>
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