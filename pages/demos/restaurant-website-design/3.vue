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

const galleryList = [
    'https://images.pexels.com/photos/541216/pexels-photo-541216.jpeg',
    'https://images.pexels.com/photos/1267360/pexels-photo-1267360.jpeg',
    'https://images.pexels.com/photos/995743/pexels-photo-995743.jpeg',
    'https://images.pexels.com/photos/1546039/pexels-photo-1546039.jpeg',
]

</script>
<template>
    <div class="bg-white">
        <div class="container text-center">
            <div class="py-12">
                <div class="flex items-center gap-4 justify-center">
                    <UIcon name="i-ph-star-four" class="shrink-0 h-8 w-8 text-gray-400">
                    </UIcon>
                    <h1 class="text-3xl md:text-5xl font-bold">La Famiglia Ristorante</h1>
                    <UIcon name="i-ph-star-four" class="shrink-0 h-8 w-8 text-gray-400">
                    </UIcon>
                </div>
                <div class="mt-6 text-lg text-gray-600">Where Every Meal Feels Like Family</div>
            </div>
            <div
                class="grid grid-cols-1 md:grid-cols-4 border-t-2 border-gray-900 md:py-4 divide-y divide-gray-300 divide-dashed md:divide-y-0">
                <div class="p-6">
                    <div>Working hours</div>
                    <div class="font-semibold md:text-lg mt-2"><span class="text-green-600">Open Now</span>: Closes at
                        10 pm
                    </div>
                </div>
                <div class="p-6">
                    <div>We accept</div>
                    <div class="font-semibold md:text-lg mt-2">Only Cash</div>
                </div>
                <div class="p-6">
                    <div>Our address</div>
                    <div class="font-semibold md:text-lg mt-2">Street 34/1, City, 83838</div>
                </div>
                <div class="p-6">
                    <div>Reserve a table</div>
                    <div class="group font-semibold md:text-lg mt-2 inline-flex items-center gap-2 text-green-600">
                        <UIcon name="i-ph-phone-bold group-hover:rotate-45 duration-500" class="w-6 h-6"></UIcon>
                        <span class="text-xl font-semibold">0123 456 7890</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="md:max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4">
        <div v-for="item in galleryList" class="aspect-square">
            <img :src="item" alt="La Famiglia Restaurant photos" class="object-cover w-full h-full grayscale hover:grayscale-0 duration-700"/>
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
    <footer class="border-t border-r-gray-100">
        <div class="container py-6 flex gap-6 items-center flex-col md:flex-row md:justify-between">
            <div class="">
                La Famiglia Ristorante
            </div>
            <div>Created with &lt;3 by <NuxtLink to="/" class="font-bold">me</NuxtLink>
            </div>
        </div>
    </footer>
</template>