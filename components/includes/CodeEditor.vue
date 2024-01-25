<script setup>
    import { getHighlighter } from 'shikiji'
    
    const htmlCode = ref(null)
    const props = defineProps({
        code: {
            type: String,
            required: true
        },
        theme: {
            type: String,
            default: "github-dark"
        },
        codeLanguage: {
            type: String,
            default: "html"
        }
    })
    

    onMounted(async () => {
        const highlighter = await getHighlighter({
            themes: [props.theme],
            langs: [props.codeLanguage],
        })

        htmlCode.value = highlighter.codeToHtml(props.code, {
            lang: props.codeLanguage,
            theme: props.theme,
        });
    })

</script>
<template>
   <div v-html='htmlCode' class="rounded overflow-hidden"></div>
</template>