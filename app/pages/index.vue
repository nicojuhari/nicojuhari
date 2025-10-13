<script setup>

useHead({
    title: 'Shopify & Full-Stack JavaScript Developer',
    meta: [
        { name: 'description', content: 'Shopify expert and full-stack JavaScript (Vue/Nuxt) developer creating fast, pixel-perfect and SEO-friendly business and eCommerce websites.' },
        { name: 'keywords', content: 'web developer, JavaScript Developer, Shopify developer, vue developer, nuxt developer, performance and CRO' },
    ],
})

</script>

<template>
    <Body class="bg-gray-50"></Body>
    <MainHomeHero />
    <MainWebApps />
    <div class="container container-sm my-16 md:my-24">
        <h2 class="title text-center mb-6">Shopify Sections</h2>
        <ShopifySectionsList />
    </div>
    
    <MainToolsList />
    <MainHomeMyStack />
    <MainHomeHireMe />
</template>