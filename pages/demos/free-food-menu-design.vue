<script setup type="module">
import { ref, watch } from 'vue';
import menuData from '@/assets/json/demo-menu.json'
definePageMeta({
    layout: 'default'
})

useHead({
    title: 'Free Menu Designs | Create a Restaurant Menu Online',
    meta: [
        { name: 'description', content: 'Free Menu Designs - Create a Restaurant Menu Online and display it on a website, a mobile app, or on tablets and screens in-store.' },
        { name: 'keywords', content: 'Free Menu Designs, create restaurant menu online, digital food menu, menu design, restaurant website, create food menu' }
    ],
})

const designNumber = ref(1)
const foodMenu = ref(null)
const loading = ref(true)



if (process.client) {
    import("https://cdn.jsdelivr.net/npm/1food-menu/dist/1food-menu.mjs").then(({ createMenu }) => {
        foodMenu.value = menuData
        loading.value = false
        
        createMenu({
            menu: menuData,
            version: designNumber.value,
            priceSymbol: '$',
        })

        watch(designNumber, () => {
            createMenu({
                menu: foodMenu.value,
                version: designNumber.value,
                priceSymbol: '$',
            })
        })
    })
}

</script>
<template>
    <section>
        <Body class="bg-gray-100" />
        <div class="container">
            <h1 class="page-title text-center mb-2">Free Food Menu Designs</h1>
            <div class="text-center mb-6">
                Any of these digital menus can be created in minutes,
                <NuxtLink to="/tools/free-menu-maker" class="text-brand-400 underline font-bold">try it.</NuxtLink>
            </div>
            <div class="mt-8 mb-4 max-w-64 mx-auto">
                 <UFormGroup label="Select a design version">
                    <USelectMenu v-model="designNumber" :options="[1, 2, 3, 4]" />
                </UFormGroup>
            </div>
        </div>
        <div class="px-2">
            <div id="OneFoodMenu"> </div>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/1food-menu/dist/style.min.css" />
            <!-- production -->
        </div>
    </section>
</template>