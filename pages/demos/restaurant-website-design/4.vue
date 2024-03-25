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

const { menuData, groupedMenu, searchKey, selectedCategoryID, singleProduct, selectedProductID } = useMenu(staticMenu)


const showModal = ref(false)
const showSearchBar = ref(false)

const closeSearch = () => {
    searchKey.value = ''
    showSearchBar.value = false
    selectedCategoryID.value = ''
}

const openSearch = () => {
    searchKey.value = ''
    showSearchBar.value = true
    selectedCategoryID.value = ''
}

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
            <div class="bg-black absolute inset-0 bg-opacity-70"></div>
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
        <DemosCategoryTabs :categories="menuData.categories" class="border-b" />
        <div class="container">
            <div class="min-h-96">
                <div v-for="category in groupedMenu.categories" :data-category-section="category.uid">
                    <div :id="category.uid" class="h-0 w-0 opacity-0 -z-10 -translate-y-[90px]"></div>
                    <div class="text-2xl mt-6 font-semibold mb-2">
                        {{ category.name }}
                    </div>
                    <div ref="onefmCategory"
                        class="onefm-category flex gap-6 overflow-y-auto snap-x snap-mandatory pb-6 pt-10">
                        <div v-for="product in groupedMenu.products[category.uid]" @click="openModal(product.uid)"
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
                </div>
                <div v-if="!Object.keys(groupedMenu.products).length" class="py-10 text-center text-2xl">
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