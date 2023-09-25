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
        <HomeMyStack/>
        <!-- <HomeCurrentProject/> -->
        <section class="bg-white text-black">
            <div class="container">
                <div class="subtitle mb-10 text-center">My Projects</div>
                <ProjectsList :projects_limit=3 :view_all_projects=true />
            </div>
        </section>
    </div>
</template>