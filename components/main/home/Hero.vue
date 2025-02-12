<script setup>
import { UButton } from '#components';


</script>
<template>
    <div class="container my-6">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="py-10 px-6 bg-[#192143] text-white shadow-lg text-center space-y-6 rounded-xl">
                <img src="/assets/nick-profile-photo.webp" alt="Nick's profile photo" title="Nick's profile photo"
                    class="rounded-full shadow-md w-40 h-40 shrink-0 mx-auto border-4 border-[#60A561]" />
                <p class="text-lg">Nick</p>
                <h1 class="text-2xl font-bold">Full-Stack Web Developer</h1>
                <h2 class="">I create pixel-perfect, fast<br> and SEO-friendly web apps.</h2>
                <div class="flex items-center gap-6 justify-center max-w-xl mx-auto mt-10">
                     <UButton to="/portfolio" class="w-1/2 justify-center" color="primary" variant="outline"
                        title="My Portfolio">Portfolio</UButton>
                        <UButton to="/contact" class="w-1/2 px-6 flex-grow justify-center" color="primary" title="Hire me">Hire me
                        </UButton>
                </div>
            </div>
            <div class="py-10 px-6 shadow-lg text-center space-y-4 rounded-xl">
                <h2 class="text-2xl font-bold">Restaurant Website Design</h2>
            </div>

        </div>
        <div class="container py-10 md:py-20 md:text-xl flex flex-col md:flex-row gap-14 items-center">
            
            <div class="flex flex-col gap-2">
                <div class="paragraph">Hi, I am Nick</div>
               
                <h2 class="paragraph">Specializing in pixel-perfect business and restaurant<br>web applications using Nuxt and Appwrite.</h2>
                <div class="flex gap-6 items-center pt-6">
                   
                    <UButton to="/demos" class="w-auto flex-grow sm:max-w-28 justify-center" variant="outline"
                        color="brand" title="Demo projects">Demos</UButton>
                </div>
            </div>
        </div>
    </div>
</template>