<script setup>
    import { groupProductsByCategory } from '@/utils';

    const menuURL = 'https://api.1food.menu/v1/menus/l9zwcpvlanynrmthvmb'

    const { data: menuData } = await useFetch(menuURL)

    const productsByCategory = computed(() => {
        return groupProductsByCategory(menuData?.value)
    })

</script>
<template>
    <div v-if="productsByCategory?.categories" class="container">
            <div class="mt-10 md:mt-20" v-for="category in productsByCategory?.categories">
                <div class="font-bold my-4 text-3xl md:text-4xl">{{ category.name }}</div>
                <div class="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    <div class="overflow-hidden flex flex-col" v-for="product in productsByCategory.products[category.uid]">
                        <div class="px-6">
                            <img class="rounded-full shadow" :src="product.imageUrl" />
                        </div>
                        <div class="p-4 flex-1 rounded-b-md flex flex-col">
                            <div class="font-bold text-lg mb-2">{{ product.name }}</div>
                            <div class="text-gray-500 text-sm line-clamp-3"> {{ product.description }} </div>
                            <div class="mt-auto">
                                <div v-for="option in product.options"
                                    class="flex gap-4 justify-between py-2 text-sm items-center first:border-t-0 border-t border-gray-400 border-dashed">
                                    <div class="text-gray-600">{{ option.size }}</div>
                                    <div class="flex gap-2 ml-auto font-medium">
                                        <div v-if="option.price" class="text-[#e07c0c]"
                                            :class="{ 'text-red-600 line-through text-opacity-70': option.salePrice }">{{
                                                option.price }}$</div>
                                        <div v-if="option.salePrice" class="text-[#e07c0c]">${{ option.salePrice }}$</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>