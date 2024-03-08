<script setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue'
    import menuData from '@/assets/json/demo-menu.json'

    const selectedCategory = ref('')
    const viewProduct = ref(null)
    const showSearchBar = ref(false)

    const menuNav = ref(null)
    const menuNavYPosition = ref(0)
    
        
    const getMenuPosition = () => {
        // get element positio on page
        menuNavYPosition.value = menuNav.value.getBoundingClientRect().top
    }

    

    onMounted(() => {
        getMenuPosition()
        //add scroll event listener
        window.addEventListener('scroll', getMenuPosition)
        
    })

    onBeforeUnmount(() => {
        //remove scroll event listener
        window.removeEventListener('scroll', getMenuPosition)
    })


    const productsByCategory = ref({
        categories: [],
        products: []
    })
    productsByCategory.value = groupProductsByCategory(menuData)

    const scrollTo = (category_id) => {
        let targetBlock = document.getElementById(category_id);
        targetBlock.scrollIntoView({ behavior: 'smooth' });
        selectedCategory.value = category_id
    }

    const filterProducts = (ev) => {
        let products = searchInProducts(ev.target.value, [...menuData.products])
        productsByCategory.value = groupProductsByCategory({ categories: [...menuData.categories], products})
    }

    const toggleSearchBar = (open = true) => {
        showSearchBar.value = open
        productsByCategory.value = groupProductsByCategory(menuData)
        selectedCategory.value = ''
    }
