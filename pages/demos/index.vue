<script setup>
    let list = [
         {
            title: 'Mama Mia - Italian Restaurant',
            url: 'italian-restaurant-website',
        },
        {
            title: 'Ristorante Francesco',
            url: 'ristorante-francesco',
        }
    ]
</script>
<template>
    <div class="container">
        <div class="subtitle my-10 text-center">Demos</div>
        <div class="flex flex-col gap-4 mx-auto max-w-sm">
            <nuxt-link :to="'/demos/'+ item.url" v-for="item in list" :key="item.url" class="p-4 shadow-md rounded-full bg-gray-50">
                <div class="text-center text-lg">{{ item.title }}</div>
            </nuxt-link>
        </div>
    </div>
</template>