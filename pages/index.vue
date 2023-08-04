<script setup>
    // useHead({
    //     title: 'Freelance Web Developer',
    //     meta: [
    //         {
    //             name: 'description',
    //             content: 'Home page description'
    //         }
    //     ]
    // })
</script>
<template>
    <div>
        <HomeHero/>
        <HomeMyServices/>
        <!-- <HomeCurrentProject/> -->
        <HomeMyStack/>
        <section>
            <div class="container">
                <div class="subtitle my-10 text-center">Projects</div>
                <ProjectsList :projects_limit=3 :view_all_projects=true />
                </div>
            </section>
        <section>
            <div class="container">
                <div class="subtitle my-10 text-center">Demo Projects</div>
                <ProjectsDemos/>
                <NuxtLink to="/demos" title="View All Demos" class="btn btn-secondary mx-auto mt-10">
                View All Demos</NuxtLink>
            </div>
        </section>
    </div>
</template>