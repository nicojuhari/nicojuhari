<script setup>
definePageMeta({
    layout: 'demos'
})

useHead({
        title: 'Demos',
        titleTemplate: '%pageTitle',
        meta: [
            { name: 'description', content: 'Demo websites for real businesses, drafts of the project' },
            { name: 'robots', content: 'noindex' }
        ],
})

</script>
<template>
    <NuxtPage/>
</template>