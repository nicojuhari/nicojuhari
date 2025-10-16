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
    <section class="container container-sm">
        <h2 class="title mb-6 text-center">Playground</h2>
        <PlaygroundProjectsList />
    </section>
    <section class="container container-sm">
        <h2 class="title mb-0 text-center">Simple Tools</h2>
        <p class="text-sm text-center mb-6 text-gray-500">Built for me and sharing with you.</p>
        <MainToolsList />
    </section>
    <MainHomeMyStack />
    <MainHomeHireMe />
</template>