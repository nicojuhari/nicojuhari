<script setup>
    import { storeToRefs } from 'pinia';
    import { useMenuStore } from '~/store/menu'
    import { viewCategoryId } from '~/composables/useAppStatus';


    const emit = defineEmits(['close'])
    const { menuCategories, menu } = storeToRefs(useMenuStore())
    const newCategory = ref({ uid: '', name: '', description: ''});
    const categoryIdx = ref(0)
    const loading = ref(false)

    if(viewCategoryId.value) {

        let result = searchArray(menuCategories.value, (item) => item.uid === viewCategoryId.value )

        if(result?.item) {
            newCategory.value = { ...result.item }
            categoryIdx.value = result.index
        }
    }
    
    const handleForm = () => {
        loading.value = true
        //update category
        if(viewCategoryId.value) {
            if(menu.value) {
                menu.value.categories = updateItemInArray(menuCategories.value, categoryIdx.value, newCategory.value)
            }
        } else {
        //create category
            menuCategories.value.push({ ...newCategory.value, uid: uid() })
        }

        setTimeout(() => {
            loading.value = false
            emit('close')
        }, 400)
        
    }

    onBeforeUnmount(() => {
        viewCategoryId.value = null
        newCategory.value = {}
    })
</script>
<template>
    <UCard>
        <template #header>
            <div class="flex justify-between items-center">
                <span>  {{ viewCategoryId ? 'View Category' : 'New Category' }} </span>
                <UButton @click.prevent="$emit('close')" color="gray" square variant="soft" icon="i-ph-x"/>
            </div>
        </template>
        <div>
            <FormKit type="form" :actions="false" v-model="newCategory" @submit="handleForm" id="categoryFormKit">
                <FormKit name="name" type="text" label="Name" validation="required|length:1,100"></FormKit>
                <FormKit name="description" type="textarea" label="Description" validation="length:3,300"></FormKit>
            </FormKit>
            
        </div>
        <template #footer>
            <div class="flex justify-between items-center">
                <div v-if="viewCategoryId" class="text-sm opacity-30">ID: {{ viewCategoryId }}</div>
                <div class="flex justify-end gap-4">
                    <UButton @click="$formkit.submit('categoryFormKit')" color="brand-blue" variant="outline" :loading="loading">
                    {{  viewCategoryId ? 'Update' : 'Create' }}
                    </UButton>
                </div>
            </div>
        </template> 
    </UCard>
</template>