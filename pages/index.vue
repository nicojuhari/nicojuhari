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
    <Body class="bg-gray-50"></Body>
    <MainHomeHero />
    <div class="container grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 my-4 lg:my-6">
        <MainWebApps />
        <MainHomeMyStack/>
        <MainHomeBusinessWebsite />
        <MainToolsList class="lg:col-span-2" />
        <MainHomeHobby />
    </div>
</template>