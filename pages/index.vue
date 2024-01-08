
<script setup>
    
    const user = useUser()
    const { getUserToken, logout } = useAuth()

    const { data } = useFetch(`/api/menu/${user.value.uid}`, {
        headers: { 'Authorization': await getUserToken() }
    })
</script>
<template>

    Hello on home page: {{  user?.displayName }}
    <br>
    <UButton @click="logout">Logout</UButton>
    <br>
    <NuxtLink to="/test">Test page</NuxtLink>

    <pre>
        {{ data  }}
    </pre>

    hello
</template>