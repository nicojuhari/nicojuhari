<script setup>
    import { storeToRefs } from "pinia"
    import { useMenuStore } from '~/store/menu';
    const { menu } = storeToRefs(useMenuStore())

    const designConfig = reactive({
        designVersion: 1,
        priceSymbol: '$',
        allergens: {
            title: 'Allergens',
            show: true,
        }
    })

    let freeCode = computed(() => {
        let { menu_uid, isFromLocal, ...restOfMenu } = menu.value
return `<div id="OneFoodMenu" class="container"></div>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/1food-menu/dist/style.css"/>
<script type="module">
    
    import { createMenu } from "https://cdn.jsdelivr.net/npm/1food-menu/dist/1food-menu.mjs"
    
    const menuData = ${JSON.stringify({ ...restOfMenu })}
    
    createMenu({
        menu: menuData,
        version: 1,
        priceSymbol: '$',
    });

<\/script> `
    });

</script>
<template>
    <div>
        <UCard>
            <div class="flex sm:items-center justify-between gap-4 mb-4 flex-col md:flex-row">
              <h3 class="text-xl">Free Designs</h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>Design configurator</div>
                <IncludesCodeEditor :code="freeCode"/>
            </div>
        </UCard>
        <div class="text-center my-6 text-2xl">Menu Preview</div>
    </div>
</template>