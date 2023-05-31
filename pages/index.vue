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
    </div>
</template>