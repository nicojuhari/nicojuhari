<script setup>
import staticMenu from '@/assets/json/demo-gud-menu.json'

const { menuData, groupedMenu, singleProduct, selectedProductID } = useMenu(staticMenu)

const pageTitle = 'GUD Restaurant'
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

const list = [
    {
        name: 'Lucia',
        review: 'Cel mai gustos burger din lume',
    },
    {
        name: 'Nicolae',
        review: 'Eu am mai mîncat, dar așa de GUD niciodată',
    },
    {
        name: 'Constantin',
        review: 'Mai gustos decît la mama acasă',
    },
    {
        name: 'Ana',
        review: 'Cel mai gustos burger din lume',
    }
]

const currentReview = ref(0)

onMounted(() => {
    setInterval(() => {
        currentReview.value = (currentReview.value + 1) % list.length
    }, 4000)
})

//modal
const showModal = ref(false)
const openModal = (product_id) => {
    selectedProductID.value = product_id
    showModal.value = true
}
</script>
<template>
    <div class="absolute top-0 left-0 w-full z-10">
        <div class="container flex items-center justify-between h-16 text-white">
            <div class="font-bold text-2xl">GUD</div>
            <div class="flex items-center gap-4">
                <a href="#our-menu"
                    class="bg-[#c08133] text-white px-4 py-2 rounded-full text-sm cursor-pointer">Menu</a>
            </div>
        </div>
    </div>
    <div class="relative h-screen !p-0">
        <div class="flex relative w-full h-full">
            <img src="https://nicojuhari.b-cdn.net/demos/2/gut-restaurant-hero-bg.jpg" alt="gud-restaurant-hero-bg"
                class="w-full md:w-1/2 h-full ml-auto object-cover" />
            <div class="absolute top-0 left-0 gud-hero-gradient h-full w-full hiddesn md:block"></div>
        </div>
        <div class="absolute top-0 left-0 w-full h-full">
            <div class="container text-white h-full w-full flex">
                <div class="mt-auto mb-10 md:my-auto flex-shrink-0 w-full">
                    <h1 class="md:text-6xl text-3xl"><span class="text-8xl md:text-[10rem] font-bold">GUD</span><br>by
                        Alexandru Comerzan</h1>
                    <div class="my-10 md:text-2xl text-xl text-[#c08133]">Restaurant | Bar | Terrace</div>
                    <div class="flex items-center gap-4 mb-10 w-full text-base md:text-xl">
                        <span>Rezervați o masă:</span>
                        <a class="inline-flex items-center border border-opacity-50 border-white rounded-full gap-4 h-12 pr-6"
                            href="tel:+37369454994">
                            <div
                                class="bg-white bg-opacity-20 h-12 w-12 inline-flex items-center justify-center rounded-full">
                                <Icon name="ph:phone" class="w-6 h-6" />
                            </div>
                            <span>069 454 994</span>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 bg-white">
        <div>
            <img src="https://1foodmenu-demos.b-cdn.net/gud/gud-grid-3.png" alt=" " class="w-full object-cover" />
        </div>
        <div class="flex px-6 min-h-[320px]">
            <div class="m-auto flex items-center justify-center flex-col gap-6 text-xl">
                <div>
                    <Icon name="bx:bxs-star" class="w-12 h-12 text-[#c08133]" />
                    <Icon name="bx:bxs-star" class="w-12 h-12 text-[#c08133]" />
                    <Icon name="bx:bxs-star" class="w-12 h-12 text-[#c08133]" />
                    <Icon name="bx:bxs-star" class="w-12 h-12 text-[#c08133]" />
                    <Icon name="bx:bxs-star" class="w-12 h-12 text-[#c08133]" />

                </div>
                <div class="font-bold text-center">{{ list[currentReview].review }}</div>
                <div class="text-center">{{ list[currentReview].name }}</div>
            </div>
        </div>
        <div>
            <img src="https://1foodmenu-demos.b-cdn.net/gud/gud-grid-2.png" alt=" " class="w-full object-cover" />
        </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 bg-white">
        <div class="flex px-6 min-h-[320px]">
            <div class="m-auto flex items-center justify-center flex-col gap-4 text-2xl">
                <Icon name="ic:sharp-access-time" class="w-14 h-14 text-[#c08133]" />
                <div class="font-bold text-center">Luni - Duminică</div>
                <div class="text-center">11:00 - 23:00</div>
            </div>
        </div>
        <div>
            <img src="https://1foodmenu-demos.b-cdn.net/gud/gud-grid-1.png" alt=" " class="w-full object-cover" />
        </div>
        <div class="flex px-6 min-h-[320px]">
            <div class="m-auto flex items-center justify-center flex-col gap-4 text-2xl">
                <Icon name="material-symbols:location-on-outline-rounded" class="w-14 h-14 text-[#c08133]" />
                <div class="font-bold text-center">Strada Mihail Sadoveanu 19</div>
                <div class="text-center">Chişinău 2075, Moldova</div>
            </div>
        </div>
    </div>
    <section class="!p-0" id="our-menu">
        <div class="container hidden">
            <h2 class="text-center mb-8 title">Meniu</h2>
        </div>
        <DemosCategoryTabs :categories="menuData.categories" :scroll-to-category="true" />
        <div class="container">
            <div class="my-6 overflow-hidden relative" v-for="category in groupedMenu?.categories"
                :data-category-section="category.uid">
                <div :id="category.uid" class="h-0 w-0 opacity-0 -z-10 -translate-y-[90px]"></div>
                <h2 class="text-2xl font-bold">{{ category.name }}</h2>
                <div v-if="category.description" class="my-2">{{ category.description }}</div>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-6 px-2">
                    <div v-for="product in groupedMenu.products[category.uid]" :key="product.uid"
                        @click.prevent="() => openModal(product.uid)"
                        class="flex flex-col items-center gap-8 cursor-pointer rounded-lg hover:-translate-y-2 duration-500 hover:shadow-lg overflow-hidden bg-white shrink-0 border p-6 border-gray-200 hover:border-transparent">
                        <div class="w-44 h-44 image-bg image-bg-2 shrink-0 rounded-full overflow-hidden">
                            <div class="image-bg h-full w-full" :style="`background-image: url(${product.imageUrl})`">
                            </div>
                        </div>
                        <div class="flex flex-col flex-grow w-full">
                            <div class="font-semibold pb-4 text-center w-9/12 m-auto">
                                <span class="line-clamp-2">{{ product.name }}</span>
                            </div>
                            <div class="text-gray-600 line-clamp-2 w-full mt-auto">{{ product.description }}
                            </div>
                            <div class="mt-auto pt-4">
                                <div v-if="product.options?.[0]" class="flex justify-between items-center">
                                    <div class="text-gray-400 text-sm">{{ product.options?.[0]?.size }}</div>
                                    <div class="flex gap-2 items-center">
                                        <div v-if="product.options?.[0].salePrice" class="text-[#c08133]">
                                            $ {{ product.options?.[0].salePrice }}
                                        </div>
                                        <div v-if="product.options?.[0].salePrice"
                                            class="text-red-400 line-through opacity-70 text-sm">
                                            ${{ product.options?.[0].price }}
                                        </div>
                                        <div v-else class="text-[#c08133]">
                                            {{ product.options?.[0].price }} lei
                                        </div>
                                        <span v-if="product.options?.[1]"
                                            class="arrow-down rounded bg-slate-200"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!groupedMenu?.categories?.length"
                class="grid place-content-center bg-gray-100 text-2xl h-72 my-4 rounded">
                Nu sa găsit nici un produs
            </div>
            <!-- <div class="my-6">
                    <h3 class="text-2xl font-bold">Allergens</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 pt-6 gap-3 p-6 bg-white rounded shadow-md my-6">
                        <div v-for="allergen in menuData.allergens" class="flex gap-4">
                            <div class="grid place-content-center w-12 bg-gray-200 rounded text-2xl">{{ allergen.name }}</div>
                            <div class="min-h-[48px] grid place-content-center">{{ allergen.description }}</div>
                        </div>
                    </div>
                </div> -->

        </div>
        <UModal v-model="showModal"
            :ui="{ width: 'sm:max-w-[375px]', overlay: { background: 'bg-gray-600 bg-opacity-70' } }">
            <div class="flex flex-col bg-white flex-shrink-0 rounded-lg overflow-hidden relative">
                <UButton square color="gray" variant="soft" icon="i-ph-x-bold"
                    class="absolute rounded-full bg-opacity-60 right-3 top-3 font-bold text-gray-950"
                    @click="showModal = false" />
                <div class="h-72 w-full image-bg image-bg-2 shrink-0">
                    <div class="image-bg h-full w-full" :style="`background-image: url(${singleProduct.imageUrl})`">
                    </div>
                </div>
                <div class="p-4 flex flex-col flex-grow">
                    <div class="font-semibold pb-2 inline-flex flex-wrap gap-2 items-center">
                        <span>{{ singleProduct.name }}</span>
                        <span v-for="item in singleProduct.allergens"
                            class="cursor-pointer font-medium flex-shrink-0 text-gray-600 text-xs p-1 bg-slate-50 rounded-full border w-4 h-4 grid place-content-center">
                            {{ menuData.allergens.find((al) => al.uid == item).name }}
                        </span>
                    </div>
                    <div class="text-gray-600 w-full">{{ singleProduct.description }}</div>
                    <div class="pt-3">
                        <div v-for="option in singleProduct.options"
                            class="flex justify-between items-center border-t first:border-t-0 border-dashed border-gray-200 py-2">
                            <div class="text-gray-400 text-sm">{{ option?.size }}</div>
                            <div class="flex gap-2 items-center">
                                <div v-if="option.salePrice" class="text-lg text-[#c08133]">
                                    $ {{ option.salePrice }}
                                </div>
                                <div v-if="option.salePrice" class="text-red-600 line-through opacity-70 text-sm">
                                    ${{ option.price }}
                                </div>
                                <div v-else class="text-lg text-[#c08133]">
                                    ${{ option.price }}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UModal>
    </section>
    <footer class="border-t border-r-gray-100">
        <div class="container py-6 flex gap-6 items-center flex-col md:flex-row md:justify-between">
            <div>
                <span class="font-bold">GUD</span> Restaurant
            </div>
            <div>Created with &lt;3 by <NuxtLink to="/" class="font-bold">me</NuxtLink>
            </div>
        </div>
    </footer>
</template>
<style>
    .gud-hero-gradient {
        background: rgb(14,12,6);
        background: linear-gradient(0deg, rgba(14,12,6,1) 0%, rgba(14,12,6,1) 25%, rgba(14,12,6,0) 65%);
    }

    @media (min-width: 768px) {
        .gud-hero-gradient {
            background: rgb(14,12,6);
            background: linear-gradient(90deg, rgba(14,12,6,1) 0%, rgba(14,12,6,1) 50%, rgba(14,12,6,0) 75%);
        }
    }
</style>