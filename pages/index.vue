<script setup>
</script>
<template>
    <div>
        <Body class="bg-gray-100"></Body>
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