<script setup>
const route = useRoute();
const filteredApps = ref([]);

let apps = [
    
    {
        title: "QR Code Generator",
        url: '/tools/free-qr-code-generator',
        icon: 'i-ph-qr-code-light',
        description: 'Create a QR Code for any url'
    },
    {
        title: "Word Counter",
        url: '/tools/free-word-counter-tool-online',
        icon: 'i-ph-list-numbers-light',
        description: 'Count words and characters in a text'
    },
    {
        title: "Whitespace Remover",
        url: '/tools/whitespace-remover',
        icon: 'i-ph-repeat-light',
        description: 'Replace or remove text spaces'
    },
    {
        title: "Online Checklist Maker",
        url: '/tools/online-checklist-maker',
        icon: 'i-ph-check-square-light',
        description: 'Keep track of your tasks'
    },
    {
        title: "Products Grid Generator",
        url: '/tools/products-grid-generator',
        icon: 'i-ph-squares-four-light',
        description: 'For Shopify blog'
    },
    {
        title: "Bill Split Calculator",
        url: '/tools/bill-split-calculator',
        icon: 'i-ph-currency-dollar-light',
        description: 'Split bills among friends easily'
    },

];


watchEffect(() => {
    filteredApps.value = apps.filter(app => app.url !== route.path);
})

</script>
<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NuxtLink :to="app.url" v-for="app in filteredApps" :key="app.title" class="p-4 flex gap-4 items-center border rounded-md overflow-hidden bg-white" :title="app.title">
            <UIcon :name="app.icon" class="h-6 w-6 lg:h-8 lg:w-8 shrink-0 text-gray-500" />
            <div>
                <p class="font-bold">{{ app.title }}</p>
                <p class="text-gray-500 text-sm"> {{ app.description }}</p>
            </div>
        </NuxtLink>
    </div>
</template>