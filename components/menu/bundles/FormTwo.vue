<script setup>
import { storeToRefs } from 'pinia';
import { useMenuStore } from '~/store/menu'

const emit = defineEmits(['close'])
const { menuProducts, menuCategories, menuAllergens, menu } = storeToRefs(useMenuStore())

const availableProducts = ref(menuProducts.value)
const selectedProducts = ref([])

const newBundle = {
    uid: '',
    name: '',
    description: '',
    items: [],
    bundlePrice: null
}

// const getProductOptions = (productId) => {
//     return searchArray(menuProducts, (item) => item.uid == productId)?.options
// }

const selectProduct = (product_id) => {
    const product = availableProducts.value.find(p => p.uid === product_id)

    selectedProducts.value.push({ ...product })

    availableProducts.value.splice(availableProducts.value.findIndex(p => p.uid === product_id), 1)
}

</script>
<template>
    <div class="grid grid-cols-2 gap-8 my-8">
        <UCard>
            <div class="p-4 text-center">Available</div>
            <div class="border h-96 overflow-y-auto">
                <ul>
                    <li @click="() => selectProduct(item.uid)" v-for="item in availableProducts" :key="item.uid" class="p-4 flex items-center">
                        {{ item.name }}
                    </li>
                </ul>
            </div>
        </UCard>
        <UCard>
                <div class="p-4 text-center">Selected</div>
                <div class="border h-96 overflow-y-auto">
                    <ul>
                        <li v-for="item in selectedProducts" :key="item.uid" class="p-4">
                            <div class="flex item-center justify-between mb-6">
                                <div>
                                    <img v-if="item.imageUrl" class="m-auto w-24 h-24 object-cover rounded border" :src="item.imageUrl" alt="">
                                    <div v-else class="m-auto w-24 h-24 grid place-content-center bg-gray-50 border rounded">No image</div>
                                </div>
                                <div class="grid place-content-center">
                                    {{ item.name }}
                                </div>
                                <div class="grid place-content-center">
                                    <span> {{ item.options[0]?.salePrice && item.options[0]?.salePrice || item.options[0]?.price }}</span>
                                </div>
                            </div>
                            <div class="grid gap-4 grid-cols-3">
                                <UFormGroup label="Option">
                                    <select class="formkit-input" v-model="item.option">
                                        <option v-for="(option, idx) in item.options" :key="idx" :value="idx" class="flex justify-between">
                                            {{  option.size }}  {{ option.price }}
                                        </option>
                                    </select>
                                    <!-- <UInput type="numer" step="1" v-model="item.qty"></UInput> -->
                                </UFormGroup>
                                <UFormGroup label="Qty">
                                    <UInput type="numer" step="1" v-model="item.qty"></UInput>
                                </UFormGroup>
                                <UFormGroup label="Custom price">
                                    <UInput type="text" v-model="item.itemPrice"></UInput>
                                </UFormGroup>
                            </div>
                        </li>
                    </ul>
                </div>
            </UCard>
    </div>
</template>