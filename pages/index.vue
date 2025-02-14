<script setup>

useHead({
    title: useRuntimeConfig().public.siteName,
    meta: [
        { name: 'description', content: useRuntimeConfig().public.siteDescription },
        { name: 'keywords', content: 'web developer, JavaScript Developer, nuxt and vue developer, business website design' },
    ],
})
</script>
<template>
    <div>
        <Body class="bg-gray-50"></Body>
        <MainHomeHero />
        <MainWebApps class="container my-8"/>
        <MainHomeMyStack class="container"/>
        <MainToolsList class="container my-8" />
        <div class="container grid grid-cols-1 lg:grid-cols-3 gap-8 my-8">
            <!-- <MainHomeAboutMe/> -->
        </div>
        <div class="container grid grid-cols-1 lg:grid-cols-3 gap-8 my-8">
        </div>
    </div>
</template>