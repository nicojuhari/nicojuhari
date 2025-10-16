<script setup>
        useHead({
        title: 'Playground Projects | CSS and JavaScript Experiments',
        meta: [
            { name: 'description', content: 'A collection of lightweight front-end playgrounds of small projects built with Vue, JavaScript, GSAP, and CSS.' },
        ],
})
</script>
<template>
    <div class="container container-sm py-8">
        <h1 class="title text-center my-8">Playground Projects</h1>
        <PlaygroundProjectsList/>
    </div>
</template>