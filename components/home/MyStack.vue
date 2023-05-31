<script setup>

let myStack = [
    {
        name: 'JavaScript',
        icon: 'javascript'
    },
    {
        name: 'Vue.js',
        icon: 'vue'
    },
    {
        name: 'Nuxt.js',
        icon: 'nuxt-icon'
    },
    {
        name: 'Node.js',
        icon: 'nodejs-icon'
    },
    {
        name: 'Tailwind CSS',
        icon: 'tailwindcss-icon'
    },
    {
        name: 'SASS',
        icon: 'sass'
    },
    {
        name: 'Firebase',
        icon: 'firebase'
    },
    {
        name: 'MySQL',
        icon: 'mysql'
    },
    {
        name: 'StoryBlok',
        icon: 'storyblok-icon'
    },
    {
        name: 'WordPress',
        icon: 'wordpress-icon'
    }
]
</script>
<template>
    <section>
        <div class="container">
            <div class="subtitle my-10 text-center">Technologies</div>
            <div class="grid grid-cols-2 md:grid-cols-5 gap-12 items-center justify-center">
                <div v-for="item in myStack" class=" flex flex-col gap-2">
                    <Icon :name="`logos:${item.icon}`" class="h-16 w-16 m-auto" :alt="item.name"/>
                    <span class="text-center">{{ item.name }}</span>
                </div>
            </div>
        </div>
    </section>  
</template>