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
    <MainWebApps />
    <MainToolsList />
    <MainHomeMyStack />
    <MainHomeHireMe />
</template>