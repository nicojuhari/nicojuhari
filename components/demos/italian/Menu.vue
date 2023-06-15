<script setup>
    import { ref, watchEffect, watch } from 'vue'
    import { groupProductsByCategory, searchInProducts } from '@/utils';
    import Modal from '@/components/demos/italian/Modal.vue'

    const selectedCategory = ref('')
    const filteredCategories = ref([])
    const viewProduct = ref(null)
    const showSearchBar = ref(false)

    const menuURL = 'https://api.1food.menu/v1/menus/l9zwcpvlanynrmthvmb'

    const { data: menuData } = await useFetch(menuURL)


    const productsByCategory = ref({
        categories: [],
        products: []
    })

    watch(menuData, () => {
        productsByCategory.value = groupProductsByCategory(menuData?.value)
        filteredCategories.value = [...productsByCategory.value.categories]
    }, { immediate: true })

    const filterCategories = (category_id) => {

        if (!category_id) {
            selectedCategory.value = ''
            filteredCategories.value = [...productsByCategory.value.categories]
            return
        }
        selectedCategory.value = category_id
        filteredCategories.value = [...productsByCategory.value.categories].filter(category => category.uid == category_id)
    }

    const filterProducts = (ev) => {
        let products = searchInProducts(ev.target.value, [...menuData.value.products])
        productsByCategory.value = groupProductsByCategory({ categories: [...menuData.value.categories], products})
        filteredCategories.value = [...productsByCategory.value.categories]
    }

    const closeSearchBar = (vl = true) => {
        showSearchBar.value = vl
        productsByCategory.value = groupProductsByCategory(menuData?.value)
        filteredCategories.value = [...productsByCategory.value.categories]
        selectedCategory.value = ''
    }

</script>
<template>
    <section class="pt-0" id="our-menu">
        <div class="sticky top-0 z-50 bg-white shadow">
            <div class="container">
                <div class="overflow-x-auto text-sm overflow-y-hidden relative">
                    <div class="inline-flex gap-4 mx-auto py-4">
                        <div @click.prevent="showSearchBar = !showSearchBar"
                                        class="h-10 w-10 flex flex-shrink-0 items-center justify-center bg-gray-600 bg-opacity-10 text-black rounded-full cursor-pointer">
                                        <svg class="w-6 h-6" viewBox="0 0 20 20">
                                            <path fill="currentColor" fill-rule="evenodd"
                                                d="M8 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8ZM2 8a6 6 0 1 1 10.89 3.476l4.817 4.817a1 1 0 0 1-1.414 1.414l-4.816-4.816A6 6 0 0 1 2 8Z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </div>
                        <div v-for="category in [{ uid: '', name: 'View All' }, ...productsByCategory?.categories]"
                            :key="category.uid" @click="filterCategories(category.uid)"
                            :class="{ '!bg-[#0C7C59] bg-opacity-70 text-white': selectedCategory == category.uid }"
                            class="bg-white shadow py-2 px-4 h-10 inline-flex items-center rounded-full cursor-pointer flex-shrink-0 duration-500"> {{
                                category.name }}</div>
                    </div>
                    <Transition name="fade">
                        <div class="flex items-center gap-4 absolute w-full py-4 top-0 bg-white" v-if="showSearchBar">
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
        </div>
        <div class="container"> 
            <div class="my-6 overflow-hidden relative" v-for="category in filteredCategories || productsByCategory?.categories">
                <h2 class="text-2xl font-bold">{{ category.name }}</h2>
                <div v-if="category.description" class="my-2">{{ category.description }}</div>
                <div class="flex gap-4 overflow-x-auto snap-x snap-mandatory py-6 px-1">
                    <div v-for="product in productsByCategory.products[category.uid]" :key="product.uid" @click.prevent="viewProduct = product" class="snap-center flex flex-col cursor-pointer rounded-xl bg-white flex-shrink-0 shadow w-72"> 
                        <div class="h-52 w-full image-bg image-bg-2 shrink-0 rounded-t-xl">
                            <div class="image-bg h-full w-full rounded-t-xl" :style="`background-image: url(${product.imageUrl})`"></div>
                        </div>
                        <div class="p-4 flex flex-col flex-grow">
                            <div class="font-bold pb-2 inline-flex flex-wrap gap-2 items-center">
                                <span class="flex-shrink-0">{{ product.name }}</span>
                                <span  v-for="item in product.allergens" class="cursor-pointer font-medium flex-shrink-0 text-gray-500 text-xs p-1 bg-slate-50 rounded-full border w-4 h-4 grid place-content-center">
                                    {{ menuData.allergens.find((al) => al.uid == item).name }}
                                </span>
                            </div>
                            <div class="opacity-60 leading-tight line-clamp-2 w-full mt-auto">{{ product.description }}</div>
                            <div class="pt-4">
                                <div v-if="product.options?.[0]" class="flex justify-between items-center border-t first:border-t-0 border-dashed border-gray-300 py-0">
                                    <div class="text-gray-500 text-sm">{{ product.options?.[0]?.size }}</div>
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
            <div class="my-6">
                <h3 class="text-2xl font-bold">Allergens</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 pt-6 gap-3 p-6 bg-white rounded shadow-md my-6">
                    <div v-for="allergen in menuData.allergens" class="flex gap-4">
                        <div class="grid place-content-center w-12 bg-gray-200 rounded text-2xl">{{ allergen.name }}</div>
                        <div class="min-h-[48px] grid place-content-center">{{ allergen.description }}</div>
                    </div>
                </div>
            </div>
        </div>
         <Modal v-if="viewProduct" @close="viewProduct = null">
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
                    <div class="pt-0">
                        <div v-for="option in viewProduct.options" class="flex justify-between items-center border-t first:border-t-0 border-dashed border-gray-300 pt-4">
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
                                <!-- <span v-if="viewProduct.options?.[1]" class="arrow-down rounded bg-slate-200"></span> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    </section>
   
