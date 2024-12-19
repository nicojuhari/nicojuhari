<script setup>

</script>
<template>
    <header
        class="sticky top-0 z-10 bg-white bg-opacity-[0.025] backdrop-blur-md border-b border-white border-opacity-[0.05]">
        <div class="container flex justify-between items-center gap-4 h-12 sm:h-14 py-2">
            <NuxtLink to="/" title="nicojuhari logo">
                <img src="/Logo.svg" class="h-8 sm:h-10" alt="logo" />
            </NuxtLink>
            <div>
                <UButton to="/contact" class="px-6 flex-grow justify-center" color="green" variant="solid" size="sm" title="Hire me">Hire me
                </UButton>
            </div>
        </div>
    </header>
</template>