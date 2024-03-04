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
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-blue-950 p-8 md:p-10 text-white rounded-lg">
        <div>
            <h3 class="text-3xl font-bold mb-6 md:mb-8">I could help you, with:</h3>
            <div class="grid grid-cols-1 gap-4">
                <div v-for="item in list" :key="item.title" class="flex items-center gap-4 text-gray-100">
                    <Icon name="i-ph-check-bold" class="w-4 h-4 text-green-600 shrink-0"/>
                    <div>
                        <div class="text-xl">{{ item.title }}</div>
                        <div class="text-sm text-gray-400">{{ item.description }}</div>  
                    </div>
                </div>
            </div>
        </div>
        <div class="grid place-content-center">
            <div class="text-center my-6">
                <UButton to="/contact" size="lg" color="brand" title="Contact me">Contact me</UButton>
                <div class="mt-4 text-ssm">and let's create together your next project</div>
            </div>
        </div>
    </div>
</template>