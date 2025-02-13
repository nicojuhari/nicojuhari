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
        icon: 'i-ph-list-numbers-light',
        description: 'Count characters and words in any text.'
    },
    {
        title: "Space Converter",
        url: '/tools/convert-spaces-to-dashes',
        icon: 'i-ph-repeat-light',
        description: 'Convert spaces to dashes or underscores in any text.'
    },
    {
        title: "Online Checklist Maker",
        url: '/tools/online-checklist-maker',
        icon: 'i-ph-check-square-light',
        description: 'Create a checklist online and keep track of your tasks.'
    },
    {
        title: "Products Grid Generator",
        url: '/tools/products-grid-generator',
        icon: 'i-ph-squares-four-light',
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
    <UCard>
        <h2 class="subtitle mt-6 text-center">Small Tools</h2>
        <p class="text-sm text-center mb-6">Built for me and sharing with you.</p>
        <div class="space-y-4">
            <div class="bg-gray-100/50 rounded-md border border-gray-100"
                v-for="app in filteredApps" :key="app.title">
                <NuxtLink :to="app.url"
                    class="p-4 md:p-6 flex gap-6 items-center" :title="app.title">
                    <UIcon :name="app.icon" class="text-4xl shrink-0"
                            :class="app.iconColor ? app.iconColor : 'text-blue-500'" dynamic>
                        </UIcon>
                    <div>
                        <h4 class="font-semibold text-lg">{{ app.title }}</h4>
                        <div class="text-gray-600 text-sm"> {{ app.description }}</div>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </UCard>
</template>