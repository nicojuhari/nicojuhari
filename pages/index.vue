<script setup>
useHead({
    title: 'Freelance Web Developer from Vienna, Austria',
    meta: [
        { name: 'description', content: 'I create pixel-perfect, fast, and SEO-friendly web apps. I specialize in business and restaurant websites and landing pages.' },
        { name: 'keywords', content: 'Web developer, Freelancer, Vienna Austria, restaurant websites, website developer' },
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