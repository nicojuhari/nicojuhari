<script setup>

</script>
<template>
    <section>
        <div class="container py-16 md:py-32 md:text-xl flex flex-col md:flex-row gap-14 items-center">
            <div>
                <img src="/assets/nick-profile-photo.webp" class="w-48 h-48 rounded-full shadow-md hover:scale-105 duration-700 grayscale hover:grayscale-0" />
            </div>
            <div class="flex flex-col gap-3">
                <div class="text-gray-600">Hi, I am Nick</div>
                <h1 class="hero-title">Web & Shopify Developer</h1>
                <div class="text-gray-600">I create pixel-perfect, fast, and SEO-friendly web apps.</div>
                <div class="flex gap-6 items-center mt-2">
                    <UButton to="/portfolio" class="w-auto flex-grow sm:max-w-28 justify-center" variant="outline" color="brand" size="lg" title="My Portfolio">Portfolio</UButton>
                    <UButton to="/contact" class="w-auto flex-grow sm:max-w-28 justify-center" color="brand" size="lg" title="Hire me">Hire me</UButton>
                </div>
            </div>
        </div>
    </section>
</template>