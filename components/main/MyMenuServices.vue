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
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-brand-950 p-6 md:p-12 text-white rounded-lg">
        <div>
            <h3 class="text-3xl font-bold my-6">I could help you, with:</h3>
            <div class="grid grid-cols-1 gap-6">
                <div v-for="item in list" :key="item.title" class="flex items-center gap-4 text-gray-100">
                    <Icon name="i-ph-check-bold" class="w-4 h-4 text-green-600 shrink-0"/>
                    <div>
                        <div class="text-xl">{{ item.title }}</div>
                        <div class="text-sm mt-2 text-white text-opacity-60">{{ item.description }}</div>  
                    </div>
                </div>
            </div>
        </div>
        <div class="grid place-content-center">
            <div class="text-center my-6">
                <UButton to="/contact" size="lg" color="brand" class="m-sauto" title="Contact me">Contact me</UButton>
                <div class="mt-4 text-sm">and let's create together your next project</div>
            </div>
        </div>
    </div>
</template>