<script setup>
definePageMeta({
    layout: 'default'
})

const list = [
    {
        url: 1,
        title: 'Italian Restaurant',
    },
    {
        url: 2,
        title: 'GUD Restaurant',
    },
    {
        url: 3,
        title: 'Restaurant Near You',
    },
    {
        url: 4,
        title: 'Tony\'s Restaurant',
    }
]
</script>
<template>
    <section>
        <div class="container">
            <div class="text-center">
                <h1 class="page-title">Restaurant Website Design Examples</h1>
                <div class="text-xl mt-2">From simple to complex designs</div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-10 md:mt-16 gap-8">
                <NuxtLink :to="'/demos/restaurant-website-design/'+ item.url" class="p-6 border bg-slate-50 rounded-md text-xl font-medium" v-for="item in list">{{ item.title }}</NuxtLink>
            </div>
        </div>
    </section>
</template>