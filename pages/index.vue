<script setup>
    useHead({
        title: 'Web & JavaScript Developer',
        meta: [
            { name: 'keywords', content: 'web developer, javasrcipt developer, business websites, website development' },
            { name: 'description', content: `I am Nick, Web & JavaScript Developer. I create pixel-perfect, optimized, and efficient web apps, using JavaScript, Vue.js, Nuxt.js, TailwindCSS and Firebase` },
        ],
    })
</script>
<template>
    <div>
        <HomeHero/>
        <HomeCurrentProject/>
        <HomeMyStack/>
        <ProjectsList :projects_limit=3 :view_all_projects=true />
    </div>
</template>