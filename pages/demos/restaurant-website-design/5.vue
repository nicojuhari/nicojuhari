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
            <div class="container grid grid-cols-1 md:grid-cols-2 py-4 md:gap-6">
                <img src="https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    class="h-72 object-cover w-full rounded-md" />
                <div class="py-4 flex flex-col">
                    <h1 class="title font-bold">Bella Cucina Restaurant</h1>
                    <div class="text-gray-600 text-lg">Where Taste Comes Alive</div>
                    <div class="flex flex-col gap-2.5 relative my-8">
                        <div class="flex flex-1 gap-2">
                            <div class="text-blue-500 font-bold">Open</div>
                            <span>&#183;</span>
                            <div>Closes at 22:00</div>
                        </div>
                        <div class="flex gap-2">
                            <div>Cash & Card</div>
                            <span>&#183;</span>
                            <div>City, 1st Street, nr. 34, 856479</div>
                        </div>
                        <div class="flex gap-2">
                            <UIcon name="i-ph-star-fill" class="w-6 h-6 text-blue-500" />
                            <span class="font-medium">4.9</span>
                            <div>Very Good</div>
                        </div>
                    </div>
                    <div>
                        <UButton color="blue"> Order Now </UButton>
                        <span class="ml-4">Deliver in 30 - 50 mins</span>
                    </div>
                </div>

            </div>
        </div>
        <DemosCategoryTabs :categories="menuData.categories" class="border-t" />
        <div class="container">
            <div class="menu-products min-h-96">
                <template v-for="category in groupedMenu.categories">
                    <div class="text-2xl mt-6 font-semibold mb-2">
                        {{ category.name }}
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6 pt-2" ref="onefmCategory">
                        <div v-for="product in groupedMenu.products[category.uid]" @click="openModal(product.uid)"
                            :key="product.uid"
                            class="flex gap-4 cursor-pointer rounded-lg  bg-white flex-shrink-0 shadow-md hover:shadow-2xl duration-300 h-44 p-6">

                            <div class="flex flex-col flex-grow">
                                <div class="font-medium mb-1">{{ product.name }}</div>
                                <div class="text-gray-600 line-clamp-2 text-sm">{{ product.description
                                    }}</div>
                                <div class="flex items-center gap-2 mt-auto pt-2">
                                    <div class="flex gap-2 items-center">
                                        <div v-if="product.options?.[0]?.salePrice" class="text-blue-700">$ {{
                                            product.options?.[0]?.salePrice }}</div>
                                        <div class="text-blue-600"
                                            :class="{ '!text-red-600 line-through': product.options?.[0]?.salePrice }">
                                            $ {{ product.options?.[0]?.price }}</div>
                                    </div>
                                    <div class="text-sm text-gray-400" v-if="product.options?.[0]?.size"> / {{
                                        product.options?.[0]?.size }} </div>

                                </div>
                            </div>
                            <div class="h-full w-28 image-bg image-bg-2 shrink-0 border border-opacity-50 rounded-lg overflow-hidden">
                                <div class="image-bg h-full w-full"
                                    :style="`background-image: url(${product.imageUrl})`">
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                <div v-if="!Object.keys(groupedMenu).length" class="py-10 text-center text-2xl">
                    Sorry, no products found!
                </div>

            </div>
            <UModal v-model="showModal"
                :ui="{ width: 'sm:max-w-[375px]', overlay: { background: 'bg-gray-600 bg-opacity-70' } }">
                <DemosViewProductModal :product="singleProduct" :allergens="menuData.allergens"
                    @close="showModal = false" />
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