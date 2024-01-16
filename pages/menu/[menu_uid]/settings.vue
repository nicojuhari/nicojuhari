<script setup>
    const settingsPages = [
        {
            id: 'general',
            label: 'General'
        },
        {
            id: 'plans',
            label: 'Plans'
        }
    ]
</script>
<template>
    <div>
       
        <div class="border-b flex mb-6">
            <NuxtLink :to="`/menu/${$route.params.menu_uid}/settings/${item.id}`" v-for="item in settingsPages" :key="item.id" 
                class="px-4 py-2.5 hover:bg-brand-primary hover:bg-opacity-10 rounded-t-md transition-all duration-300 border-b-2 border-transparent"
                activeClass="!border-brand-primary"
            >
                {{ item.label }}
            </NuxtLink>
        </div>
        <NuxtPage/>
       
        
    </div>
   
</template>