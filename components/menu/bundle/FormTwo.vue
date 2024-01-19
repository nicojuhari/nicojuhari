<script setup>
import { storeToRefs } from 'pinia';
import { useMenuStore } from '~/store/menu'

const emit = defineEmits(['close'])
const { menuProducts, menuCategories, menuAllergens, menu } = storeToRefs(useMenuStore())

const availableProducts = ref([ ...menuProducts.value ])
const selectedProducts = ref([])
const bundleItems = ref([])

const newBundle = {
    uid: '',
    name: '',
    description: '',
    items: [],
    bundlePrice: null
}

const newItem = {
    qty: 1,
    uid: '',
    option: 0,
}

// const getProductOptions = (productId) => {
//     return searchArray(menuProducts, (item) => item.uid == productId)?.options
// }

const selectProduct = (product_id) => {
    const product = availableProducts.value.find(p => p.uid === product_id)

    selectedProducts.value.push({ ...product })

    bundleItems.value.push({
        qty: 1,
        uid: product.uid,
        option: 0,
    })

    availableProducts.value.splice(availableProducts.value.findIndex(p => p.uid === product_id), 1)
}

const bundleItemsToDisplay = computed(() => {
    let array = [];

    bundleItems.value.forEach((item, idx) => {
        let product = menuProducts.value.find(p => p.uid === item.uid);

        array.push({
            idx: idx,
            uid: item.uid,
            name: product.name,
            imageUrl: product.imageUrl,
            qty: item.qty,
            options: product.options
        });
    });

    return array
})

const removeItemFromBundle = (product_id) => {
    const productIndex = bundleItems.value.findIndex(p => p.uid === product_id)

    if (productIndex > -1) {
        bundleItems.value.splice(productIndex, 1);

        //check if doesn't exist in array
        if (!availableProducts.value.find(p => p.uid === product_id)) {
            let idxToAddBack = menuProducts.value.findIndex(p => p.uid === product_id)
            availableProducts.value.push({ ...menuProducts.value[idxToAddBack] });
        }
    }
}

watch(() => bundleItems, (newVal, oldVal) => {
   console.log(bundleItems.value)
}, { deep: true})

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
                        <div v-for="item in bundleItemsToDisplay" :key="item.uid" class="px-4 py-6 hover:bg-slate-100">
                            <div class="flex gap-6">
                                <div class="shrink-0">
                                    <img v-if="item.imageUrl" class="m-auto w-24 h-24 object-cover rounded border" :src="item.imageUrl" alt="">
                                    <div v-else class="m-auto w-24 h-24 grid place-content-center bg-gray-50 border rounded">No image</div>
                                </div>
                                <div class="flex flex-col">
                                    <p class="text-xl font-medium truncate">{{ item.name }}</p>
                                    <div class="grid gap-4 grid-cols-3 mt-auto">
                                        <UFormGroup label="Size" class="mt-auto" v-if="item.options.length >= 2">
                                            <select class="formkit-input" v-model="bundleItems[item.idx].size">
                                                <option v-for="(option, idx) in item.options" :key="idx" :value="idx" :selected="bundleItems[item.idx].size == idx" class="flex justify-between">
                                                    {{ option.size }}
                                                </option>
                                            </select>
                                        </UFormGroup>
                                        <UFormGroup label="Qty">
                                            <UInput type="number" step="1" v-model.number="bundleItems[item.idx].qty"></UInput>
                                        </UFormGroup>
                                        <div class="flex items-end">
                                            <UButton  @click="() => removeItemFromBundle(item.uid)" square icon="i-ph-trash-light" color="brand-red" variant="soft"></UButton>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                </div>
            </UCard>
    </div>
</template>