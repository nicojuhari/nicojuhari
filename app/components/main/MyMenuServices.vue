<script setup>

    const list = [
        { 
            title: 'Food menu design',
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
    <div class="bg-blue-950 px-6 py-8 md:p-10 text-white rounded-lg">
        <div class="text-3xl font-bold mb-6 md:mb-8 text-center">I could help you, with...</div>
        <div class="grid grid-cols-1 gap-8">
            <div v-for="item in list" :key="item.title" class="flex items-center gap-4 text-gray-100">
                <Icon name="i-ph-check-bold" class="w-4 h-4 text-green-600 shrink-0" />
                <div>
                    <div class="text-xl">{{ item.title }}</div>
                    <div class="text-sm text-gray-400">{{ item.description }}</div>
                </div>
            </div>
        </div>
        <div class="text-center mt-10">
            <UButton to="/contact" size="lg" color="red" title="Contact me">Contact me</UButton>
        </div>
    </div>
</template>