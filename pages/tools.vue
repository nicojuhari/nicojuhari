<script setup>
    const route = useRoute()

    //if we have a query parameter, we will redirect to the page with the query parameter
</script>
<template>
    <NuxtPage />
    <MainWebApps/>
    <MainToolsList/>
    <!-- <MainAppsList v-if="!route.query.menu_uid">
        <template #sectionTitle v-if="$route.path != '/tools'">
            <h3 class="subtitle mb-10 text-center">Other tools you may like</h3>
        </template>
        <template #sectionTitle v-else>
            <div></div>
        </template>
    </MainAppsList> -->
</template>