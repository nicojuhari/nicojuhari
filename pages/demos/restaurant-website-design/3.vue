<script setup>
import { computed, ref } from 'vue';
import menuData from '@/assets/json/demo-menu.json'

const filteredCategories = ref(menuData?.categories || [])
const filteredProducts = ref(menuData?.products || [])

const productsByCategory = computed(() => {
    let groupedProducts = {};

    filteredProducts.value.forEach(product => {
        if (!groupedProducts[product.categoryId]) {
            groupedProducts[product.categoryId] = [];
        }
        groupedProducts[product.categoryId].push(product);
    });

    return groupedProducts;
})

const pageTitle = 'La Famiglia Ristorante'
useHead({
    title: `${pageTitle} - Restaurant Website Example`,
    bodyAttrs: {
        class: 'bg-slate-50'
    },
    meta: [
        { name: 'keywords', content: 'demo website, restaurant website design, digital food menu' },
        { name: 'description', content: `Restaurant Website Example - ${pageTitle}, modern and clean design. Created with LOVE using Nuxt.js, Vue.js, TailwindCSS and our Free Menu Maker` },
    ],
    htmlAttrs: {
        class: 'scroll-smooth'
    },
})

</script>
<template>
    <div class="container bg-white p-4 md:p-6 shadow-md rounded-md">
        <div class="flex items-center gap-6 justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" viewBox="0 0 256 256" fill="currentColor">
                <path
                    d="m229.4 114.8l-63.8-23.2a1.8 1.8 0 0 1-1.2-1.2l-23.2-63.8a14.1 14.1 0 0 0-26.4 0L91.6 90.4a1.8 1.8 0 0 1-1.2 1.2l-63.8 23.2a14.1 14.1 0 0 0 0 26.4l63.8 23.2a1.8 1.8 0 0 1 1.2 1.2l23.2 63.8a14.1 14.1 0 0 0 26.4 0l23.2-63.8a1.8 1.8 0 0 1 1.2-1.2l63.8-23.2a14.1 14.1 0 0 0 0-26.4Zm-4.1 15.1l-63.8 23.2a14 14 0 0 0-8.4 8.4l-23.2 63.8a2 2 0 0 1-3.8 0l-23.2-63.8a14 14 0 0 0-8.4-8.4l-63.8-23.2a2 2 0 0 1 0-3.8l63.8-23.2a14 14 0 0 0 8.4-8.4l23.2-63.8a2 2 0 0 1 3.8 0l23.2 63.8a14 14 0 0 0 8.4 8.4l63.8 23.2a2 2 0 0 1 0 3.8Z" />
            </svg>
            <h1 class="title font-bold text-center py-12">La Famiglia Ristorante</h1>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" viewBox="0 0 256 256" fill="currentColor">
                <path
                    d="m229.4 114.8l-63.8-23.2a1.8 1.8 0 0 1-1.2-1.2l-23.2-63.8a14.1 14.1 0 0 0-26.4 0L91.6 90.4a1.8 1.8 0 0 1-1.2 1.2l-63.8 23.2a14.1 14.1 0 0 0 0 26.4l63.8 23.2a1.8 1.8 0 0 1 1.2 1.2l23.2 63.8a14.1 14.1 0 0 0 26.4 0l23.2-63.8a1.8 1.8 0 0 1 1.2-1.2l63.8-23.2a14.1 14.1 0 0 0 0-26.4Zm-4.1 15.1l-63.8 23.2a14 14 0 0 0-8.4 8.4l-23.2 63.8a2 2 0 0 1-3.8 0l-23.2-63.8a14 14 0 0 0-8.4-8.4l-63.8-23.2a2 2 0 0 1 0-3.8l63.8-23.2a14 14 0 0 0 8.4-8.4l23.2-63.8a2 2 0 0 1 3.8 0l23.2 63.8a14 14 0 0 0 8.4 8.4l63.8 23.2a2 2 0 0 1 0 3.8Z" />
            </svg>
        </div>

        <div class="p-2 grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="flex gap-2 justify-between flex-col">
                <div> <span class="font-bold text-green-600">Open</span> Closes at 22:00 </div>
                <div>Cash & Card</div>
                <div>City, 1st Street, nr. 34, 856479</div>
            </div>
            <div class="grid grid-cols-1 place-content-center">
                <div class="flex cursor-pointer gap-4 items-center my-5 md:my-0 px-4 py-2 border-2 border-red-600 text-red-600
                    rounded-full max-w-max mx-auto md:mr-0">
                    <UIcon name="i-ph-phone-light" class="w-8 h-8"></UIcon>
                    <div class="text-lg font-medium">0123 456 7890</div>
                </div>
            </div>
        </div>
        <div class="menu-products min-h-screen py-6">
            <template v-for="category in filteredCategories">
                <template v-if="productsByCategory[category.uid]">
                    <div class="text-3xl mb-6 font-semibold uppercase border-y-2 border-gray-400 py-2.5 px-4">
                        {{ category.name }}
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-4 md:gap-y-6 md:gap-x-4 pb-10 pt-2">
                        <div v-for="product in productsByCategory[category.uid]" :key="product.uid" class=" px-4 flex
                            flex-col flex-grow">
                            <div class="flex gap-4 items-center">
                                <div class="font-bold mb-1 text-2xl">{{ product.name }}</div>
                                <div v-if="product.tags" class="flex gap-2 overflow-x-auto">
                                    <div v-for="tag in product.tags"
                                        class="text-xs px-2 py-1 rounded-full bg-green-600 bg-opacity-10 text-green-600 flex-shrink-0">
                                        {{ tag }}</div>
                                </div>
                            </div>
                            <div class="text-gray-600 my-1 line-clamp-3 w-full">{{ product.description }}</div>
                            <!-- prices -->
                            <div v-if="product.options">
                                <div v-for="item in product.options"
                                    class="flex items-center gap-2 mt-auto pt-4 justify-between">
                                    <div class="text-sm">
                                        {{ item.size }}</div>
                                    <div class="font-medium flex gap-2 items-center">
                                        <div v-if="item.salePrice">$ {{ item.salePrice }}</div>
                                        <div :class="{ '!text-red-600 line-through !text-opacity-50': item.salePrice }">
                                            $
                                            {{ item.price }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </template>
            <div v-if="!Object.keys(productsByCategory).length" class="py-10 text-center text-2xl">
                Sorry, no products found!
            </div>

        </div>

    </div>
</template>