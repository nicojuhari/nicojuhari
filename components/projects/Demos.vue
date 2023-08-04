<script setup>
const demos = useDemos();

</script>
<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NuxtLink :to="`/demos/${item.url}`" v-for="item in demos" class="border-opacity-50 shadow-md rounded overflow-hidden">
            <div v-if="item.imgUrl">
                <img :src="item.imgUrl" :alt="item.title" :title="item.title" class="w-full"/>
            </div>
            <div class="p-4 h-full grid place-content-center" v-else>
                <h2 class="text-lg">{{ item.title }}</h2>
            </div>
        </NuxtLink>         
    </div>
</template>