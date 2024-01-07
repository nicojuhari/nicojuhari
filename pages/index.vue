
<script setup>
    
    const user = useUser()
    const { getUserToken } = useAuth()

    const { data } = useFetch(`/api/menu/${user.value.uid}`, {
        headers: { 'Authorization': await getUserToken() }
    })
</script>
<template>

    Hello on home page - {{  user }}
    <br>
    <NuxtLink to="/test">Test page</NuxtLink>

    <pre>
        {{ data  }}
    </pre>

    hello
</template>