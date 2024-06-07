<script setup>

</script>
<template>
    <NuxtPage />
    <MainAppsList>
        <template #sectionTitle v-if="$route.path != '/tools'">
            <h3 class="subtitle mb-10 text-center">Other tools you may like</h3>
        </template>
        <template #sectionTitle v-else>
            <div></div>
        </template>
    </MainAppsList>
</template>