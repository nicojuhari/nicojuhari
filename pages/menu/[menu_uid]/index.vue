<script setup lang="ts">
// import { useRouter } from 'vue-router';

 const route = useRoute();

 const menu_uid = route.params.menu_uid
definePageMeta({
    layout: 'menu'
})
</script>
<template>
    <div>Menu Id {{ menu_uid }}</div>
</template>