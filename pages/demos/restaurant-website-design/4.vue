<script setup>
import { computed, ref, onMounted } from 'vue';
import gsap from "gsap";

// get other plugins:
import ScrollTrigger from "gsap/ScrollTrigger";

import menuData from '@/assets/json/demo-menu.json'


const onefmCategory = ref(null)
const showModal = ref(false)
const showSearchBar = ref(false)
const productForModal = ref(null)
const searchBar = ref(null);
const selectedCategory = ref('')
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

const filterCategories = (category_id) => {

    if (!category_id) {
        selectedCategory.value = ''
        filteredCategories.value = [...menuData.categories]
        return
    }

    selectedCategory.value = category_id
    filteredCategories.value = [...menuData.categories].filter(category => category.uid == category_id)
}

const filterProducts = (ev) => {

    let searchKey = ev.target.value.toLocaleLowerCase().trim()

    if (searchKey?.length < 3) {

        return filteredProducts.value = [...menuData.value.products]
    }

    filteredProducts.value = [...menuData.value.products].filter(obj => {
        return Object.values(obj)
            .join(' ')
            .slice(1)
            .toLocaleLowerCase()
            .includes(searchKey)
    })
}

const closeSearchBar = (vl = true) => {
    showSearchBar.value = vl
    filteredCategories.value = [...menuData.value.categories]
    selectedCategory.value = ''
    filteredProducts.value = [...menuData.value.products]
}

const openModal = (product) => {
    showModal.value = true
    productForModal.value = product
}

const closeModal = () => {
    showModal.value = false
    productForModal.value = null
}
useHead({
    title: 'Restaurant Website Design Example - Tony\'s Restaurant',
    bodyAttrs: {
        class: 'bg-slate-50'
    },
    meta: [
        { name: 'keywords', content: 'demo website, restaurant website design, digital food menu' },
        { name: 'description', content: `Demo website of Tony\'s Restaurant, modern and clean design. Created with LOVE using Nuxt.js, TailwindCSS and Free Menu Maker` },
    ],
})

onMounted(() => {
    gsap.registerPlugin(ScrollTrigger)
    onefmCategory.value.forEach(category => {
        gsap.fromTo(category.children, { autoAlpha: 0, y: 40 }, {
            scrollTrigger: {
                trigger: category,
                start: "20px 95%",
                // markers: true,
            },
            autoAlpha: 1,
            y: 0,
            stagger: 0.3,
            duration: .8,
            ease: "expo.easeOut"
        })
    })

})

