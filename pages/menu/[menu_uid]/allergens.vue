<script setup>
import { storeToRefs } from "pinia"
import { useMenuStore } from '~/store/menu';
import { viewObjectId } from '~/composables/useAppStatus';
import { useSortable } from '@vueuse/integrations/useSortable'

//state
const { menu } = storeToRefs(useMenuStore())

//filter
const query = ref('')
const filteredAllergens = computed(() => searchInTable(query.value, menu.value.allergens))

//modal
const isModalOpen = ref(false)
const viewAllergen = (id) => {
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
sortableOptions.value = useSortable(tableBody, menu.value.allergens, options)

watchEffect(() => {
    sortableOptions.value.option('disabled', query.value === '' ? false : true)
})


//delete allergen
const isModalDeleteOpen = ref(false)
const allergenIdToDelete = ref(null)
const preDeleteAllergen = (id) => {
    allergenIdToDelete.value = id
    isModalDeleteOpen.value = true
}

const deleteAllergen = () => {
    let filtered = menu.value.allergens.filter(cat => cat.uid !== allergenIdToDelete.value);

    setTimeout(() => {
        menu.value.allergens = filtered
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
            <h3 class="text-xl">Allergens</h3>
            <div class="flex gap-4 w-full sm:w-auto">
                <UInput v-model="query" placeholder="Filter allergens ..." class="w-1/2 sm:w-auto" />
                <UButton color="brand-blue" @click="isModalOpen = true" icon="i-ph-plus" label="New Allergen"
                    class="w-1/2 sm:w-auto justify-center" />
            </div>
        </div>

        <div v-if="filteredAllergens.length">
            <div class="overflow-auto w-full max-h-[600px] rounded-md border">
                <table class="table-fixed divside-y divide-gray-300 w-full">
                    <thead>
                        <tr class="border-b">
                            <th class="p-4 font-medium text-left w-14">Nr</th>
                            <th class="p-4 font-medium text-left">Name</th>
                            <th class="p-4 font-medium text-left">Description</th>
                            <th class="p-4 font-medium text-left"></th>
                        </tr>
                    </thead>
                    <tbody data-sortable class="divide-y divide-gray-100" ref="tableBody">
                        <tr v-for="(item, idx ) in filteredAllergens" :key="item.uid"
                            class="hover:cursor-pointer bg-white">
                            <td class="px-2 py-2 flex items-center gap-1">
                                <UIcon data-sort-handle name="i-ph-dots-six-vertical-light" class="shrink-0 w-4 h-4"
                                    :class="query && 'opacity-15 '" />
                                <span>{{ idx + 1 }}</span>
                            </td>
                            <td class="px-4 py-2 truncate">{{ item.name }}</td>
                            <td class="px-4 py-2 truncate">{{ item.description }}</td>
                            <td class="px-4 py-2 flex items-center justify-end gap-3">
                                <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
                                    <UButton square icon="i-ph-dots-three-vertical" color="gray" variant="soft"></UButton>
                                    <template #view>
                                        <div class="flex justify-between items-center w-full"
                                            @click="() => viewAllergen(item.uid)">
                                            <span class="">View & Edit</span>
                                            <UIcon name="i-ph-eye"
                                                class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
                                        </div>
                                    </template>
                                    <template #delete>
                                        <div class="flex justify-between items-center w-full text-brand-red-400 dark:text-brand-400"
                                            @click="() => preDeleteAllergen(item.uid)">
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
            <div class="py-3.5 font-bold">Total: {{ filteredAllergens?.length }}</div>
        </div>
        <UiEmptyBlock v-else>
            No Allergens
        </UiEmptyBlock>
        <UModal v-model="isModalOpen">
            <MenuAllergenForm @close="isModalOpen = false" />
        </UModal>
        <UModal v-model="isModalDeleteOpen">
            <div class="p-8 flex flex-col gap-6">
                <div class="text-center">Would you like to delete this allergen?</div>
                <div class="flex gap-4 items-center justify-center">
                    <UButton color="brand-blue" class="px-10" @click.prevent="() => isModalDeleteOpen = false">No</UButton>
                    <UButton color="brand-red" class="px-10" @click.prevent="deleteAllergen">Yes</UButton>
            </div>
        </div>
    </UModal>
</UCard></template>