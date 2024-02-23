<script setup>
useHead({
    title: 'A better UI for Bunny CDN',
    meta: [
        { name: 'description', content: 'Enhance your Bunny CDN experience with our user-friendly UI. Effortlessly manage all your bunny.net assets from one convenient page.' }
    ],
})
</script>
<template>
    <div class="flex flex-col min-h-screen">
        <header class="container py-4 flex items-center justify-between">
            <NuxtLink to="/tools/bunny-cdn" class="logo flex items-center gap-2">
                <Icon name="logos:bunny-net-icon" class="w-8 h-8" />
                <div class="font-medium text-xl"><i>Bunny</i> CDN</div>
            </NuxtLink>
        </header>
        <div class="flex-auto">
            <slot></slot>
        </div>
        <footer class="p-4 text-center border-t flex flex-wrap justify-center gap-2">
            &copy; {{ new Date().getFullYear() }} -<p>A better UI for Bunny CDN</p>
        </footer>
    </div>
</template>