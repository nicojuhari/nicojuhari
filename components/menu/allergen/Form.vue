<script setup>
import { storeToRefs } from 'pinia';
import { useMenuStore } from '~/store/menu'


const emit = defineEmits(['close'])
const { menuAllergens, menu, viewObjectId } = storeToRefs(useMenuStore())
const newAllergen = ref({ uid: '', name: '', description: '' });
const allergenIdx = ref(0)
const loading = ref(false)

if (viewObjectId.value) {

    let result = searchArray(menuAllergens.value, (item) => item.uid === viewObjectId.value)

    if (result?.item) {
        newAllergen.value = { ...result.item }
        allergenIdx.value = result.index
    }
}

const handleForm = () => {
    loading.value = true
    //update category
    if (viewObjectId.value) {
        if (menu.value) {
            menu.value.allergens = updateItemInArray(menuAllergens.value, allergenIdx.value, newAllergen.value)
        }
    } else {
        //create category
        menuAllergens.value.push({ ...newAllergen.value, uid: uid() })
    }

    setTimeout(() => {
        loading.value = false
        emit('close')
    }, 400)

}

onBeforeUnmount(() => {
    viewObjectId.value = null
    newAllergen.value = {}
})
</script>
<template>
    <UCard>
        <template #header>
            <div class="flex justify-between items-center">
                <span> {{ viewObjectId ? 'View Allergen' : 'New Allergen' }} </span>
                <UButton @click.prevent="$emit('close')" color="gray" square variant="soft" icon="i-ph-x" />
            </div>
        </template>
        <FormKit type="form" :actions="false" v-model="newAllergen" @submit="handleForm" id="categoryFormKit">
            <FormKit name="name" type="text" label="Name" validation="required|length:1,2"></FormKit>
            <FormKit name="description" type="textarea" label="Description" validation="required|length:3,100"></FormKit>
        </FormKit>
        <template #footer>
            <div class="flex justify-between items-center">
                <div v-if="viewObjectId" class="text-sm opacity-30">ID: {{ viewObjectId }}</div>
                <div class="flex justify-end gap-4 ml-auto">
                    <UButton @click="$formkit.submit('categoryFormKit')" color="blue" variant="outline"
                        :loading="loading">
                        {{ viewObjectId ? 'Update' : 'Create' }}
                    </UButton>
                </div>
            </div>
        </template>
    </UCard>
</template>