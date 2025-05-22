<script setup>
    const props = defineProps({
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

    const productAllergens = computed(() => {
        let pa = []
        if(props.product?.allergens?.length) {
            pa = props.product.allergens.map((al) => {
                return props.allergens.find(item => item.uid === al)
            })
        } 

        return JSON.parse(JSON.stringify(pa));
    })
</script>
<template>
    <img :src="product?.imageUrl" class="w-full h-full aspect-square object-cover rounded-lg" :alt="product.title" />
    <div class="mt-6 space-y-4">
        <div class="text-lg">{{ product.description }}</div>
        <div v-if="productAllergens?.length" class="relative border border-gray-100/60 rounded-md p-2 bg-gray-50">
            <!-- <div class="inline-flex text-sm text-gray-400 bg-white px-2 -translate-y-3.5">Allergens</div> -->
            <div v-for="item in productAllergens" class="line-clamp-1">
                <span class="w-7">{{ item.name }} - </span>
                <span class="text-sm text-gray-600">{{ item.description }}</span>
            </div>
        </div>
        <div>
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
                    <div v-if="option.salePrice" class="text-gray-600 line-through opacity-70 text-sm">
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
</template>