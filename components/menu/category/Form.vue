<script setup lang="ts">
    import { useMenuStore } from '~/store/menu'
    

    const { menuCategories } = useMenuStore()

    // console.log(menuCategories)

    const emit = defineEmits(['close'])

    const newCategory = ref({ uid: '' });

    const handleForm = () => {

        //create category
        menuCategories.push({ ...newCategory.value, uid: uid() })

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
                <span> New Category</span>
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
                <UButton @click="$formkit.submit('categoryFormKit')" color="brand-blue" variant="outline">Create</UButton>
            </div>
        </template> 
    </UCard>
</template>