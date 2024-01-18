<script setup>
import { storeToRefs } from "pinia"
import { useMenuStore } from '~/store/menu';
import { viewObjectId } from '~/composables/useAppStatus';
import { useSortable } from '@vueuse/integrations/useSortable'

//state
const { menu, menuCategories } = storeToRefs(useMenuStore())

//filter
const query = ref('')
const filteredProducts = computed(() => searchInTable(query.value, menu.value.products))

//modal
const isModalOpen = ref(false)
const viewCategory = (id) => {
    viewObjectId.value = id
    isModalOpen.value = true
}

//sortable
const tableBody = ref(null)
const sortableOptions = ref(null)
const options = {
    handle: '[data-sort-handle]',
    animation: 300,
    disabled: false,
    ghostClass: 'active-sortable-tr',
}
sortableOptions.value = useSortable(tableBody, menu.value.products, options)

watchEffect(() => {
    sortableOptions.value.option('disabled', query.value === '' ? false : true)
})


//delete category
const isModalDeleteOpen = ref(false)
const productIdToDelete = ref(null)
const preDeleteCategory = (id) => {
    productIdToDelete.value = id
    isModalDeleteOpen.value = true
}

const deleteProduct = () => {
    let filtered = menu.value.products.filter(cat => cat.uid !== productIdToDelete.value);

    setTimeout(() => {
        menu.value.products = filtered
        isModalDeleteOpen.value = false
    }, 200)
}

const items = [
    [{
        slot: 'view',
    }],
    [{
        slot: 'delete',
    }]
]

</script>
<template>
    <UCard>
        <div class="flex sm:items-center justify-between gap-4 mb-4 flex-col md:flex-row">
            <h3 class="text-xl">Products</h3>
            <div class="flex gap-4 w-full sm:w-auto">
                <UInput v-model="query" placeholder="Filter products ..." class="w-1/2 sm:w-auto" />
                <UButton color="brand-blue" @click="isModalOpen = true" icon="i-ph-plus" label="New Product"
                    class="w-1/2 sm:w-auto justify-center" />
            </div>
        </div>

        <div v-if="filteredProducts.length">
            <div class="overflow-auto w-full max-h-[600px] rounded-md border">
                <table class="table-fixed divside-y divide-gray-300 w-full min-w-[800px]">
                    <thead class="sticky top-0 bg-slate-50  z-10 border-b">
                        <tr>
                            <th class="p-4 font-medium text-left w-14">Nr</th>
                            <th class="p-4 font-medium text-left w-36">Image</th>
                            <th class="p-4 font-medium text-left">Name</th>
                            <th class="p-4 font-medium text-left">Category</th>
                            <th class="p-4 font-medium text-left w-28">Price</th>
                            <th class="p-4 font-medium text-left w-20"></th>
                        </tr>
                    </thead>
                    <tbody data-sortable class="divide-y divide-gray-100" ref="tableBody">
                        <tr v-for="(item, idx ) in filteredProducts" :key="item.uid"
                            class="bg-white">
                            <td class="px-2 py-2">
                                <div class="flex items-center gap-1 cursor-pointer" data-sort-handle>
                                    <UIcon name="i-ph-dots-six-vertical-light" class="shrink-0 w-4 h-4" :class="query && 'opacity-15'" />
                                    <span>{{ idx + 1 }}</span>
                                </div>
                            </td>
                            <td class="px-4 py-2">
                                <div class="cursor-pointer" @click="() => viewCategory(item.uid)">
                                    <img v-if="item.imageUrl" class="m-auto w-24 h-24 object-cover rounded border" :src="item.imageUrl" alt="">
                                    <div v-else class="m-auto w-24 h-24 grid place-content-center bg-gray-50 border rounded">No image</div>
                                </div>
                            </td>
                            <td class="px-4 py-2 truncate">{{ item.name }}</td>
                            <td class="px-4 py-2 truncate">{{ getCategoryName(item.categoryId , menuCategories ) }}</td>
                            <td class="px-4 py-2">
                                <span>{{ item.options[0]?.salePrice && item.options[0]?.salePrice || item.options[0]?.price }}</span>
                            </td>
                            
                            <td class="px-4 py-2 text-right">
                                <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
                                    <UButton square icon="i-ph-dots-three-vertical" color="brand-gray" variant="soft"></UButton>
                                    <template #view>
                                        <div class="flex justify-between items-center w-full"
                                            @click="() => viewCategory(item.uid)">
                                            <span class="">View & Edit</span>
                                            <UIcon name="i-ph-eye"
                                                class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
                                        </div>
                                    </template>
                                    <template #delete>
                                        <div class="flex justify-between items-center w-full text-brand-red-400 dark:text-brand-400"
                                            @click="() => preDeleteCategory(item.uid)">
                                            <span class="">Delete</span>
                                            <UIcon name="i-ph-trash-light" class="flex-shrink-0 h-4 w-4 ms-auto" />
                                        </div>
                                    </template>
                                </UDropdown>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="py-3.5 font-bold">Total: {{ filteredProducts?.length }}</div>
        </div>
        <UiEmptyBlock v-else>
            No Products
        </UiEmptyBlock>
        <UModal v-model="isModalOpen" >
            <MenuProductForm @close="isModalOpen = false" />
        </UModal>
        <UModal v-model="isModalDeleteOpen">
            <div class="p-8 flex flex-col gap-6">
                <div class="text-center">Would you like to delete this product?</div>
                <div class="flex gap-4 items-center justify-center">
                    <UButton color="brand-blue" class="px-10" @click.prevent="() => isModalDeleteOpen = false">No</UButton>
                    <UButton color="brand-red" class="px-10" @click.prevent="deleteProduct">Yes</UButton>
                </div>
            </div>
        </UModal>
    </UCard>
</template>