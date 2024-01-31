
<script setup>
    const user = useUser()
</script>   
<template>
    <div>
        <Body class="bg-gray-50"></Body>
        <div class="container">
            <ClientOnly>
                <HomeList/>
            </ClientOnly>
        </div>
    </div>
</template>