<script setup>

</script>
<template>
    <header
        class="sticky top-0 z-10 bg-white backdrop-blur-md border-b border-gray-200">
        <div class="container flex justify-between items-center gap-4 h-12 sm:h-14 py-2">
            <NuxtLink to="/" title="nicojuhari logo">
                <img src="/Logo.svg" class="h-8 sm:h-10" alt="nicojuhari logo" />
            </NuxtLink>
            <div>
                <UButton to="/contact" class="px-6 flex-grow justify-center" color="primary" variant="subtle" title="Hire me">Hire me
                </UButton>
            </div>
        </div>
    </header>
</template>