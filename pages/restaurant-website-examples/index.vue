<script setup>
definePageMeta({
    layout: 'default'
})

useHead({
    title: `Restaurant Website Examples`,
    bodyAttrs: {
        class: 'bg-gray-100'
    },
    meta: [
        { name: 'keywords', content: 'demo website, restaurant website design, digital food menu' },
        { name: 'description', content: `Restaurant Website Examples - from simple to complex designs. Created with LOVE using Nuxt.js, Vue.js, TailwindCSS and 1FoodMenu` },
    ],
})

const list = [
    {
        url: '/trattoria-bella-italia',
        title: 'Trattoria Bella Italia',
        imgUrl: 'https://nicojuhari.b-cdn.net/demos/thumbnails/trattoria-bella-italia-restaurant-website-example.webp'
    },
    {
        url: '/la-famiglia-ristorante',
        title: 'La Famiglia Ristorante',
        imgUrl: 'https://nicojuhari.b-cdn.net/demos/thumbnails/la-famiglia-ristorante-website-example.webp'
    },
    {
        url: '/tony-s-restaurant',
        title: 'Tony\'s Restaurant',
        imgUrl: 'https://nicojuhari.b-cdn.net/demos/thumbnails/tony-s-restaurant.webp'
    },
    {
        url: '/bella-cucina-restaurant',
        title: 'Bella Cucina Restaurant',
        imgUrl: 'https://nicojuhari.b-cdn.net/demos/thumbnails/bella-cucina-restaurant-website-example.webp'
    },
    {
        url: '/mama-mia-restaurant',
        title: 'Mama Mia',
        imgUrl: 'https://nicojuhari.b-cdn.net/demos/thumbnails/mama-mia-italian-restaurant-website-example.webp'
    }
]
</script>
<template>
    <div class="container my-4 lg:my-6">
        <div class="text-center py-9">
            <h1 class="title">Restaurant Website Examples</h1>
            <div class="text-xl text-gray-600 mt-2">From simple to complex designs</div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-10 md:mt-16 gap-4 lg:gap-6">
            <NuxtLink :to="'/restaurant-website-examples'+ item.url"
                class="bg-white border shadosw border-gray-200 rounded-lg overflow-hidden" v-for="item in list">
                <div>
                    <img :src="item.imgUrl" class="blosck" :alt="item.title + ' Website Design' " />
                </div>
                <div class="text-lg p-6 font-bold">{{ item.title }}</div>
            </NuxtLink>
        </div>
    </div>
</template>