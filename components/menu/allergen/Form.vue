<script setup>
import { storeToRefs } from 'pinia';
import { useMenuStore } from '~/store/menu'
import { viewObjectId } from '~/composables/useAppStatus';


const emit = defineEmits(['close'])
const { menuAllergens, menu } = storeToRefs(useMenuStore())
const newCategory = ref({ uid: '', name: '', description: '' });
const categoryIdx = ref(0)
const loading = ref(false)

if (viewObjectId.value) {

    let result = searchArray(menuAllergens.value, (item) => item.uid === viewObjectId.value)

    if (result?.item) {
        newCategory.value = { ...result.item }
        categoryIdx.value = result.index
    }
}

const handleForm = () => {
    loading.value = true
    //update category
    if (viewObjectId.value) {
        if (menu.value) {
            menu.value.allergens = updateItemInArray(menuAllergens.value, categoryIdx.value, newCategory.value)
        }
    } else {
        //create category
        menuAllergens.value.push({ ...newCategory.value, uid: uid() })
    }

    setTimeout(() => {
        loading.value = false
        emit('close')
    }, 400)

}

onBeforeUnmount(() => {
    viewObjectId.value = null
    newCategory.value = {}
})
</script>
<template>
    <UCard>
        <template #header>
            <div class="flex justify-between items-center">
                <span> {{ viewObjectId ? 'View Category' : 'New Category' }} </span>
                <UButton @click.prevent="$emit('close')" color="gray" square variant="soft" icon="i-ph-x" />
            </div>
        </template>
        <FormKit type="form" :actions="false" v-model="newCategory" @submit="handleForm" id="categoryFormKit">
            <FormKit name="name" type="text" label="Name" validation="required|length:1,1"></FormKit>
            <FormKit name="description" type="textarea" label="Description" validation="required|length:3,100"></FormKit>
        </FormKit>
        <template #footer>
            <div class="flex justify-between items-center">
                <div v-if="viewObjectId" class="text-sm opacity-30">ID: {{ viewObjectId }}</div>
                <div class="flex justify-end gap-4 ml-auto">
                    <UButton @click="$formkit.submit('categoryFormKit')" color="brand-blue" variant="outline"
                        :loading="loading">
                        {{ viewObjectId ? 'Update' : 'Create' }}
                    </UButton>
                </div>
            </div>
        </template>
    </UCard>
</template>