<script setup>

useHead({
    title: 'My Projects',
    meta: [
        { name: 'keywords', content: 'web projects, portfolio, web developer, javasrcipt developer, business websites, website development' },
        { name: 'description', content: `Collection of my web projects what I build in the past using WordPress, JavaScript, SASS, CSS, PHP, Vue.js, Nuxt.js ...` },
    ],
})
</script>
<template>
    <div class="container my-10">
        <div class="subtitle my-10 text-center">Projects</div>
        <MainProjectsList />
    </div>
</template>