<script setup>

</script>
<template>
    <div>
        <HomeHero/>
        <HomeCurrentProject/>
        <HomeMyStack/>
        <ProjectsList :projects_limit=3 :view_all_projects=true />
    </div>
</template>