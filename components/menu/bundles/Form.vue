<script setup>
import { storeToRefs } from 'pinia';
import { useMenuStore } from '~/store/menu'
import { viewObjectId } from '~/composables/useAppStatus';


const emit = defineEmits(['close'])
const { menuProducts, menuCategories, menuAllergens, menu } = storeToRefs(useMenuStore())

const products = ref([]) // from props

const bundles = useState('bundles', () => [
    {
        id: 1,
        items: []
    }
])

function addItem(bundle) {
    bundle.items.push({
        id: uid(),
        product: null,
        qty: 1,
        price: 0
    })
}

function addBundle() {
    const id = bundles.value.length + 1
    bundles.value.push({
        id,
        items: []
    })
}

function removeBundle(bundle) {
    bundles.value = bundles.value.filter(b => b.id !== bundle.id)
}

</script>
<template>
    <div v-for="bundle in bundles" :key="bundle.id">

        <div class="flex justify-between items-center mb-2">
            <h3 class="text-lg font-medium">Bundle {{ bundle.id }}</h3>
            <button @click="removeBundle(bundle)">
                Remove
            </button>
        </div>

        <div class="space-y-2">

            <div v-for="item in bundle.items" :key="item.id" class="flex justify-between">

                
    
                <UFormGroup label="Product">
                    <USelectMenu v-model="item.product" :options="menuProducts" option-attribute="name" value-attribute="uid"/>
                </UFormGroup>
                <UFormGroup label="Qty">
                    <UInput v-model="item.qty"/>
                </UFormGroup>
                <UFormGroup label="Price">
                    <UInput v-model="item.price" type="number" step="0.01"/>
                </UFormGroup>
                

                

            </div>

            <UButton @click="addItem(bundle)">
                Add item
            </UButton>

        </div>

    </div>

    <UButton @click="addBundle">
        Add bundle
    </UButton>
</template>


