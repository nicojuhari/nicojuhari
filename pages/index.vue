<script setup>
useHead({
    title: 'Freelance Web Developer: Restaurant Website Design',
    meta: [
        { name: 'description', content: 'Pixel-perfect, fast, and SEO-friendly web apps designed specially for businesses and restaurants. Improve your online presence with expert design and development.' },
        { name: 'keywords', content: 'Web developer, freelancer, restaurant website design, business website design' },
    ],
})
</script>
<template>
    <div>
        <!-- <Body class="bg-gray-100"></Body> -->
        <MainHomeHero />
        <MainAppsList/>
        <MainHomeMyServices />
        <MainHomeMyStack />
        <section>
            <div class="container">
                <div class="subtitle mb-10 text-center">My Projects</div>
                <MainProjectsList :projects_limit=3 :view_all_projects=true />
            </div>
        </section>
    </div>
</template>