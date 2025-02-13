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
        <div class="container grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div>more about me</div>
            <div class="lg:col-span-2 space-y-8">
                <MainWebApps/>
                <MainToolsList/>
            </div>
        </div>
        <!-- <MainHomeMyServices /> -->
        <!-- <MainAppsList/> -->
        <MainHomeMyStack />
    </div>
</template>