<script setup>
import staticMenu from '@/assets/json/demo-menu.json'

const { groupedMenu } = useMenu(staticMenu)

const pageTitle = 'La Famiglia Ristorante'
useHead({
    title: `${pageTitle} - Restaurant Website Example`,
    bodyAttrs: {
        class: 'bg-slate-50'
    },
    meta: [
        { name: 'keywords', content: 'demo website, restaurant website design, digital food menu' },
        { name: 'description', content: `Restaurant Website Example - ${pageTitle}, modern and clean design. Created with LOVE using Nuxt.js, Vue.js, TailwindCSS and our Free Menu Maker` },
    ]
})

</script>
<template>
    <div class="bg-white border-b">
        <div class="container pt-20 md:pt-48 pb-20">
            <div class="flex items-center gap-6 justify-center text-center">
                <!-- <UIcon name="i-solar-chef-hat-outline" class="shrink-0 h-10 w-10 text-red-600 text-opacity-20 -rotate-45" dynamic></UIcon> -->
                <h1 class="text-3xl md:text-5xl font-bold text-center text-gray-900">La Famiglia Ristorante</h1>
                <!-- <UIcon name="i-fluent-bowl-chopsticks-28-regular"  class="shrink-0 h-10 w-10 text-red-600 text-opacity-20 rotate-45" dynamic></UIcon> -->
            </div>
            <div class="mt-4 text-center text-lg text-gray-600">Where Every Meal Feels Like Family</div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-y-12 max-w-3xl mx-auto py-10 px-4">
            <div class="grid place-content-center gap-2 text-center ">
                <div>Working hours</div>
                <div class="font-semibold text-lg"><span class="text-green-600">Open Now</span>: Closes at 10 pm</div>
            </div>
            <div class="grid place-content-center gap-2 text-center ">
                <div>We accept</div>
                <div class="font-semibold text-lg">Cash only</div>
            </div>
            <div class="grid place-content-center gap-2 text-center ">
                <div>Our address</div>
                <div class="font-semibold text-lg">Street 34/1, City</div>
            </div>
            <div class="grid place-content-center gap-2 text-center ">
                <div>Reserve a table</div>
                <div class="group font-semibold text-lg inline-flex items-center gap-2">
                    <UIcon name="i-ph-phone-bold group-hover:rotate-45 duration-500" class="w-6 h-6"></UIcon>
                    <span class="text-xl font-semibold">0123 456 7890</span>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div v-for="category in groupedMenu.categories" class="my-12">
            <div class="text-4xl text-center mb-6 font-semibold uppercase bosrder-y border-gray-400 py-4 px-4">
                {{ category.name, category.uid }}
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div v-for="product in groupedMenu.products[category.uid]" :key="product.uid" class="bg-white shadow rounded-md p-6 flex
                    flex-col flex-grow">
                    <div class="flex flex-col md:flex-row gap-4 md:items-center">
                        <div class="font-bold mb-1 text-2xl shrink-0 line-clamp-1">{{ product.name }}</div>
                        <div v-if="product.tags" class="flex gap-2 overflow-x-auto">
                            <div v-for="tag in product.tags"
                                class="text-xs px-2 py-1 rounded-full bg-green-600 bg-opacity-10 text-green-600 flex-shrink-0">
                                {{ tag }}</div>
                        </div>
                    </div>
                    <div class="text-gray-600 my-2 line-clamp-3 w-full">{{ product.description }}</div>
                    <!-- prices -->
                    <div>
                        <div v-for="item in product.options"
                            class="flex items-center gap-2 mt-auto justify-between border-t first:border-t-0 border-dashed border-gray-200 py-2">
                            <div class="text-sm text-gray-600">
                                {{ item.size }}</div>
                            <div class="font-medium flex gap-2 items-center">
                                <div v-if="item.salePrice">$ {{ item.salePrice }}</div>
                                <div :class="{ 'text-red-600 line-through text-opacity-50': item.salePrice }">
                                    $ {{ item.price }} </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!Object.keys(groupedMenu).length" class="py-10 text-center text-2xl">
            Sorry, no products found!
        </div>
    </div>
</template>