<script setup>

useHead({
    title: 'My Portfolio as a Freelance Web Developer',
    meta: [
        { name: 'keywords', content: 'web projects, portfolio, web developer, javasrcipt developer, business websites, website development' },
        { name: 'description', content: `Explore a diverse collection of my past web projects crafted with WordPress, JavaScript, SASS, CSS, PHP, Vue.js, Nuxt.js, and more.` },
    ],
})
</script>
<template>
    <section>
        <div class="container">
            <h1 class="mb-10 text-center">My Portfolio</h1>
            <MainProjectsList />
        </div>
    </section>
</template>