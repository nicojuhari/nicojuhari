<script setup>
    import { storeToRefs } from "pinia"
    import { useMenuStore } from '~/store/menu';
    import { viewCategoryId } from '~/composables/useAppStatus';



    const isModalOpen = ref(false)
    // const { menuCategories } = useMenuStore()
    const { menuCategories } = storeToRefs(useMenuStore())
    const q = ref('')
    const filteredCategories = computed(() => searchInTable(q.value, menuCategories.value))

    const viewCategory = (id) => {
        viewCategoryId.value =  id
        isModalOpen.value = true
    }

</script>
<template>
    <div>
        <div class="flex items-center justify-between gap-4 mb-4">
          <h3 class="text-xl">Categories</h3>
          <UButton color="brand-blue" @click="isModalOpen = true" icon="i-ph-plus" label="New Category"/>
        </div>
        <div class="flex py-3.5 border-gray-200 dark:border-gray-700">
            <UInput v-model="q" placeholder="Filter categories ..." />
        </div>
        <div v-if="filteredCategories.length">
            <div class="overflow-auto w-full max-h-[600px] rounded-md border" >
                 <table class="table-auto min-w-[800px] divside-y divide-gray-300 w-full">
                    <thead>
                        <tr class="border-b bg-gray-50">
                            <th class="p-4 font-medium text-left w-12">Nr</th>
                            <th class="p-4 font-medium text-left">Name</th>
                            <th class="p-4 font-medium text-left">Description</th>
                            <th class="p-4 font-medium text-left"></th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr v-for="(item, idx ) in filteredCategories" :key="item.uid">
                            <td class="px-4 py-2">{{ idx + 1 }}</td>
                            <td class="px-4 py-2 truncate">{{ item.name }}</td>
                            <td class="px-4 py-2 truncate">{{ item.description }}</td>
                            <td class="px-4 py-2 flex items-center justify-end gap-2">
                                <!-- <UButton square icon="pi pi-angle-up" @click.prevent="moveCategory(idx, idx - 1)">
                                
                                </UButton>
                                <UButton outlined icon="pi pi-angle-down" @click.prevent="moveCategory(idx, idx + 1)">
        
                                </UButton> -->
                                <UButton variant="outline" color="gray"  icon="i-ph-eye" @click.prevent="() => viewCategory(item.uid)">
                            
                                </UButton>
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