<script setup>

useHead({
    title: useRuntimeConfig().public.siteName,
    meta: [
        { name: 'description', content: useRuntimeConfig().public.siteDescription },
        { name: 'keywords', content: 'web developer, JavaScript Developer, nuxt and vue developer, business website design' },
    ],
})

const { el, motion, visible } = useScrollReveal({
  threshold: 0.4,
  delay: 0,
  y: 30,
  once: true,
})
</script>
<template>
    <Body class="bg-gray-100"></Body>
    <MainHomeHero ref="el" v-motion="motion" :visible="visible" />
    <div class="container grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 my-4 lg:my-6">
        <MainWebApps />
        <MainHomeMyStack/>
        <MainHomeBusinessWebsite />
        <MainToolsList class="lg:col-span-2" />
        <MainHomeHobby />
    </div>
    <div class="container">
        <MainHomeRestaurantWebsiteDesign class="my-4 lg:my-6" />
    </div>
</template>