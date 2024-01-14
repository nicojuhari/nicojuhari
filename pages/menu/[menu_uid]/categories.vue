<script setup>
    import { storeToRefs } from "pinia"
    import { useMenuStore } from '~/store/menu';
    import { viewCategoryId } from '~/composables/useAppStatus';
    import { useSortable } from '@vueuse/integrations/useSortable'

    //state
    const { menu } = storeToRefs(useMenuStore())
    
    //filter
    const query = ref('')
    const filteredCategories = computed(() => searchInTable(query.value, menu.value.categories))
    
    //modal
    const isModalOpen = ref(false)
    const viewCategory = (id) => {
        viewCategoryId.value =  id
        isModalOpen.value = true
    }

    //sortable
    const tableBody = ref(null)
    const { option } = useSortable(tableBody, menu.value.categories, {
        handle: '[data-sort-handle]',
        animation: 300,
        disabled: false,
        ghostClass: 'active-sortable-tr'
    })

    watchEffect(() => {
        //disable on filtering
        option('disabled', query.value === '' ? false : true)
    })

</script>
<template>
    <div>
        <div class="flex items-center justify-between gap-4 mb-4">
          <h3 class="text-xl">Categories</h3>
          <UButton color="brand-blue" @click="isModalOpen = true" icon="i-ph-plus" label="New Category"/>
        </div>
        <div class="flex py-3.5 border-gray-200 dark:border-gray-700">
            <UInput v-model="query" placeholder="Filter categories ..." />
        </div>
        <div v-if="filteredCategories.length">
            <div class="overflow-auto w-full max-h-[600px] rounded-md border" >
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
                        <tr v-for="(item, idx ) in filteredCategories" :key="item.uid" class="hover:cursor-pointer bg-white">
                            <td class="px-2 py-2 flex items-center gap-1">
                                <UIcon data-sort-handle name="i-ph-dots-six-vertical-light" class="shrink-0 w-4 h-4" :class="query && 'opacity-15 '" />
                                <span>{{ idx + 1 }}</span>
                            </td>
                            <td class="px-4 py-2 truncate">{{ item.name }}</td>
                            <td class="px-4 py-2 truncate">{{ item.description }}</td>
                            <td class="px-4 py-2 flex items-center justify-end gap-3">
                                <UTooltip text="View and edit">
                                    <UButton square variant="outline" color="gray"  icon="i-ph-eye" @click.prevent="() => viewCategory(item.uid)" />
                                </UTooltip>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="py-3.5 font-bold">Total: {{ filteredCategories?.length }}</div>
        </div>
        <UiEmptyBlock v-else>
            No Categories
        </UiEmptyBlock>
    <UModal v-model="isModalOpen">
        <MenuCategoryForm @close="isModalOpen = false"/>
    </UModal>
    </div>
</template>