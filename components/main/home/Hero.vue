<script setup>

const keyFeatures = [
    'Custom Designs',
    'Digital Menu',
    'Easy Updates',
    'Fast Loading',
    'SEO Boost',
    'Online Reservations'
]

</script>
<template>
    <div class="container my-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <UCard class="card-dark">
                <div class="text-center space-y-6">
                    <img src="/assets/nick-profile-photo.webp" alt="Nick's profile photo" title="Nick's profile photo"
                        class="rounded-full shadow-md w-40 h-40 shrink-0 mx-auto border-4 border-[#60A561]" />
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
            <UCard class="lg:col-span-2">
                <h2 class="subtitle text-center lg:text-left my-6">Restaurant Website Design</h2>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <p>I specialize in creating attractive websites for restaurants, cafes, and bars that capture your unique atmosphere and attract new customers.</p>
                        <ul class="space-y-1.5">
                            <li v-for="item in keyFeatures" class="list-none flex items-center gap-2">
                                <UIcon name="i-ph-check" class="h-5 w-5 text-green-500"></UIcon>
                                <span class="text-lg font-semibold">{{ item }}</span>
                            </li>
                        </ul>
                        <UButton to="/">Read More</UButton>
                    </div>
                </div>
                
            </UCard>

        </div>
    </div>
</template>