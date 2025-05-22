<script setup>
definePageMeta({
    layout: 'default'
})

useHead({
    title: `Demo Projects`,
    bodyAttrs: {
        class: 'bg-gray-100'
    },
    meta: [
        { name: 'keywords', content: 'demo website, restaurant website design, digital food menu' },
        { name: 'description', content: `Restaurant Website Examples - from simple to complex designs. Created with LOVE using Nuxt.js, Vue.js, TailwindCSS and our Free Menu Maker` },
    ],
})

const list = [
    {
        url: '/gud',
        title: 'GUD Restaurant',
        imgUrl: 'https://nicojuhari.b-cdn.net/demos/thumbnails/gud-restaurant.webp'
    }
]
</script>
<template>
    <div class="container my-4 lg:my-6">
        <div class="text-center py-9">
            <h1 class="title">Demo Projects</h1>
            <div class="text-xl text-gray-600 mt-2">Not real websites, but businesses are real.</div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-10 md:mt-16 gap-4 lg:gap-6">
            <NuxtLink :to="'/demos/restaurants/'+ item.url" target="_blank"
                class="bg-white border shadosw border-gray-200 rounded-lg overflow-hidden" v-for="item in list">
                <div>
                    <img :src="item.imgUrl" class="blosck" :alt="item.title + ' Website Design' " />
                </div>
                <div class="text-lg p-6 font-bold">{{ item.title }}</div>
            </NuxtLink>
        </div>
    </div>
</template>