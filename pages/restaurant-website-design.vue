<script setup lang="ts">
    useHead({
    title: "Professional Restaurant Website Design",
    meta: [
        { name: 'description', content: 'Transform your restaurant\'s website with my stunning, mobile-friendly designs. Enjoy a no-risk guarantee: pay only when you\'re 100% satisfied!' },
    ],
})
</script>
<template>
    <div class="container my-4 lg:my-6">
        <h1 class="text-center title py-4 mt-8">Restaurant Website Design</h1>
        <h2 class="mb-8 text-lg font-normal text-center">Transform your restaurant's online presence into a powerful marketing tool<br>that attracts more customers and boosts sales</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <UCard>
                <h3 class="subtitle my-4 text-center">What I offer</h3>
                <ul class="list-disc list-inside space-y-2.5">
                    <li>Professional Website Design</li>
                    <li>Fast and Fully Responsive</li>
                    <li>Easy-to-use Menu Managment</li>
                    <li>SEO Optimised</li>
                    <li>Clear CTAs for high Conversions</li>
                </ul>
                <div class="text-center mt-6">
                    <UButton to="/demos">View Demos</UButton>

                </div>
            </UCard>
            <UCard class="card-dark">
                <h3 class="subtitle text-center my-4">Risk-Free Guarantee</h3>
                <p class="text-lg my-10 text-center">No Payment Until You're 100% Satisfied!</p>
                <div class="text-center">
                    <UButton color="success" to="contact">Let's do it!</UButton>
                </div>
            </UCard>
        </div>
        <p class="text-2xl my-10 font-semibold text-center">
            Don't let an outdated website hold your restaurant back.<br>Contact me today for a free consultation and take the first step towards a modern and effective website!
        </p>
    </div>
</template>
