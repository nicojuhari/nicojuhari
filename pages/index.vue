
<script setup>
    const user = useUser()
</script>   
<template>
    <div>
        <Body class="bg-gray-50"></Body>
        <div class="container">
            {{  user }}
            <HomeList/>
        </div>
    </div>
</template>