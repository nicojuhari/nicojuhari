<script setup>
import { NuxtLink } from '#components';


const keyFeatures = [
    'Increase Sales by 20-30%',
    'Bring in More Customers',
    'Help You Get Found Online',
    'Make Updates Easy',
    'Simplify Reservations',
]

</script>
<template>
    <div class="container my-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <UCard class="card-dark">
                <div class="text-center space-y-6">
                    <img src="/assets/nick-profile-photo.webp" alt="Nick's profile photo" title="Nick's profile photo"
                        class="rounded-full my-6 shadow-md w-40 h-40 shrink-0 mx-auto border-4 border-[#60A561]" />
                    <p class="text-lg">Nick</p>
                    <h1 class="title">Full-Stack<br>Web Developer</h1>
                    <h2 class="">I create pixel-perfect, fast<br> and SEO-friendly web apps.</h2>
                    <div class="flex items-center gap-6 justify-center max-w-xl mx-auto mt-10">
                         <UButton to="/portfolio" class="w-1/2 justify-center" color="secondary" variant="outline"
                            title="My Portfolio">Portfolio</UButton>
                            <UButton to="/contact" class="w-1/2 px-6 flex-grow justify-center" color="secondary" title="Hire me">Hire me
                            </UButton>
                    </div>
                </div>
            </UCard>
            <UCard>
                <h2 class="subtitle text-center lg:text-left my-6">Restaurant Website Design</h2>
                <div class="grid grid-cols-1 lg:grid-cols-1 gap-6">
                    <div class="space-y-4">
                        <p>I create stuning restaurant websites that will:</p>
                        <ul class="space-y-2.5">
                            <li v-for="item in keyFeatures" class="list-none flex items-center gap-2">
                                <UIcon name="i-ph-check" class="h-5 w-5 text-green-500"></UIcon>
                                <span class="lg:text-xl font-semibold">{{ item }}</span>
                            </li>
                        </ul>
            
                        <UButton class="px-8" to="/restaurant-website-design" title="Restaurant Website Design">Read More</UButton>
                        
                    </div>
                </div>
                <!-- <img class="absolute right-0 bottom-0 w-lg" src="https://elements-resized.envatousercontent.com/elements-cover-images/56c0a9bb-a142-412f-b67b-8a16d1b2ce75?w=433&cf_fit=scale-down&q=85&format=auto&s=0d82bbfe63873ddc722705897a5a44ead1c76bea21e9d1efc274956e44563521"/> -->
            </UCard>
            <UCard class="card-dark space-y-8 text-center" :ui="{ body: 'h-full'}">
        <div class="space-y-8 flex justify-center flex-col h-full">
            <h3 class="subtitle">7+ Years<br>in Web Development</h3>
            <p class="text-lg">Expert Frontend, Backend, and Full-Stack JS Developer, Specializing in Modern Restaurant Websites.</p>
        </div>
    </UCard>

        </div>
    </div>
</template>