<script setup>
import { storeToRefs } from 'pinia';
import { useMenuStore } from '~/store/menu'
import { viewObjectId } from '~/composables/useAppStatus';


const emit = defineEmits(['close'])
const { menuPromos, menu } = storeToRefs(useMenuStore())
const newPromo = ref({ uid: '', name: '', description: '' });
const promoIdx = ref(0)
const loading = ref(false)

if (viewObjectId.value) {

    let result = searchArray(menuPromos.value, (item) => item.uid === viewObjectId.value)

    if (result?.item) {
        newPromo.value = { ...result.item }
        promoIdx.value = result.index
    }
}

const handleForm = () => {
    loading.value = true
    //update promo
    if (viewObjectId.value) {
        if (menu.value) {
            menu.value.promos = updateItemInArray(menuPromos.value, promoIdx.value, newPromo.value)
        }
    } else {
        //create promo
        menuPromos.value.push({ ...newPromo.value, uid: uid() })
    }

    setTimeout(() => {
        loading.value = false
        emit('close')
    }, 400)

}

onBeforeUnmount(() => {
    viewObjectId.value = null
    newPromo.value = {}
})
</script>
<template>
    <UCard>
        <template #header>
            <div class="flex justify-between items-center">
                <span> {{ viewObjectId ? 'View Promo' : 'New Promo' }} </span>
                <UButton @click.prevent="$emit('close')" color="gray" square variant="soft" icon="i-ph-x" />
            </div>
        </template>
        <FormKit type="form" :actions="false" v-model="newPromo" @submit="handleForm" id="promoFormKit">
            <FormKit name="name" type="text" label="Name" validation="length:1,100"></FormKit>
            <FormKit name="description" type="textarea" label="Description" validation="length:3,300"></FormKit>
            <div class="grid grid-cols-2 gap-6 mt-6">
                <UFormGroup label="Start date">
                    <UInput type="date" v-model="newPromo.startDate"/>
                </UFormGroup>
                <UFormGroup label="End date">
                    <UInput type="date" v-model="newPromo.endDate"/>
                </UFormGroup>
            </div>
            <div class="grid grid-cols-2 gap-6 mt-6">
                <UFormGroup label="Text color">
                    <UInput type="color" v-model="newPromo.textColor"/>
                </UFormGroup>
                <UFormGroup label="End date">
                    <UInput type="color" v-model="newPromo.bgColor"/>
                </UFormGroup>
            </div>
            <UDivider label="or" class="mt-6" />
            <UFormGroup label="Image URL" class="mt-3">
                <UInput type="text" v-model="newPromo.bgImage"/>
            </UFormGroup>
        </FormKit>
        <template #footer>
            <div class="flex justify-between items-center">
                <div v-if="viewObjectId" class="text-sm opacity-30">ID: {{ viewObjectId }}</div>
                <div class="flex justify-end gap-4 ml-auto">
                    <UButton @click="$formkit.submit('promoFormKit')" color="brand-blue" variant="outline"
                        :loading="loading">
                        {{ viewObjectId ? 'Update' : 'Create' }}
                    </UButton>
                </div>
            </div>
        </template>
    </UCard>
</template>