<script setup>

    const list = [
        { 
            title: 'Restaurant menu design',
            description: 'I will customize your menu to reflect your brand.'
        },
        {
            title: 'App integration',
            description: 'I\'ll integrate this menu maker app into your project, including custom fields and design.'
        },
        {
            title: 'Restaurant website design',
            description: 'I will create a fully functional restaurant website that includes menu maker integration and custom menu design.'
        }
    ]

</script>
<template>
    <div class="bg-brand-950 p-10 md:p-12 text-white">
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="grid grid-cols-1 gap-6">
                <div v-for="item in list" :key="item.title" class="flex items-center gap-4 text-gray-100">
                    <Icon name="i-ph-check-bold" class="w-4 h-4 text-green-600 shrink-0"/>
                    <div>
                        <div class="text-xl">{{ item.title }}</div>
                        <div class="text-sm mt-2 text-white text-opacity-60">{{ item.description }}</div>  
                    </div>
                </div>
            </div>
            <div class="grid place-content-center">
                <h3 class="text-3xl font-bold mb-6">Do you need more?</h3>
                <div class="text-center mt-4">
                    <UButton to="/contact" size="lg" color="brand" class="m-sauto" title="Contact me">Contact me</UButton>
                </div>
            </div>
        </div>
        
        
        
    </div>
</template>