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
        url: '/tools/free-word-counter',
        icon: 'i-ph-list-numbers-light',
        description: 'Count characters and words in a text'
    },
    {
        title: "Space Converter",
        url: '/tools/convert-spaces-to-dashes',
        icon: 'i-ph-repeat-light',
        description: 'Convert spaces to dashes or underscores'
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

];

//filter out the current app
// f.value = apps.value.filter(app => app.url !== route.path);
const isLastOdd = (index) => {
        return index === filteredApps.value.length - 1 && filteredApps.value.length % 2 !== 0;
    }

watchEffect(() => {
    filteredApps.value = apps.filter(app => app.url !== route.path);
})

</script>
<template>
    <UCard>
        <h2 class="title mb-0 text-center">Simple Tools</h2>
        <p class="text-sm text-center mb-6">Built for me and sharing with you.</p>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <NuxtLink :to="app.url" v-for="(app, index) in filteredApps" :key="app.title"
                class="flex gap-4 items-center border border-gray-200/60 p-4 rounded-md bg-gray-100/60" :title="app.title"
                :class="{'lg:col-span-2': isLastOdd(index) }">
                <UIcon :name="app.icon" class="h-6 w-6 lg:h-8 lg:w-8 shrink-0"
                            :class="app.iconColor ? app.iconColor : 'text-blue-500'" dynamic>
                        </UIcon>
                <div>
                    <p class="font-semibold">{{ app.title }}</p>
                    <p class="text-gray-600 text-sm"> {{ app.description }}</p>
                </div>
            </NuxtLink>
        </div>
    </UCard>
</template>