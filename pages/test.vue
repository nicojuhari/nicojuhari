<script setup>
    const { data } = useFetch('/api/hello')
</script>
<template>
    <div>
        TEst page - 
        {{  data  }}
    </div>
    <NuxtLink to="/">Homep page</NuxtLink>
</template>