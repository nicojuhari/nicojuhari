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
const removeFields = (idx) => {
    props.modelValue.splice(idx, 1)
}

const handleChange = (type, value, idx) => {
    //if(value == '') return
    props.modelValue[idx][type] = value
    emit('update:modelValue', props.modelValue)
}

if (props.modelValue.length == 0) addFields()

</script>
<template>
    <div>
        <label>Options</label>
        <div class="p-4 rounded bg-slate-50 max-h-96 overflow-y-auto">
            <div v-for="(field, idx) of modelValue" class="grid grid-flow-col gap-6 items-end mt-6 first:mt-0">
                <div>
                    <label>Size</label>
                    <input type="text" required name="size" class="input-text" :value="field.size"
                        @input="handleChange('size', $event.target.value, idx)" />
                </div>
                <div>
                    <label>Price</label>
                    <input type="text" required name="price" class="input-text" :value="field.price"
                        @input="handleChange('price', $event.target.value, idx)" />
                </div>
                <div>
                    <label>Sale Price</label>
                    <input type="text" name="salePrice" class="input-text" :value="field.salePrice"
                        @input="handleChange('salePrice', $event.target.value, idx)" />
                </div>
                <UButton icon="i-ph-plus" square color="brand-green" v-if="idx == 0" variant="soft" class="flex-shrink-0" @click="addFields"/>
                <UButton v-else icon="i-ph-trash" square color="brand-red" variant="soft" severity="danger" outlined bgOpacity @click="removeFields(idx)"/>
            </div>
        </div>
    </div>
</template>