<script setup>
import { computed, ref, onMounted } from 'vue';
import gsap from "gsap";

// get other plugins:
import ScrollTrigger from "gsap/ScrollTrigger";

import staticMenu from '@/assets/json/demo-menu.json'

const { menuData, groupedMenu, selectedProductID, singleProduct } = useMenu(staticMenu);

//modal
const showModal = ref(false)
const openModal = (product_id) => {
    selectedProductID.value = product_id
    showModal.value = true
}

const pageTitle = 'Bella Cucina Restaurant'
useHead({
    title: `${pageTitle} - Restaurant Website Example`,
    bodyAttrs: {
        class: 'bg-slate-50'
    },
    meta: [
        { name: 'keywords', content: 'demo website, restaurant website design, digital food menu' },
        { name: 'description', content: `Restaurant Website Example - ${pageTitle}, modern and clean design. Created with LOVE using Nuxt.js, Vue.js, TailwindCSS and our Free Menu Maker` },
    ],
})

//gsap animation
const onefmCategory = ref(null)
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
        })
    })

})

</script>
<template>
    <div>
        <div class="bg-white">
            <div class="container grid grid-cols-1 md:grid-cols-2 !w-full md:py-4">
                <img src="https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    class="h-72 object-cover w-full md:rounded-md" />
                <div class="p-4 flex flex-col">
                    <h1 class="title font-bold">Bella Cucina Restaurant</h1>
                    <div class="flex flex-col gap-2 relative py-4">
                        <div class="flex gap-2">
                            <div class="text-green-500 font-bold">Open</div>
                            <span>&#183;</span>
                            <div>Closes at 22:00</div>
                        </div>
                        <div class="flex gap-2">
                            <div>Cash & Card</div>
                            <span>&#183;</span>
                            <div>City, 1st Street, nr. 34, 856479</div>
                        </div>
                    </div>
                    <div
                        class="flex gap-4 items-center mt-10 md:mt-auto px-4 py-2 bg-green-500 bg-opacity-10 rounded-full max-w-max md:ml-0 mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6 text-green-500 flex-shrink-0 font-bold">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                        <div class="text-lg font-semibold text-green-500 cursor-pointer">0123 456 7890</div>
                    </div>
                </div>
            </div>
        </div>
        <DemosCategoryTabs :categories="menuData.categories" />
        <div class="container">
            <div class="menu-products min-h-96">
                <template v-for="category in groupedMenu.categories">
                    <div class="text-2xl mt-6 font-semibold mb-2">
                        {{ category.name }}
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 pt-2" ref="onefmCategory">
                        <div v-for="product in groupedMenu.products[category.uid]" @click="openModal(product.uid)"
                            :key="product.uid"
                            class="flex cursor-pointer rounded-xl  bg-white flex-shrink-0 snap-start shadow-lg h-40">
                            <div
                                class="h-full w-40 image-bg image-bg-2 shrink-0 border-b border-opacity-50 rounded-l-xl">
                                <div class="image-bg h-full w-full rounded-l-xl"
                                    :style="`background-image: url(${product.imageUrl})`">
                                </div>
                            </div>
                            <div class="p-4 flex flex-col flex-grow">
                                <div class="font-bold mb-2">{{ product.name }}</div>
                                <div class="opacity-60 leading-none my-2 line-clamp-2 w-full">{{ product.description
                                    }}</div>
                                <div class="flex justify-between mt-auto pt-2">
                                    <div class="text-sm text-gray-400"> {{ product.options?.[0]?.size }} </div>
                                    <div class="font-bold flex gap-2 items-center">
                                        <div v-if="product.options?.[0]?.salePrice" class="text-green-700">$ {{
                                            product.options?.[0]?.salePrice }}</div>
                                        <div class="text-green-700"
                                            :class="{ '!text-red-600 line-through': product.options?.[0]?.salePrice }">
                                            $
                                            {{ product.options?.[0]?.price }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                <div v-if="!Object.keys(groupedMenu).length" class="py-10 text-center text-2xl">
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
                            :style="`background-image: url(${singleProduct.imageUrl})`">
                        </div>
                    </div>
                    <div class="p-4 flex flex-col flex-grow">
                        <div class="font-bold my-2">{{ singleProduct.name }}</div>
                        <div v-if="singleProduct.tags" class="flex gap-2 overflow-x-auto">
                            <div v-for="tag in singleProduct.tags"
                                class="text-xs px-2 py-1 rounded-full bg-green-600 bg-opacity-10 text-green-600 flex-shrink-0">
                                {{ tag
                                }}</div>
                        </div>
                        <div class="text-gray-600 my-2">{{ singleProduct.description }}</div>

                        <div v-if="singleProduct.options">
                            <div v-for="item in singleProduct.options" class="flex justify-between mt-auto pt-2">
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
        <footer class="border-t border-r-gray-100">
            <div class="container py-6 flex gap-6 items-center flex-col md:flex-row md:justify-between">
                <div class="font-bold">Bella Cucina</div>
                <div>Created with &lt;3 by <NuxtLink to="/" class="font-bold">me</NuxtLink>
                </div>
            </div>
        </footer>
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
</style>