</template>
<style>
.image-bg, .image-bg-2 {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.image-bg-2 {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzODguNiAxOTguNSIgZmlsbD0iI2FhYSI+CiAgICA8cGF0aCBkPSJNMjAxLjEsMjg5LjdhNDIuNCw0Mi40LDAsMCwxLTE3LjQtMy42LDQzLjksNDMuOSwwLDAsMS0xNC4xLTkuOSw0OC45LDQ4LjksMCwwLDEtOS42LTE0LjksNDkuMSw0OS4xLDAsMCwxLDAtMzYuNCw0OC45LDQ4LjksMCwwLDEsOS42LTE0LjksNDMuOSw0My45LDAsMCwxLDE0LjEtOS45LDQzLjQsNDMuNCwwLDAsMSwzNC42LDAsNDMuMiw0My4yLDAsMCwxLDE0LjIsOS45LDQ1LjUsNDUuNSwwLDAsMSw5LjYsMTQuOSw0OS4xLDQ5LjEsMCwwLDEsMCwzNi40LDQ1LjUsNDUuNSwwLDAsMS05LjYsMTQuOSw0My4yLDQzLjIsMCwwLDEtMTQuMiw5LjlBNDIuMSw0Mi4xLDAsMCwxLDIwMS4xLDI4OS43Wm0tLjEtNzcuM2EyMywyMywwLDAsMC0xMC4zLDIuNSwyOS42LDI5LjYsMCwwLDAtOC41LDYuNSwzMS4xLDMxLjEsMCwwLDAtNS43LDkuNywzNi40LDM2LjQsMCwwLDAsMCwyMy44LDMxLjYsMzEuNiwwLDAsMCw1LjcsOS44LDI4LjMsMjguMywwLDAsMCw4LjUsNi42LDIyLjksMjIuOSwwLDAsMCwxMC4zLDIuNCwyMi41LDIyLjUsMCwwLDAsMTAuMi0yLjQsMjYuNywyNi43LDAsMCwwLDguNC02LjYsMzEuNCwzMS40LDAsMCwwLDUuNi05LjgsMzQuOCwzNC44LDAsMCwwLDAtMjMuOCwzMC45LDMwLjksMCwwLDAtNS42LTkuNywyNy45LDI3LjksMCwwLDAtOC40LTYuNUEyMi42LDIyLjYsMCwwLDAsMjAxLDIxMi40WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTU0LjcgLTE1MS45KSIvPgogICAgPHBhdGggZD0iTTI5OS4xLDI4OS43YTQxLjksNDEuOSwwLDAsMS0xNy4zLTMuNiw0My45LDQzLjksMCwwLDEtMTQuMS05LjksNDUuNSw0NS41LDAsMCwxLTkuNi0xNC45LDQ5LjEsNDkuMSwwLDAsMSwwLTM2LjQsNDUuNSw0NS41LDAsMCwxLDkuNi0xNC45LDQzLjksNDMuOSwwLDAsMSwxNC4xLTkuOSw0My40LDQzLjQsMCwwLDEsMzQuNiwwLDQzLjIsNDMuMiwwLDAsMSwxNC4yLDkuOSw0OC45LDQ4LjksMCwwLDEsOS42LDE0LjksNDkuMSw0OS4xLDAsMCwxLDAsMzYuNCw0OC45LDQ4LjksMCwwLDEtOS42LDE0LjksNDMuMiw0My4yLDAsMCwxLTE0LjIsOS45QTQyLjIsNDIuMiwwLDAsMSwyOTkuMSwyODkuN1ptLS4xLTc3LjNhMjIuNiwyMi42LDAsMCwwLTEwLjIsMi41LDI4LjMsMjguMywwLDAsMC04LjUsNi41LDMxLjEsMzEuMSwwLDAsMC01LjcsOS43LDM2LjQsMzYuNCwwLDAsMCwwLDIzLjgsMzEuNiwzMS42LDAsMCwwLDUuNyw5LjgsMjcuMSwyNy4xLDAsMCwwLDguNSw2LjYsMjIuNSwyMi41LDAsMCwwLDEwLjIsMi40LDIyLjksMjIuOSwwLDAsMCwxMC4zLTIuNCwyNi43LDI2LjcsMCwwLDAsOC40LTYuNiwzMy41LDMzLjUsMCwwLDAsNS42LTkuOCwzNi40LDM2LjQsMCwwLDAsMC0yMy44LDMyLjksMzIuOSwwLDAsMC01LjYtOS43LDI3LjksMjcuOSwwLDAsMC04LjQtNi41QTIzLDIzLDAsMCwwLDI5OSwyMTIuNFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC01NC43IC0xNTEuOSkiLz4KICAgIDxwYXRoIGQ9Ik00NDMuMywxNTEuOVYyODcuNUg0MjlsLTMuNy05LjNhNDEuNyw0MS43LDAsMCwxLTEyLjMsOC41LDM5LjEsMzkuMSwwLDAsMS0xNS44LDMsNDAuMyw0MC4zLDAsMCwxLTE3LjEtMy42LDQxLjQsNDEuNCwwLDAsMS0xMy41LTkuOSw0NCw0NCwwLDAsMS05LTE0LjksNTEuOCw1MS44LDAsMCwxLDAtMzYuNCw0NCw0NCwwLDAsMSw5LTE0LjksNDEuNCw0MS40LDAsMCwxLDEzLjUtOS45LDQzLjcsNDMuNywwLDAsMSwzMy4zLS42LDM2LjYsMzYuNiwwLDAsMSwxMS45LDguN1YxNTEuOVpNMzk4LjYsMjczLjdhMjguNiwyOC42LDAsMCwwLDEwLjMtMS44LDIxLjcsMjEuNywwLDAsMCw4LjQtNS43LDI0LjQsMjQuNCwwLDAsMCw1LjctOS41LDQwLjEsNDAuMSwwLDAsMCwyLjEtMTMuNkE0MS4xLDQxLjEsMCwwLDAsNDIzLDIyOWEyMi42LDIyLjYsMCwwLDAtNS43LTkuNCwyMS42LDIxLjYsMCwwLDAtOC40LTUuMiwzMC45LDMwLjksMCwwLDAtMTAuMy0xLjYsMjQuNiwyNC42LDAsMCwwLTEwLjMsMi4zLDI1LDI1LDAsMCwwLTguMyw2LjUsMjguNiwyOC42LDAsMCwwLTUuNiw5LjYsMzQuOCwzNC44LDAsMCwwLDAsMjMuOCwyOSwyOSwwLDAsMCw1LjYsOS43LDI1LjMsMjUuMywwLDAsMCw4LjMsNi42QTIzLjIsMjMuMiwwLDAsMCwzOTguNiwyNzMuN1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC01NC43IC0xNTEuOSkiLz4KICAgIDxyZWN0IHg9IjU2IiB5PSIzLjIiIHdpZHRoPSI1My41IiBoZWlnaHQ9IjE3LjQxIi8+PHJlY3QgeD0iNTYiIHk9IjU3LjUiIHdpZHRoPSI0MCIgaGVpZ2h0PSIxNy40MSIvPgogICAgPHBvbHlnb24gcG9pbnRzPSI0MC42IDMuMiA0MC42IDEzNS41IDIxLjIgMTM1LjUgMjEuMiAyMC42IDAgMjAuNiAwIDMuMiA0MC42IDMuMiIvPgogICAgPGNpcmNsZSBjeD0iMTQ1LjMiIGN5PSIxODguMSIgcj0iOSIvPgogICAgPHBhdGggZD0iTTIzMiwzNDkuMmgtOS43VjMwMS43SDIzMGwyLDQuMWEyMS40LDIxLjQsMCwwLDEsNC4yLTMuNywxMS43LDExLjcsMCwwLDEsNi4xLTEuNWwzLjEuM2EyNS4zLDI1LjMsMCwwLDEsMy42LDEuMiwxOS4yLDE5LjIsMCwwLDEsMy41LDIuMywxMy42LDEzLjYsMCwwLDEsMi45LDMuNywxNS4xLDE1LjEsMCwwLDEsNS4xLTUuMywxMywxMywwLDAsMSw3LjMtMi4yLDIxLjQsMjEuNCwwLDAsMSw1LjQuOCwxMy4zLDEzLjMsMCwwLDEsNS40LDMsMTYuMywxNi4zLDAsMCwxLDQuMSw2LDI4LjEsMjguMSwwLDAsMSwxLjUsMTB2MjguOGgtOVYzMjAuM2MwLTQuMS0uOC02LjktMi41LTguNWE5LDksMCwwLDAtNi43LTIuNSw3LjMsNy4zLDAsMCwwLTUuNiwyLjdjLTEuNiwxLjgtMi4zLDQuNi0yLjMsOC40djI4LjhIMjQ5VjMyMC4zYzAtNC4xLS44LTYuOS0yLjUtOC41YTksOSwwLDAsMC02LjctMi41LDcuMSw3LjEsMCwwLDAtNS4yLDIuM2MtMS41LDEuNS0yLjQsMy45LTIuNiw3LjFaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNTQuNyAtMTUxLjkpIi8+CiAgICA8cGF0aCBkPSJNMzE4LjEsMzUwLjRhMjUuOCwyNS44LDAsMCwxLTkuNy0xLjksMjUuMiwyNS4yLDAsMCwxLTcuOS01LjQsMjQuNiwyNC42LDAsMCwxLTcuMi0xNy42LDI2LjEsMjYuMSwwLDAsMSwxLjgtOS43LDI1LjIsMjUuMiwwLDAsMSw1LTgsMjIuOSwyMi45LDAsMCwxLDcuMy01LjMsMjAuMywyMC4zLDAsMCwxLDguOS0xLjksMjQuNCwyNC40LDAsMCwxLDksMS43LDE4LjksMTguOSwwLDAsMSw3LjEsNS4yLDI1LjIsMjUuMiwwLDAsMSw0LjcsOS4xLDQ2LjUsNDYuNSwwLDAsMSwxLjcsMTMuMkgzMDMuNWExNC45LDE0LjksMCwwLDAsMi4yLDQuOCwxNS44LDE1LjgsMCwwLDAsMy41LDMuOCwxNS42LDE1LjYsMCwwLDAsNC41LDIuNiwxNi4xLDE2LjEsMCwwLDAsNS40LjksMTcuNCwxNy40LDAsMCwwLDYuOS0xLjQsMjAuMiwyMC4yLDAsMCwwLDUuNi0zLjdsNS45LDUuOWEyNC4yLDI0LjIsMCwwLDEtOC41LDUuNkEyNy45LDI3LjksMCwwLDEsMzE4LjEsMzUwLjRabS0xLjgtNDEuMWExMC40LDEwLjQsMCwwLDAtNC4zLjksMTEuOSwxMS45LDAsMCwwLTMuOCwyLjUsMTQsMTQsMCwwLDAtMywzLjgsMTcuNiwxNy42LDAsMCwwLTEuOCw0LjdoMjUuMWExNi41LDE2LjUsMCwwLDAtMS4xLTQuNSwxMS40LDExLjQsMCwwLDAtMi41LTMuOSwxMy40LDEzLjQsMCwwLDAtMy43LTIuNUExMSwxMSwwLDAsMCwzMTYuMywzMDkuM1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC01NC43IC0xNTEuOSkiLz4KICAgIDxwYXRoIGQ9Ik0zNTcuNSwzNDkuMmgtOS42VjMwMS43aDcuN2wxLjksNC4xYTE5LjksMTkuOSwwLDAsMSw1LjgtMy43LDE3LjcsMTcuNywwLDAsMSw3LjMtMS41LDI3LjUsMjcuNSwwLDAsMSw1LjkuOCwxNi4yLDE2LjIsMCwwLDEsMTAuOCw5LDIyLjIsMjIuMiwwLDAsMSwyLDEwdjI4LjhoLTkuMVYzMjAuM2ExMy40LDEzLjQsMCwwLDAtMS01LjIsOC42LDguNiwwLDAsMC0yLjUtMy40LDgsOCwwLDAsMC0zLjQtMS44LDE0LDE0LDAsMCwwLTQuMS0uNiwxMy40LDEzLjQsMCwwLDAtMy42LjYsMTIuNywxMi43LDAsMCwwLTMuOCwyLDEwLjYsMTAuNiwwLDAsMC0zLDMuMyw5LjgsOS44LDAsMCwwLTEuMyw1WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTU0LjcgLTE1MS45KSIvPgogICAgPHBhdGggZD0iTTQzMy4yLDM0NC45YTE5LjQsMTkuNCwwLDAsMS01LjgsMy44LDE3LjgsMTcuOCwwLDAsMS03LjQsMS41LDI2LjcsMjYuNywwLDAsMS01LjgtLjgsMTQuOSwxNC45LDAsMCwxLTYuMS0yLjksMTYuMywxNi4zLDAsMCwxLTQuOC02Yy0xLjMtMi41LTEuOS01LjktMS45LTEwVjMwMS43aDkuMXYyOC44YTE0LDE0LDAsMCwwLC45LDUuMywxMS4xLDExLjEsMCwwLDAsMi41LDMuNCwxMS45LDExLjksMCwwLDAsMy41LDEuOSwxNC41LDE0LjUsMCwwLDAsNC4xLjYsMTIuMywxMi4zLDAsMCwwLDMuNi0uNiwxMiwxMiwwLDAsMCwzLjktMiwxNC4zLDE0LjMsMCwwLDAsMy0zLjQsMTAuMSwxMC4xLDAsMCwwLDEuMi01LjFWMzAxLjdoOS42djQ3LjVoLTcuNloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC01NC43IC0xNTEuOSkiLz4KPC9zdmc+);
    background-color: #d4d4d437;
    background-size: 70%;
}

.arrow-down {
    width: 20px;
    height: 20px;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjMzMzIj48cGF0aCBkPSJNOS4yOSA2LjcxYS45OTYuOTk2IDAgMCAwIDAgMS40MUwxMy4xNyAxMmwtMy44OCAzLjg4YS45OTYuOTk2IDAgMSAwIDEuNDEgMS40MWw0LjU5LTQuNTlhLjk5Ni45OTYgMCAwIDAgMC0xLjQxTDEwLjcgNi43Yy0uMzgtLjM4LTEuMDItLjM4LTEuNDEuMDF6Ii8+PC9zdmc+Cg==);
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    opacity: .5;
    transform: rotate(90deg);
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