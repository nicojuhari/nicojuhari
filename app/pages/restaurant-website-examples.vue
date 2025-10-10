<script setup>
definePageMeta({
    layout: 'examples'
})

const title = useTitle()

useHead({
    bodyAttrs: {
        class: 'bg-gray-100'
    },
    meta: [
        { name: 'description', content: `Restaurant Website Example - ${title.value} modern and clean design. Created with LOVE using Nuxt.js, Vue.js, TailwindCSS and 1FoodMenu` },
    ],
})


</script>
<template>
    <NuxtPage/>
</template>