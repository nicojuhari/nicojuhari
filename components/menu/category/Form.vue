<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { useMenuStore } from '~/store/menu'
    import { viewCategoryId } from '~/composables/useAppStatus';
    
    const { menuCategories, menu } = storeToRefs(useMenuStore())

    type Category = {
        uid: string,
        name: string,
        description: string
    }
    // console.log(menuCategories)
    const newCategory = ref<Category>({ uid: '', name: '', description: ''});
    const categoryIdx = ref(0)

    console.log(menuCategories)

    if(viewCategoryId.value) {

        let result = searchArray<Category>(menuCategories.value, (item) => item.uid === viewCategoryId.value )

        if(result?.item) {
            newCategory.value = { ...result.item }
            categoryIdx.value = result.index
        }
    }
    

    const emit = defineEmits(['close'])

    const handleForm = () => {

        //update category
        if(viewCategoryId.value) {
            // let result = searchArray<Category>(menuCategories.value, (item) => item.uid === viewCategoryId.value)
            if(menu.value) {
                menu.value.categories = updateItemInArray(menuCategories.value, categoryIdx.value, newCategory.value)
            }
        }

        //create category
        menuCategories.value.push({ ...newCategory.value, uid: uid() })

        //update category

        setTimeout(() => {
            emit('close')
        }, 600)
        
    }

    
</script>
<template>
    <UCard>
        <template #header>
            <div class="flex justify-between items-center">
                <span> {{ viewCategoryId ? 'View Category' : 'New Category' }} </span>
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
            <div class="flex justify-end">
                <UButton @click="$formkit.submit('categoryFormKit')" color="brand-blue" variant="outline">
                {{  viewCategoryId ? 'Update' : 'Create' }}
                </UButton>
            </div>
        </template> 
    </UCard>
</template>