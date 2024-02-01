
<script setup>
import { storeToRefs } from 'pinia';
import { useMenuStore } from '~/store/menu'

const emit = defineEmits(['close'])
const { menuProducts, menuBundles, menu, viewObjectId } = storeToRefs(useMenuStore())
const newBundle = ref({ uid: '', name: '', description: '', price: null });
const bundleIdx = ref(0)
const loading = ref(false)

//bundles state
const availableProducts = ref([...menuProducts.value])
const bundleItems = ref([])

if (viewObjectId.value) {

    let result = searchArray(menuBundles.value, (item) => item.uid === viewObjectId.value)
    
    if (result?.item) { 
        newBundle.value = { ...result.item }
        bundleIdx.value = result.index

        //filter bundles items
        if(result.item.items) {
            bundleItems.value = [...result.item.items]
            availableProducts.value = menuProducts.value.filter(p => {
                return !result.item.items.some(item => item.uid === p.uid)
            })
        }
    }

   
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

const handleForm = () => {
    loading.value = true
    //update bundle
    if (viewObjectId.value) {
        if (menu.value) {
            menu.value.bundles = updateItemInArray(menuBundles.value, bundleIdx.value, newBundle.value)
        }
    } else {
        //create bundle
        menu.value.bundles.push({ ...newBundle.value, uid: uid(), items: [...bundleItems.value] })
    }

    setTimeout(() => {
        loading.value = false
        emit('close')
    }, 400)

}

const selectProduct = (product_id) => {

    const product = availableProducts.value.find(p => p.uid === product_id)

    bundleItems.value.push({
        qty: 1,
        uid: product.uid,
        option: 0,
    })

    availableProducts.value.splice(availableProducts.value.findIndex(p => p.uid === product_id), 1)
}



const removeItemFromBundle = (product_id) => {
    const productIndex = bundleItems.value.findIndex(p => p.uid === product_id)

    if(productIndex > -1) {
        if (!bundleItems.value.find(p => p.uid === product_id)) {
            bundleItems.value.splice(productIndex, 1);
        }

        //check if doesn't exist in array
        if (!availableProducts.value.find(p => p.uid === product_id)) {
            let idxToAddBack = menuProducts.value.findIndex(p => p.uid === product_id)
            availableProducts.value.push({ ...menuProducts.value[idxToAddBack] });
        }
    }
}

onBeforeUnmount(() => {
    viewObjectId.value = null
    newBundle.value = {}
})
</script>
<template>
    <UCard>
        <template #header>
            <div class="flex justify-between items-center">
                <span> {{ viewObjectId ? 'View Bundle' : 'New Bundle' }} </span>
                <UButton @click.prevent="$emit('close')" color="gray" square variant="soft" icon="i-ph-x" />
            </div>
        </template>
        <FormKit type="form" :actions="false" v-model="newBundle" @submit="handleForm" id="bundleFormKit">
            <FormKit name="name" type="text" label="Name" validation="required|length:1,100"></FormKit>
            <FormKit name="description" type="textarea" label="Description" validation="length:3,300" input-class="h-16"></FormKit>
            <FormKit name="price" type="number" label="Price" validation="required"></FormKit>
            <UFormGroup label="Available Products" class="mt-6" v-if="availableProducts.length">
                <USelectMenu :uiMenu="{'option' : { 'container' : 'flex-1'}}" :options="availableProducts" searchable :search-attributes="['name']" searchable-placeholder="Search a product...">
                    <template #option="{ option: item }">
                        <div @click="() => selectProduct(item.uid)" class="p-2 gap-6 flex items-center cursor-pointer w-full">
                            <div class="shrink-0">
                                <img v-if="item.imageUrl" class="m-auto w-16 h-16 object-cover rounded border" :src="item.imageUrl" alt="">
                                <div v-else class="m-auto w-16 h-16 grid place-content-center bg-gray-50 border rounded text-xs">No image</div>
                            </div>
                            <div class="text-lg font-medium">{{ item.name }}</div>
                        </div>
                    </template>
                </USelectMenu>
            </UFormGroup>
            <UiEmptyBlock v-else class="mt-6">No available products</UiEmptyBlock>
            <div class="mt-6">
                 <label>Selected ({{ bundleItems.length }})</label>
                    <div class="border h-60 rounded overflow-y-auto">
                            <div v-for="item in bundleItemsToDisplay" :key="item.uid" class="px-2 py-4 hover:bg-slate-100">
                                <div class="flex gap-6">
                                    <div class="shrink-0">
                                        <img v-if="item.imageUrl" class="m-auto w-16 h-16 object-cover rounded border" :src="item.imageUrl" alt="">
                                        <div v-else class="m-auto w-16 h-16 grid place-content-center bg-gray-50 border rounded text-xs">No image</div>
                                    </div>
                                    <div class="flex flex-col">
                                        <p class="text-lg font-medium truncate">{{ item.name }}</p>
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
            </div>
        </FormKit>
        <template #footer>
            <div class="flex justify-between items-center">
                <div v-if="viewObjectId" class="text-sm opacity-30">ID: {{ viewObjectId }}</div>
                <div class="flex justify-end gap-4 ml-auto">
                    <UButton @click="$formkit.submit('bundleFormKit')" color="brand-blue" variant="outline"
                        :loading="loading">
                        {{ viewObjectId ? 'Update' : 'Create' }}
                    </UButton>
                </div>
            </div>
        </template>
    </UCard>
</template>