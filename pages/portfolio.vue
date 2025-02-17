<script setup>

useHead({
    title: 'My Portfolio as a Freelancer and Web Developer',
    meta: [
        { name: 'keywords', content: 'web projects, portfolio, web developer, javasrcipt developer, business websites, website development' },
        { name: 'description', content: `Explore a diverse collection of my past web projects crafted with WordPress, JavaScript, SASS, CSS, PHP, Vue, Nuxt, and more.` },
    ],
})
</script>
<template>
    <div class="container my-4 lg:my-6">
        <Body class="bg-gray-50"></Body>
        <h1 class="py-4 mt-8 text-center title">My Portfolio</h1>
        <MainProjectsList />
    </div>
</template>