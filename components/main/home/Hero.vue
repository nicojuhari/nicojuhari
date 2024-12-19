<script setup>

</script>
<template>
    <section>
        <div class="container py-10 md:py-20 md:text-xl flex flex-col md:flex-row gap-14 items-center">
            <div class="w-48 h-48 shrink-0">
                <img src="/assets/nick-profile-photo.webp" alt="Nick's profile photo" title="Nick's profile photo"
                    class="rounded-full shadow-md" />
            </div>
            <div class="flex flex-col gap-1">
                <div>Hi, I am Nick</div>
                <h1 class="hero-title mb-4 md:mb-6">Full-Stack Web Developer</h1>
                <h2 class="text-base md:text-xl font-normal">With extensive experience in creating pixel-perfect, fast, and SEO-friendly web applications.</h2>
                <h3 class="text-base md:text-xl font-normal mt-4 md:mt-1">I specialize in building restaurant websites and eCommerce platforms.</h3>
                <div class="flex gap-6 items-center pt-6">
                    <UButton to="/portfolio" class="w-auto flex-grow sm:max-w-28 justify-center" color="brand"
                        title="My Portfolio">Portfolio</UButton>
                    <UButton to="/demos" class="w-auto flex-grow sm:max-w-28 justify-center" variant="outline"
                        color="brand" title="Demo projects">Demos</UButton>
                </div>
            </div>
        </div>
    </section>
</template>