<script setup>
    defineProps({
        product: {
            required: true,
            type: Object   
        },
        allergens: {
            required: true,
            type: Array
        },
        moneySymbol: {
            default: "$"
        },
        moneySymbolAfter: {
            default: false
        }      
    })

    defineEmits(['close'])
</script>
<template>
    <div class="flex flex-col bg-white flex-shrink-0 rounded-lg overflow-hidden relative">
        <UButton square icon="i-ph-x-bold"
            class="absolute rounded-full bg-white/80 hover:bg-white right-3 top-3 font-bold text-gray-950"
            @click="() => $emit('close')" />
        <div class="h-72 w-full image-bg image-bg-2 shrink-0">
            <div class="image-bg h-full w-full" :style="`background-image: url(${product.imageUrl})`">
            </div>
        </div>
        <div class="p-4 flex flex-col flex-grow">
            <div class="font-semibold pb-2 inline-flex flex-wrap gap-2 items-center">
                <span>{{ product.name }}</span>
                <span v-for="item in product.allergens"
                    class="cursor-pointer font-medium flex-shrink-0 text-gray-600 text-xs p-1 bg-slate-50 rounded-full border w-4 h-4 grid place-content-center">
                    {{ allergens.find((al) => al.uid == item).name }}
                </span>
            </div>
            <div class="text-gray-600 w-full">{{ product.description }}</div>
            <div class="pt-3">
                <div v-for="option in product.options"
                    class="flex justify-between items-center border-t first:border-t-0 border-dashed border-gray-200 py-2">
                    <div class="text-gray-400 text-sm">{{ option?.size }}</div>
                    <div class="flex gap-2 items-center">
                        <!-- sale price or normal -->
                        <div class="text-lg">
                            <template v-if="moneySymbolAfter">
                                {{ option.salePrice ? option.salePrice : option.price }} {{ moneySymbol }}
                            </template>
                            <template v-else> {{ moneySymbol }} {{ option.salePrice ? option.salePrice : option.price }}
                            </template>
                        </div>
                        <!-- old price -->
                        <div v-if="option.salePrice" class="text-red-600 line-through opacity-70 text-sm">
                            <template v-if="moneySymbolAfter">
                                {{ option.price }} {{ moneySymbol }}
                            </template>
                            <template v-else> {{ moneySymbol }} {{ option.price }}
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>