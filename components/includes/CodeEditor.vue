<script setup>
    import { storeToRefs } from "pinia"
    import { useMenuStore } from '~/store/menu';
    import { getHighlighter } from 'shikiji'
    import { useClipboard } from '@vueuse/core'

    const { menu, designConfig } = storeToRefs(useMenuStore())
    const { copy, copied } = useClipboard()
    const hCode = ref(null)
    const props = defineProps({
        theme: {
            type: String,
            default: "github-dark"
        },
        codeLanguage: {
            type: String,
            default: "html"
        }
    })


    let freeCode = computed(() => {
    let { menu_uid, isFromLocal, ...restOfMenu } = menu.value
    return `<div id="OneFoodMenu"></div>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/1food-menu/dist/style.css"/>
<script type="module">
    
    import { createMenu } from "https://cdn.jsdelivr.net/npm/1food-menu/dist/1food-menu.mjs"
    
    const menuData = ${JSON.stringify({ ...restOfMenu })}
    
    createMenu({
        menu: menuData,
        version: ${designConfig.value.version},
        priceSymbol: '${designConfig.value.priceSymbol}',
        allergens: {
            title: '${designConfig.value.allergens.title}',
            show: ${designConfig.value.allergens.show}
        }
    });

<\/script> `});

    
   

    
    watch(designConfig.value, async () => {
        const highlighter = await getHighlighter({
        themes: [props.theme],
        langs: [props.codeLanguage],
        })

        hCode.value = highlighter.codeToHtml(freeCode.value, {
            lang: props.codeLanguage,
            theme: props.theme,
        });
    }, { immediate: true })

</script>
<template>
    <div>
        <div v-html='hCode' class="rounded overflow-hidden"></div>
        <div class="mt-6">
            <UButton @click="copy(freeCode)" :loading="copied" color="brand-blue">
              <!-- by default, `copied` will be reset in 1.5s -->
              <span v-if="!copied">Copy to clipboard</span>
              <span v-else>Copied!</span>
            </UButton>
            <div class="italic">and paste the code into your project. Also, we recommend that you create a 
                backup/export the menu from the <NuxtLink :to="`/free-menu-maker/${$route.params.menu_uid}/settings`" class="font-semibold">setting page</NuxtLink> 
                for future use.
            </div>
        </div>
    </div>
</template>