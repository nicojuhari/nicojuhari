<script setup>
import staticMenu from '@/assets/json/demo-menu.json'

const { groupedMenu, menuCategories, menuData } = useMenu(staticMenu)

useHead({
    title: `La Famiglia Ristorante - Restaurant Website Example`,
})

const reviews = [
    {
        name: 'Emily',
        text: 'The pasta was divine and the ambiance perfect!'
    },
    {
        name: 'Mark',
        text: 'Best pizza in town—absolutely loved it!'
    },
    {
        name: 'Sofia',
        text: 'Every bite was a culinary delight—truly unforgettable!'
    }
]

</script>
<template>
    <div class="">
        <div class="bg-gray-900 text-white lg:mb-[170px]">
            <header class="border-b border-white/10">
                <div class="h-14 flex justify-between items-center px-4 container">
                    <UIcon name="i-ph-chef-hat-light" class="w-8 h-8 shrink-0"></UIcon>
                    <div class="py-2.5 flex gap-2 items-center justify-center">
                       <div class="w-5 h-5 bg-green-500/60 rounded-full grid place-content-center">
                           <div class="bg-green-500 w-2 h-2 rounded-full"></div>
                       </div>
                       <div class="text-lg text-green-500">We are open</div>
                   </div>
                </div>
            </header>
            <div class="py-18 lg:pt-32 lg:pb-0 text-center container">
                <h1 class="text-5xl md:text-5xl font-semibold mt-8">La Famiglia Ristorante</h1>
                <p class="mt-4 text-lg text-gray-300">Where Every Meal Feels Like Family</p>
                <a href="tel:0123456789" class="mt-10 py-1.5 px-4 inline-flex gap-2 items-center justify-center text-[#d83636] border-2 border-[#d83636] rounded-full">
                    <UIcon name="i-ph-phone-call" class="w-8 h-8 shrink-0"></UIcon>
                    <span class="font-medium text-2xl">0123 456 789</span>
                </a>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 px-4 py-4 container relative lg:translate-y-[50%]">
                <div class="aspect-square overflow-hidden rounded-lg">
                    <img src="https://images.pexels.com/photos/5710170/pexels-photo-5710170.jpeg" alt="La Famiglia Restaurant photos" class="object-cover w-full h-full"/>
                </div>
                <div class="flex flex-col gap-6 justify-center px-4 bg-gray-800 rounded-lg aspect-square">
                    <div class="py-4 flex gap-4 items-center lg:justify-center flex-col">
                        <UIcon name="i-ph-money-wavy-duotone" class="w-8 h-8 text-green-500 shrink-0" />
                        <div class="font-medium">We accept only cash</div>
                    </div>
                    <div class="py-4 flex gap-4 items-center lg:justify-center flex-col">
                        <UIcon name="i-ph-map-pin-duotone" class="w-8 h-8 text-green-500 shrink-0" />
                        <div class="font-medium">Street Name 12, City</div>
                    </div>
                </div>
                <div class="aspect-square overflow-hidden rounded-lg">
                    <img src="https://images.pexels.com/photos/22863502/pexels-photo-22863502/free-photo-of-cup-of-delicious-coffee-with-foam.jpeg" alt="La Famiglia Restaurant photos" class="object-cover w-full h-full"/>
                </div>
                <div class="flex flex-col gap-6 justify-center p-4 bg-gray-800 rounded-lg aspect-square">
                    <UCarousel v-slot="{ item }" :items="reviews" fade loop :autoplay="{ delay: 4000 }">
                        <div class="text-center flex justify-center gap-1 mx-auto mb-2 mt-4">
                            <UIcon name="i-ph-star-fill" v-for="item in 5" class="w-5 h-5 text-yellow-500" />
                        </div>
                        <div class="text-center">
                        <div class="text-xl my-4">{{ item.text }}</div> 
                            <div class="italic">{{ item.name }}</div>
                        </div>
                    </UCarousel>
                </div>
            </div>
        </div>
        <div v-for="category in menuCategories" class="my-14 container">
            <div class="text-4xl text-center mb-14 font-semibold uppercase py-4">
                {{ category.name, category.uid }}
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 px-4 lg:px-6 ">
                <div v-for="product in groupedMenu.products[category.uid]" :key="product.uid" class="flex flex-col lg:flex-row gap-2 lg:gap-6 flex-grow w-full">
                    <img :src="product.imageUrl" class="aspect-video h-52 lg:aspect-square rounded-lg object-cover shadow" />
                    <div class="w-full">
                        <div class="font-semibold mb-1 inline-flex flex-wrap gap-2 items-center">
                            <span class="line-clamp-2 text-xl">{{ product.name }}</span>
                            <span v-for="item in product.allergens"
                                class="cursor-pointer font-medium flex-shrink-0 text-gray-600 text-xs p-1 bg-slate-50 rounded-full border border-slate-100 w-4 h-4 grid place-content-center">
                                {{ menuData.allergens.find((al) => al.uid == item).name }}
                            </span>
                        </div>
                        <!-- <div class="font-bold mb-1 text-2xl shrink-0 line-clamp-2">{{ product.name }}</div> -->
                            <div v-if="product.tags" class="flex gap-2 flex-wrap">
                                <div v-for="tag in product.tags"
                                    class="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-500 flex-shrink-0">
                                    {{ tag }}</div>
                            </div>
                        <div class="text-gray-600 my-2 w-full">{{ product.description }}</div>
                        <div class="pt-6">
                            <div v-for="item in product.options"
                                class="flex items-center gap-2 mt-auto justify-between border-t first:border-t-0 border-dashed border-gray-200 py-2">
                                <div class="text-sm text-gray-600">
                                    {{ item.size }}</div>
                                <div class="font-medium flex gap-2 items-center">
                                    <div v-if="item.salePrice">$ {{ item.salePrice }}</div>
                                    <div :class="{ 'text-[#d83636] line-through text-opacity-50': item.salePrice }">
                                        $ {{ item.price }} </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- prices -->
                </div>
            </div>
        </div>
        <div v-if="menuData.allergens?.length" class="my-14 container">
            <h2 class="text-4xl text-center mb-14 font-semibold uppercase py-4">Allergens</h2>
            <div class="px-4 flex flex-wrap gap-6 justify-center items-center">
                <div v-for="item in menuData.allergens"> 
                    {{  item.name }} - {{ item.description }}
                </div>
            </div>
        </div>
        <div v-if="!Object.keys(groupedMenu).length" class="py-10 text-center text-2xl container">
            Sorry, no products found!
        </div>
        <div class="my-10 text-center container">
            <div class="font-bold text-xl">Book a Table</div>
            <a href="tel:0123456789" class="mt-10 py-1.5 px-4 inline-flex gap-2 items-center justify-center text-[#d83636] border-2 border-[#d83636] rounded-full">
                <UIcon name="i-ph-phone-call" class="w-8 h-8 shrink-0"></UIcon>
                <span class="font-medium text-2xl">0123 456 789</span>
            </a>
        </div>
        <footer class="bg-gray-900 text-white">
            <div class="px-4 py-6 flex gap-6 items-center flex-col md:flex-row md:justify-between container">
                <div class="">
                    La Famiglia Ristorante
                </div>
                <div class="gap-2.5 flex items-center text-center justify-center">Created with <UIcon name="i-ph-heart-fill" class="text-red-600 h-4"></UIcon><nuxt-link to="https://nicojuhari.com/">by Nick</nuxt-link></div>
            </div>
        </footer>
    </div>
</template>