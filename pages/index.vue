

<script setup>

    const apps = [
        {
            title: "1Food Menu",
            url: 'free-menu-maker',
            logo: 'menuLogo.svg',
            description: 'Create a digital food menu for your restaurant, FREE'
        },
        {
            title: "UI for Bunny CDN",
            url: 'bunny-cdn',
            logo: 'bunnyLogo.svg',
            description: 'Manage your bunny.net assets with ease'
        },

    ]
</script>   
<template>
    <div class="container py-10">
        <Body class="bg-gray-100"></Body>
        <h1 class="text-center text-xl my-10">List of apps</h1>
        <div class="max-w-96 m-auto flex flex-col gap-6">
            <div class="bg-white hover:bg-gray-300 duration-300 rounded-xl shadow" v-for="app in apps" :key="app.title">
                <NuxtLink :to="app.url" target="_blank" 
                    class="p-4 flex flex-col">
                    <div class="flex gap-4">
                        <img v-if="app.logo" :src="'/'+ app.logo" class="w-8 h-8 inline-block mr-4">
                        <span class="font-bold text-lg">{{ app.title }}</span>
                    </div>
                    <div class="mt-4 text-sm text-gray-600"> {{ app.description }}</div>
        
                </NuxtLink>
            </div>
        </div>
    </div>
</template>