</script>
<template>
    <div>

        <Body class="bg-slate-50" />
        <div style="background-image:url('https://images.pexels.com/photos/2165919/pexels-photo-2165919.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load')"
            class="image-bg relative">
            <div class="bg-black absolute top-0 right-0 h-full w-full bg-opacity-80"></div>
            <div class="container relative z-10">
                <div class="py-44  grid place-content-center grid-cols-1">
                    <div class="flex gap-4 items-center justify-center flex-col md:flex-row">
                        <div class="flex-shrink-0">
                            <svg class="w-20 text-white" viewBox="0 0 256 256">
                                <path fill="currentColor"
                                    d="M237.6 78.9a13.9 13.9 0 0 0-3.7-18.9a181.9 181.9 0 0 0-211.8 0a13.9 13.9 0 0 0-3.7 18.9l97.8 153.7a14 14 0 0 0 23.6 0l58.4-91.8h.1ZM29.1 69.7a170.1 170.1 0 0 1 197.8 0a2.1 2.1 0 0 1 .6 2.8l-9.8 15.3a149.9 149.9 0 0 0-179.4 0l-9.8-15.3a2.1 2.1 0 0 1 .6-2.8Zm35.6 59.7a22 22 0 1 1 20.7 32.5Zm65 96.8a2.1 2.1 0 0 1-3.4 0l-33.9-53.3a34 34 0 1 0-34.7-54.5L44.7 98a137.9 137.9 0 0 1 166.6 0l-19.4 30.4a34 34 0 1 0-36.5 57.3Zm32.2-50.7A22 22 0 0 1 172 134a21.5 21.5 0 0 1 13.4 4.6Z" />
                            </svg>
                        </div>
                        <h1 class="subtitle font-bold text-white">Tony's Restaurant</h1>
                    </div>
                    <div class="flex gap-4 justify-center items-center mt-20 cursor-pointer text-white">
                        <div class="flex item-center rounded-full border-2 border-red-600">
                            <div
                                class="h-11 w-11 flex justify-center items-center bg-red-600 rounded-full flex-shrink-0">
                                <svg class="w-6 h-6 text-white" viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                        d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24c1.12.37 2.33.57 3.57.57c.55 0 1 .45 1 1V20c0 .55-.45 1-1 1c-9.39 0-17-7.61-17-17c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02l-2.2 2.2z" />
                                </svg>
                            </div>
                            <div class="font-semibold text-lg px-4 py-2 tracking-widest">
                                0123 456 7890
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="flex flex-col md:flex-row items-center gap-4 text-center justify-center text-white relative p-4 px-6 bg-black bg-opacity-30 md:bg-opacity-70">
                <div class="flex justify-between w-full md:w-auto gap-3">
                    <div class="text-green-500">Open</div>
                    <div>Closes at 23:00</div>
                    <span class="hidden md:block">&#183;</span>
                </div>
                <div class="flex justify-between w-full md:w-auto gap-3">
                    <div class="text-green-500">We accept</div>
                    <div>Cash & Card</div>
                    <span class="hidden md:block">&#183;</span>
                </div>
                <div class="flex justify-between w-full md:w-auto gap-3">
                    <div class="text-green-500">Our address</div>
                    <div>City, 1st Street, nr. 34, 856479</div>
                </div>
            </div>
        </div>
        <div class="border-b bg-white sticky top-0 z-10">
            <div class="container relative overflow-hidden">
                <div class="overflow-x-auto py-4 px-1 text-sm">
                    <div class="flex gap-4 mx-auto">
                        <div @click.prevent="showSearchBar = !showSearchBar"
                            class="h-10 w-10 flex flex-shrink-0 items-center justify-center bg-gray-600 bg-opacity-10 text-black rounded-full cursor-pointer">
                            <svg v-if="!showSearchBar" class="w-6 h-6" viewBox="0 0 20 20">
                                <path fill="currentColor" fill-rule="evenodd"
                                    d="M8 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8ZM2 8a6 6 0 1 1 10.89 3.476l4.817 4.817a1 1 0 0 1-1.414 1.414l-4.816-4.816A6 6 0 0 1 2 8Z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div v-for="category in [{ uid: '', name: 'View All' }, ...menuData.categories]"
                            :key="category.uid" @click="filterCategories(category.uid)"
                            :class="{ '!bg-blue-700 bg-opacity-70 text-white border-transparent': selectedCategory == category.uid }"
                            class="bg-white border border-gray-300 py-2 px-4 h-10 overflow-hidden rounded-full cursor-pointer flex-shrink-0 duration-500">
                            {{
                            category.name }}</div>
                    </div>
                </div>
                <Transition name="fade">
                    <div class="flex items-center gap-4 absolute w-full top-0 py-4 px-1 bg-white" v-if="showSearchBar">
                        <div @click.prevent="closeSearchBar(false)"
                            class="h-10 w-10 flex flex-shrink-0 items-center justify-center bg-gray-600 bg-opacity-10 text-black rounded-full cursor-pointer">
                            <svg class="w-6 h-6" viewBox="0 0 24 24">
                                <path fill="currentColor"
                                    d="M6.225 4.811a1 1 0 0 0-1.414 1.414L10.586 12L4.81 17.775a1 1 0 1 0 1.414 1.414L12 13.414l5.775 5.775a1 1 0 0 0 1.414-1.414L13.414 12l5.775-5.775a1 1 0 0 0-1.414-1.414L12 10.586L6.225 4.81Z" />
                            </svg>
                        </div>
                        <div class="w-full max-w-sm relative">
                            <input type="text" @input="filterProducts" placeholder="Search ..."
                                class="h-10 border rounded-full px-4 w-full" ref="searchBar" />
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
        <div class="container">
            <div class="menu-products min-h-96">
                <template v-for="category in filteredCategories">
                    <template v-if="productsByCategory[category.uid]">
                        <div class="text-2xl mt-6 font-semibold mb-2">
                            {{ category.name }}
                        </div>
                        <div ref="onefmCategory"
                            class="onefm-category flex gap-6 overflow-y-auto snap-x snap-mandatory pb-6 pt-10">
                            <div v-for="product in productsByCategory[category.uid]" @click="openModal(product)"
                                class="onefm-product flex cursor-pointer flex-col rounded-xl  bg-white w-72 flex-shrink-0 snap-start shadow">
                                <div class="h-52 w-full image-bg image-bg-2 shrink-0 border-b border-opacity-50">
                                    <div class="image-bg h-full w-full rounded-t-xl"
                                        :style="`background-image: url(${product.imageUrl})`">
                                    </div>
                                </div>
                                <div class="p-4 flex flex-col flex-grow">
                                    <div class="font-bold my-2">{{ product.name }}</div>
                                    <div class="text-gray-600 my-2 line-clamp-2">{{ product.description
                                        }} </div>
                                    <div class="flex justify-between mt-auto pt-2">
                                        <div class="text-sm text-gray-400">
                                            {{ product.options?.[0]?.size }}</div>
                                        <div class="font-bold flex gap-2 items-center">
                                            <div v-if="product.options?.[0]?.salePrice" class="text-gray-700">$ {{
                                                product.options?.[0]?.salePrice }}</div>
                                            <div class="text-gray-700"
                                                :class="{ '!text-red-600 line-through': product.options?.[0]?.salePrice }">
                                                $
                                                {{ product.options?.[0]?.price }}</div>
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
            <UModal v-model="showModal" :ui="{ width: 'sm:max-w-[375px]' }">
                <div class="flex flex-col bg-white flex-shrink-0 rounded-xl overflow-hidden relative">
                    <UButton square color="gray" variant="soft" icon="i-ph-x-bold"
                        class="absolute rounded-full bg-opacity-60 right-3 top-3 font-bold text-gray-950"
                        @click="showModal = false" />
                    <div class="h-80 w-full image-bg image-bg-2 shrink-0 border-b border-opacity-50">
                        <div class="image-bg h-full w-full rounded-t-xl"
                            :style="`background-image: url(${productForModal.imageUrl})`">
                        </div>
                    </div>
                    <div class="p-4 flex flex-col flex-grow">
                        <div class="font-bold my-2">{{ productForModal.name }}</div>
                        <div v-if="productForModal.tags" class="flex gap-2 overflow-x-auto">
                            <div v-for="tag in productForModal.tags"
                                class="text-xs px-2 py-1 rounded-full bg-green-600 bg-opacity-10 text-green-600 flex-shrink-0">{{ tag
                                }}</div>
                        </div>
                        <div class="text-gray-600 my-2">{{ productForModal.description }}</div>

                        <div v-if="productForModal.options">
                            <div v-for="item in productForModal.options" class="flex justify-between mt-auto pt-2">
                                <div class="text-sm text-gray-400">
                                    {{ item.size }}</div>
                                <div class="flex gap-2 items-center">
                                    <div v-if="item.salePrice" class="text-gray-700">$ {{ item.salePrice }}</div>
                                    <div class="text-gray-700"
                                        :class="{ '!text-red-600 line-through': item.salePrice }">$
                                        {{ item.price }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </UModal>
        </div>
    </div>
</template>
<style>
.image-bg,
.image-bg-2 {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.image-bg-2 {
    background-image: url('https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image-300x225.png');
    background-color: rgba(231, 231, 231, 0.217);
}

.fade-enter-active,
.fade-leave-active {
    transition: transform 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
    transform: translateY(-100%);
}
</style>