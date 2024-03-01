<script setup>

const props = defineProps({
    modelValue: {
        type: Array,
        default: [],
    },
})
const emit = defineEmits(['update:modelValue'])

const addFields = () => {
    props.modelValue.push({
        size: '',
        price: '',
        salePrice: ''
    })
}

const errorMessage = ref('')

const removeFields = (idx) => {
    errorMessage.value = ''
    props.modelValue.splice(idx, 1)
}

const handleChange = (type, value, idx) => {
    errorMessage.value = ''

    //validate SALE PRICE
    if(type == 'salePrice' && value) {
        let isPriceEmpty = !props.modelValue[idx]['price']
        

        if(isPriceEmpty) {
            errorMessage.value = "You cannot have only the SALE PRICE; please include the standard price as well."
            props.modelValue[idx][type] = ''
            emit('update:modelValue', props.modelValue)
            return
        }
    }

    // if the regular price is removed
    if (type == 'price' && !value) {
        let isSalePriceEmpty = !props.modelValue[idx]['salePrice']


        if (!isSalePriceEmpty) {
            errorMessage.value = "You cannot have only the SALE PRICE; please include the standard price as well."
            props.modelValue[idx][type] = ''
            emit('update:modelValue', props.modelValue)
            return
        }
    }

    props.modelValue[idx][type] = value
    emit('update:modelValue', props.modelValue)
}

if (props.modelValue.length == 0) addFields()

</script>
<template>
    <div>
        <label>Price options</label>
        <div class="p-4 rounded bg-slate-50 max-h-96 overflow-y-auto">
            <div v-if="errorMessage" class="text-sm text-red-600">{{ errorMessage }}</div>
            <div v-for="(field, idx) of modelValue" class="grid grid-flow-col gap-6 items-end mt-6 first:mt-0">
                <div>
                    <label>Size</label>
                    <input type="text" required name="size" class="input-text" :value="field.size"
                        @input="handleChange('size', $event.target.value, idx)" />
                </div>
                <div>
                    <label>Price</label>
                    <input type="number" required name="price" class="input-text" :value="field.price"
                        @input="handleChange('price', $event.target.value, idx)" />
                </div>
                <div>
                    <label>Sale Price</label>
                    <input type="number" name="salePrice" class="input-text" :value="field.salePrice"
                        @input="handleChange('salePrice', $event.target.value, idx)" />
                </div>
                <UButton icon="i-ph-plus" square color="green" v-if="idx == 0" variant="soft" class="flex-shrink-0" @click="addFields"/>
                <UButton v-else icon="i-ph-trash" square color="red" variant="soft" severity="danger" outlined bgOpacity @click="removeFields(idx)"/>
            </div>
        </div>
    </div>
</template>