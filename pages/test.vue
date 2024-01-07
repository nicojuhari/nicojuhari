<script setup>
    const { getUserToken } = useAuth()
    const { data } = useFetch('/api/hello', {
        headers: { 'Authorization': await getUserToken() }
    })
</script>
<template>
    <div>
        TEst page - 
        {{  data  }}
    </div>
    <NuxtLink to="/">Homep page</NuxtLink>
</template>