<script setup>

let myStack = [
    {
        name: 'JavaScript',
        icon: 'javascript',
        bgColor: '#f8e41a'
    },
    {
        name: 'Vue.js',
        icon: 'vue',
        bgColor: '#3bb071'
    },
    {
        name: 'Nuxt.js',
        icon: 'nuxt-icon',
        bgColor: '#00ce71'
    },
    {
        name: 'Node.js',
        icon: 'nodejs-icon',
        bgColor: '#6cac5f'
    },
    {
        name: 'Tailwind CSS',
        icon: 'tailwindcss-icon',
        bgColor: '#269ec3'
    },
    {
        name: 'SASS',
        icon: 'sass',
        bgColor: '#d06d9d'
    },
    {
        name: 'Firebase',
        icon: 'firebase',
        bgColor: '#feae32'
    },
    {
        name: 'MySQL',
        icon: 'mysql',
        bgColor: '#34879d'
    },
    {
        name: 'StoryBlok',
        icon: 'storyblok-icon',
        bgColor: '#3fbcb9'

    },
    {
        name: 'WordPress',
        icon: 'wordpress-icon',
        bgColor: '#f4f4f4'
    }
]
</script>
<template>
    <section>
        <div class="container">
            <div class="subtitle mb-10 text-center">My Tech Stack</div>
            <div class="grid grid-cols-2 md:grid-cols-5 gap-12 items-center justify-center">
                <div v-for="item in myStack" class=" flex flex-col gap-2 justify-center items-center">
                    <div class="relative  min-h-[100px]">
                        <UIcon :name="`i-logos-${item.icon}`" dynamic class="h-16 w-16 m-auto" :alt="item.name"/>
                        <div class="icon-glow" :style="`background: ${item.bgColor};`"></div>
                    </div>

                    <span class="text-center font-light">{{ item.name }}</span>
                </div>
            </div>
        </div> 
    </section>
</template>
<style>
    .icon-glow {
        position: absolute;
        top: 20px;
        left: 20px;
        width: 40px;
        height: 40px;
        background: white;
        opacity: 0.7;
        filter: blur(30px);
    }
</style>