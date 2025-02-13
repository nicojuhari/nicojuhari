<script setup>

const appwriteIcon = ` <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112 98" fill="none" class="h-12 w-12 m-auto">
                        <path
                            d="M111.1 73.4729V97.9638H48.8706C30.7406 97.9638 14.9105 88.114 6.44112 73.4729C5.2099 71.3444 4.13229 69.1113 3.22835 66.7935C1.45387 62.2516 0.338421 57.3779 0 52.2926V45.6712C0.0734729 44.5379 0.189248 43.4135 0.340647 42.3025C0.650124 40.0227 1.11768 37.7918 1.73218 35.6232C7.54544 15.0641 26.448 0 48.8706 0C71.2932 0 90.1935 15.0641 96.0068 35.6232H69.3985C65.0302 28.9216 57.4692 24.491 48.8706 24.491C40.272 24.491 32.711 28.9216 28.3427 35.6232C27.0113 37.6604 25.9782 39.9069 25.3014 42.3025C24.7002 44.4266 24.3796 46.6664 24.3796 48.9819C24.3796 56.0019 27.3319 62.3295 32.0653 66.7935C36.4515 70.9369 42.3649 73.4729 48.8706 73.4729H111.1Z"
                            fill="#FD366E" />
                        <path
                            d="M111.1 42.3027V66.7937H65.6759C70.4094 62.3297 73.3616 56.0021 73.3616 48.9821C73.3616 46.6666 73.041 44.4268 72.4399 42.3027H111.1Z"
                            fill="#FD366E" />
                    </svg>`

let myStack = [
    {
        name: 'JavaScript',
        icon: 'javascript',
        bgColor: '#f8e41a'
    },
    {
        name: 'Nuxt',
        icon: 'nuxt-icon',
        bgColor: '#00ce71'
    },
    {
        name: 'Vue.js',
        icon: 'vue',
        bgColor: '#3bb071'
    },
    {
        name: 'Node.js',
        icon: 'nodejs-icon',
        bgColor: '#6cac5f'
    },
    {
        name: 'Appwrite',
        logo: appwriteIcon,
        bgColor: '#FD366E'
    },
    {
        name: 'Firebase',
        icon: 'firebase',
        bgColor: '#FFA000'
    },
    {
        name: 'Tailwind CSS',
        icon: 'tailwindcss-icon',
        bgColor: '#269ec3'
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
        name: 'Shopify',
        icon: 'shopify',
        bgColor: '#f4f4f4'
    }
]
</script>
<template>
    <div class="container my-8">
        <UCard>
            <div class="subtitle my-6 text-center">My Tech Stack</div>
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 gap-y-12">
                <div v-for="item in myStack" class=" flex flex-col gap-6 justify-center items-center">
                    <div class="relative">
                        <div v-if="item.logo" v-html="item.logo"> </div>
                        <UIcon v-else :name="`i-logos-${item.icon}`" dynamic class="h-10 w-10 m-auto" :alt="item.name"/>
                        <!-- <div class="icon-glow" :style="`background: ${item.bgColor};`"></div> -->
                    </div>
                    <span class="text-center">{{ item.name }}</span>
                </div>
            </div>
        </UCard>
    </div> 
</template>
<style>
    .icon-glow {
        position: absolute;
        top: 20px;
        left: 20px;
        width: 40px;
        height: 40px;
        background: white;
        opacity: 0.4;
        filter: blur(30px);
    }
</style>