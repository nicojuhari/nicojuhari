<script setup>
import { storeToRefs } from "pinia"
import { useMenuStore } from '~/store/menu';
import { createMenu } from "https://cdn.jsdelivr.net/npm/1food-menu/dist/1food-menu.mjs"


const { menu } = storeToRefs(useMenuStore())
const { configs } = useFreeDesigns()

watch(() => configs, () => {
    createMenu({
        menu: menu.value,
        ...configs
    });
}, { deep: true })

onMounted(() => {
    createMenu({
        menu: menu.value,
        ...configs
    });
})

</script>
<template>
    <div class="my-6 bg-gray-100 rounded py-10 shadow-inner shadow-gray-200">
        <div class="w-full">
            <div id="OneFoodMenu"></div>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/1food-menu/dist/style.css" />
        </div>
    </div>
</template>