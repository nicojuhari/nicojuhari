<script setup>

</script>
<template>
    <section class="lg-section">
        <div class="container md:py-12 md:text-xl md:text-center">
            <div class="mb-4 text-gray-600">Hi, I am Nick</div>
            <h1 class="hero-title mb-4">Freelance <br class="md:hidden">Web Developer</h1>
            <div class="mb-8 text-gray-600">I create pixel-perfect, fast, and SEO-friendly business and restaurant websites.</div>
            <div class="flex gap-6 items-center md:justify-center">
                <UButton to="/portfolio" class="w-auto flex-grow sm:max-w-28 justify-center" variant="outline" color="brand" size="lg" title="My Portfolio">Portfolio</UButton>
                <UButton to="/contact" class="w-auto flex-grow sm:max-w-28 justify-center" color="brand" size="lg" title="Hire me">Hire me</UButton>
            </div>
        </div>
    </section>
</template>