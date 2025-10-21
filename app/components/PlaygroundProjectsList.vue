<script setup>

let projects = [
    
    {
        title: "Rain of Emojis",
        url: '/playground/rain-of-emojis',
        icon: '🎉',
        desc: 'CSS Animations and JavaScript',
    },
    {
        title: "Magic Wand Sparkles",
        url: '/playground/magic-wand',
        icon: '✨',
        desc: 'Click to create the magic',
    },
];


</script>
<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <NuxtLink :to="project.url" v-for="project in projects" :key="project.title"
            class="p-4 flex gap-4 items-center border rounded-md overflow-hidden bg-white" :title="project.title">
            <span class="text-3xl">{{ project.icon }}</span>
            <div>
                <h3 class="font-bold">{{ project.title }}</h3>
                <p class="text-sm text-gray-500">{{ project.desc }}</p>
            </div>
        </NuxtLink>
    </div>
</template>