<script setup>
import { ref, onMounted } from 'vue';
import gsap from "gsap";
// get other plugins:
import ScrollTrigger from "gsap/ScrollTrigger";
import staticMenu from '@/assets/json/demo-menu.json'

const pageTitle = 'Tony\'s Restaurant'
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

const { menuData, groupedMenu, menuCategories, singleProduct, selectedProductID } = useMenu(staticMenu)

//modal
const showModal = ref(false)
const openModal = (product_id) => {
    selectedProductID.value = product_id
    showModal.value = true
    // singleProduct.value = product
}


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
            ease: "expo.easeOut"
        })
    })

})

</script>
<template>
    <div>
        <div style="background-image:url('https://images.unsplash.com/photo-1579027989536-b7b1f875659b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
            class="image-bg relative">
            <div class="bg-black/70 absolute inset-0"></div>
            <div class="relative z-10 h-screen flex flex-col items-center justify-center">
                <div class="container flex-grow grid place-content-center grid-cols-1">
                    <div class="flex gap-4 items-center justify-center flex-col md:flex-row">
                        <UIcon name="i-ph-pizza" class="shrink-0 w-20 h-20 text-white"></UIcon>
                        <h1 class="text-4xl md:text-5xl font-bold text-white">Tony's Restaurant</h1>
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
                <div
                    class="mt-auto container flex flex-col md:flex-row items-center gap-6 text-center justify-center text-white relative py-6">
                    <div class="flex justify-between w-full md:w-auto gap-3">
                        <div class="text-green-500">Open</div>
                        <div>Closes at 23:00</div>
                        <span class="hidden md:block ml-3">&#183;</span>
                    </div>
                    <div class="flex justify-between w-full md:w-auto gap-3">
                        <div class="text-green-500">We accept</div>
                        <div>Cash & Card</div>
                        <span class="hidden md:block ml-3">&#183;</span>
                    </div>
                    <div class="flex justify-between w-full md:w-auto gap-3">
                        <div class="text-green-500">Our address</div>
                        <div>City, 1st Street, nr. 34, 856479</div>
                    </div>
                </div>
            </div>
        </div>
        <DemosCategoryTabs :categories="menuCategories" class="border-b border-gray-200" />
        <div class="container">
            <div class="min-h-96 mt-12">
                <div v-for="category in menuCategories" :data-category-section="category.uid" class="mb-12">
                    <div :id="category.uid" class="h-0 w-0 opacity-0 -z-10 -translate-y-[90px]"></div>
                    <div class="text-2xl mb-2 font-semibold">
                        {{ category.name }}
                    </div>
                    <div ref="onefmCategory" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-3 gap-6">
                        <div v-for="product in groupedMenu.products[category.uid]" @click="openModal(product.uid)"
                            class="flex cursor-pointer p-4 rounded-lg  bg-white border border-gray-300 gap-6 h-40 group">
                            <div
                                class="h-28 w-28 image-bg overflow-hidden rounded shrink-0 self-center group-hover:scale-110 duration-500">
                                <img class="image-bg h-full w-full" :src="product.imageUrl" />
                            </div>
                            <div class="flex flex-col flex-grow h-full">
                                <div class="font-semibold line-clamp-2">{{ product.name }}</div>
                                <div class="text-gray-600 mt-2 line-clamp-2 text-sm">{{ product.description
                                    }} </div>
                                <div class="flex justify-between mt-auto pt-2">
                                    <div class="text-sm text-gray-400">
                                        {{ product.options?.[0]?.size }}</div>
                                    <div class="flex gap-2 items-center">
                                        <div v-if="product.options?.[0]?.salePrice">$ {{
                                            product.options?.[0]?.salePrice }}</div>
                                        <div
                                            :class="{ 'text-red-600 line-through text-sm opacity-70': product.options?.[0]?.salePrice }">
                                            $ {{ product.options?.[0]?.price }}</div>
                                        <span v-if="product.options?.[1]"
                                            class="arrow-down rounded bg-slate-200"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="!Object.keys(groupedMenu.products).length" class="py-10 text-center text-2xl">
                    Sorry, no products found!
                </div>

            </div>
            <UModal v-model:open="showModal"
                :ui="{ content: 'sm:max-w-[375px]', overlay: { background: 'bg-gray-600 bg-opacity-70' } }">
                <template #content>
                    <DemosViewProductModal :product="singleProduct" :allergens="menuData.allergens"
                        @close="showModal = false" />
                </template>
            </UModal>
        </div>
        <footer class="border-t border-gray-100 bg-white">
            <div class="container py-6 flex gap-6 items-center flex-col md:flex-row md:justify-between">
                <div class="font-semibold">
                    Tony's Restaurant
                </div>
                <div>Created with &lt;3 by <NuxtLink to="/" class="font-bold">Nick</NuxtLink>
                </div>
            </div>
        </footer>
    </div>
</template>