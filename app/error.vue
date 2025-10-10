<script setup>
    useHead({
        title: '404: Page not found',
        meta: [
            { name: 'description', content: 'Page not found' }
        ],
    })
</script>
<template>
    <div class="container py-10 min-h-screen flex">
        <div class="text-center m-auto">
            <h1 class="font-bold text-3xl mb-2">404: Page not found</h1>
            <h2 class="mb-8 text-lg font-normal">The page you are looking for does not exist.</h2>
            <UButton size="lg" to="/">Go to home page</UButton>
        </div>
    </div>
</template>