<script setup>
    const user = useUser()

    const { data } = useFetch('/api/menu/get-one-menu')
</script>
<template>

    Hello on home page - {{  user }}
    <br>
    <NuxtLink to="/test">Test page</NuxtLink>

    <pre>
        {{ data  }}
    </pre>
</template>