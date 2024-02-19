<script setup>
import { storeToRefs } from "pinia"
import { useMenuStore } from '~/store/menu';
import { createMenu } from "https://cdn.jsdelivr.net/npm/1food-menu/dist/1food-menu.mjs"

const { menu, designConfig } = storeToRefs(useMenuStore())

watch(() => designConfig, () => {
    createMenu({
        menu: menu.value,
        ...designConfig.value
    });
}, { deep: true })

onMounted(() => {
    createMenu({
        menu: menu.value,
        ...designConfig.value
    });
})

</script>
<template>
    <div v-if="menu?.products?.length" class="my-6 bg-gray-100 rounded py-10 shadow-inner shadow-gray-200">
        <div class="w-full">
            <div id="OneFoodMenu"></div>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/1food-menu/dist/style.css" />
        </div>
    </div>
    <UiEmptyBlock v-else class="my-6">
              Please, add some products and categories to preview your menu.
    </UiEmptyBlock>
</template>