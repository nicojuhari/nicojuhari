<script setup>
import DemoOne from '@/components/demos/DemoOne.vue'
const route = useRoute();

definePageMeta({ layout: 'demos' })

useHead({
    title: 'Restaurant Website Designs',
    meta: [
        { name: 'keywords', content: 'menu design, restaurant menu designs, food menu, food menu designs, digital food menu' },
        { name: 'description', content: 'Restaurant Website Designs - Create a digital food menu online. Increase sales & attract more clients to your restaurant with a digital food menu' }
    ],
})


const menuArray = {
    'italian-restaurant-website-design': DemoOne,
}

//redirect
if (!menuArray[route.params.designId]) {
    await navigateTo('/demos')
}

</script>
<template>
    <component :is="menuArray[route.params.designId]" />
</template>