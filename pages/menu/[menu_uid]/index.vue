<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useMenuStore } from '~/store/menu';

defineProps({
    menu_uid: {
        required: true,
        type: String,
    }
})

//state
const { menu } = storeToRefs(useMenuStore())

</script>
<template>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <NuxtLink :to="`/menu/${menu_uid}/categories`">
            <UCard>
                <div class="uppercase opacity-50">Categories</div>
                <div class="font-bold text-xl mt-2">{{ menu?.categories?.length }}</div>
            </UCard>
        </NuxtLink>
        <NuxtLink :to="`/menu/${menu_uid}/products`">
            <UCard>
                <div class="uppercase opacity-50">Products</div>
                <div class="font-bold text-xl mt-2">{{ menu?.products?.length }}</div>
            </UCard>
        </NuxtLink>
        <NuxtLink :to="`/menu/${menu_uid}/bundles`">
            <UCard>
                <div class="uppercase opacity-50">Bundles</div>
                <div class="font-bold text-xl mt-2">{{ menu?.bundles?.length }}</div>
            </UCard>
        </NuxtLink>
        <NuxtLink :to="`/menu/${menu_uid}/allergens`">
            <UCard>
                <div class="uppercase opacity-50">Allergens</div>
                <div class="font-bold text-xl mt-2">{{ menu?.allergens?.length }}</div>
            </UCard>
        </NuxtLink>
    </div>
</template>