</script>
<template>
    <div class="sticky top-0 z-50 bg-white"  ref="menuNav" :class="menuNavYPosition <= 0 && 'shadow'">
        <div class="container overflow-y-hidden relative">
            <div class="overflow-x-auto text-sm">
                <div class="inline-flex gap-4 mx-auto md:w-full py-4 md:justify-center">
                    <div @click.prevent="toggleSearchBar"
                                    class="h-10 w-10 flex flex-shrink-0 items-center justify-center bg-[#175676] bg-opacity-10 text-[#175676] rounded-full cursor-pointer">
                                    <svg class="w-6 h-6" viewBox="0 0 20 20">
                                        <path fill="currentColor" fill-rule="evenodd"
                                            d="M8 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8ZM2 8a6 6 0 1 1 10.89 3.476l4.817 4.817a1 1 0 0 1-1.414 1.414l-4.816-4.816A6 6 0 0 1 2 8Z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </div>
                    <div v-for="category in productsByCategory?.categories"
                        :key="category.uid" @click="scrollTo(category.uid)"
                        :class="{ '!bg-[#175676] bg-opacity-70 !text-white': selectedCategory == category.uid }"
                        class="bg-opacity-5 bg-[#175676] text-[#175676] py-2 px-4 h-10 inline-flex items-center rounded-full cursor-pointer flex-shrink-0 duration-500"> {{
                            category.name }}</div>
                </div>
            </div>
            <Transition name="fade">
                        <div class="flex items-center md:justify-center gap-4 absolute left-0 w-full py-4 top-0 bg-white" v-if="showSearchBar">
                            <div @click.prevent="toggleSearchBar(false)"
                                class="h-10 w-10 flex flex-shrink-0 items-center justify-center bg-[#175676] bg-opacity-10 text-[#175676] rounded-full cursor-pointer">
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
        <div class="my-6 overflow-hidden relative" v-for="category in productsByCategory?.categories">
            <div :id="category.uid" class="h-0 w-0 opacity-0 -z-10 -translate-y-[90px]"></div>
            <h2 class="text-2xl font-bold">{{ category.name }}</h2>
            <div v-if="category.description" class="mt-2 text-gray-600">{{ category.description }}</div>
            <div class="flex gap-4 overflow-x-auto snap-x snap-mandatory py-6 px-1">
                <div v-for="product in productsByCategory.products[category.uid]" :key="product.uid" @click.prevent="viewProduct = product" class="snap-center flex flex-col cursor-pointer rounded-xl bg-white flex-shrink-0 shadow w-72"> 
                    <div class="h-52 w-full image-bg image-bg-2 shrink-0 rounded-t-xl">
                        <div class="image-bg h-full w-full rounded-t-xl" :style="`background-image: url(${product.imageUrl})`"></div>
                    </div>
                    <div class="p-4 flex flex-col flex-grow">
                        <div class="font-bold pb-2 inline-flex flex-wrap gap-2 items-center">
                            <span class="flex-shrink-0">{{ product.name }}</span>
                            <span  v-for="item in product.allergens" class="cursor-pointer font-medium flex-shrink-0 text-gray-600 text-xs p-1 bg-slate-50 rounded-full border w-4 h-4 grid place-content-center">
                                {{ menuData.allergens.find((al) => al.uid == item).name }}
                            </span>
                        </div>
                        <div class="opacity-60 leading-tight line-clamp-2 w-full mt-auto">{{ product.description }}</div>
                        <div class="pt-4">
                            <div v-if="product.options?.[0]" class="flex justify-between items-center border-t first:border-t-0 border-dashed border-gray-200 py-0">
                                <div class="text-gray-600 text-sm">{{ product.options?.[0]?.size }}</div>
                                <div class="flex gap-2 items-center">
                                    <div v-if="product.options?.[0].salePrice" class="text-gray-700 font-medium text-lg">
                                        $ {{ product.options?.[0].salePrice }}
                                    </div>
                                    <div v-if="product.options?.[0].salePrice" class="text-red-400 line-through opacity-70 text-sm">
                                            ${{ product.options?.[0].price }}
                                    </div>
                                    <div v-else class="text-gray-700 font-medium text-lg">
                                        ${{ product.options?.[0].price }}
                                    </div>
                                    <span v-if="product.options?.[1]" class="arrow-down rounded bg-slate-200"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!productsByCategory?.categories?.length" class="grid place-content-center bg-gray-500 text-2xl h-72 my-4 rounded">
            No products found
        </div>
        <div class="my-6">
            <h3 class="text-2xl font-bold">Allergens</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div v-for="allergen in menuData.allergens" class="flex gap-6 items-center">
                    <div class="grid place-content-center w-12 h-12 shrink-0 bg-[#175676] bg-opacity-10 text-[#175676] rounded-lg text-2xl">{{ allergen.name }}</div>
                    <div class="min-h-[48px] grid place-content-center">{{ allergen.description }}</div>
                </div>
            </div>
        </div>
    </div>
        <!-- <Modal v-if="viewProduct" @close="viewProduct = null">
        <div class="flex flex-col cursor-pointer flex-shrink-0"> 
            <div class="h-72 w-full image-bg image-bg-2 shrink-0 rounded-t-xl">
                <div class="image-bg h-full w-full rounded-t-xl" :style="`background-image: url(${viewProduct.imageUrl})`"></div>
            </div>
            <div class="p-4 flex flex-col flex-grow">
                <div class="font-bold pb-2 inline-flex flex-wrap gap-2 items-center">
                    <span class="flex-shrink-0">{{ viewProduct.name }}</span>
                    <span  v-for="item in viewProduct.allergens" class="cursor-pointer font-medium flex-shrink-0 text-gray-500 text-xs p-1 bg-slate-50 rounded-full border w-4 h-4 grid place-content-center">
                        {{ menuData.allergens.find((al) => al.uid == item).name }}
                    </span>
                </div>
                <div class="opacity-60 leading-tight w-full mt-auto">{{ viewProduct.description }}</div>
                <div class="pt-2">
                    <div v-for="option in viewProduct.options" class="flex justify-between items-center border-t first:border-t-0 border-dashed border-gray-300 py-2">
                        <div class="text-gray-500 text-sm">{{ option?.size }}</div>
                        <div class="flex gap-2 items-center">
                            <div v-if="option.salePrice" class="text-gray-700 font-medium text-lg">
                                $ {{ option.salePrice }}
                            </div>
                            <div v-if="option.salePrice" class="text-red-400 line-through opacity-70 text-sm">
                                    ${{ option.price }}
                            </div>
                            <div v-else class="text-gray-700 font-medium text-lg">
                                ${{ option.price }}
                            </div>
                
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Modal> -->
</template>
<style>

.fade-enter-active,
.fade-leave-active {
    transition: transform 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
    transform: translateY(-100%);
}
</style>